import { countries, skillCategories, experienceLevels } from '../data/rateData';
import { getCityMultiplier } from '../data/costOfLiving';
import { calculateTax } from '../data/taxData';

export interface RateCalculation {
  minRate: number;
  maxRate: number;
  midpoint: number;
  breakdown: {
    baseMin: number;
    baseMax: number;
    countryMult: number;
    cityMult: number;
    expMult: number;
    arrangementMult: number;
    clientMult: number;
  };
}

export interface Projection {
  annualGross: number;
  taxEstimate: number;
  taxData: ReturnType<typeof calculateTax>;
  expenses: number;
  annualNet: number;
  monthlyNet: number;
  effectiveHoursPerWeek: number;
}

export interface GoalAnalysis {
  status: 'achieved' | 'gap';
  message?: string;
  gapAmount?: number;
  suggestions?: string[];
}

export function getMarketRate(subSkillId: string, countryCode: string, experienceId: string) {
  let baseMin = 20;
  let baseMax = 50;

  for (const cat of skillCategories) {
    const subSkill = cat.subSkills.find((s) => s.id === subSkillId);
    if (subSkill) {
      baseMin = subSkill.benchmark.min;
      baseMax = subSkill.benchmark.max;
      break;
    }
  }

  const countryMult = countries.find(c => c.code === countryCode)?.multiplier || 1.0;
  const expMult = experienceLevels.find(e => e.id === experienceId)?.multiplier || 1.0;

  const minRate = Math.round(baseMin * countryMult * expMult);
  const maxRate = Math.round(baseMax * countryMult * expMult);

  return {
    min: minRate,
    max: maxRate,
    midpoint: Math.round((minRate + maxRate) / 2)
  };
}

export function calculateRate(
  countryCode: string,
  city: string,
  subSkillId: string, 
  experienceId: string,
  workArrangement: string,
  clientTypes: string[]
): RateCalculation {
  let baseMin = 20;
  let baseMax = 50;

  // Find base benchmark
  for (const cat of skillCategories) {
    const subSkill = cat.subSkills.find((s) => s.id === subSkillId);
    if (subSkill) {
      baseMin = subSkill.benchmark.min;
      baseMax = subSkill.benchmark.max;
      break;
    }
  }

  const countryMult = countries.find(c => c.code === countryCode)?.multiplier || 0.5;
  const cityMult = getCityMultiplier(countryCode, city);
  
  // Choose the most specific multiplier
  const locationMult = city ? cityMult : countryMult;
  
  const expMult = experienceLevels.find(e => e.id === experienceId)?.multiplier || 1.0;
  
  // Work Arrangement factor
  let arrangementMult = 1.0;
  if (workArrangement === 'onsite') arrangementMult = 1.1; // 10% premium for onsite
  if (workArrangement === 'remote') arrangementMult = 1.0;
  
  // Client Types factor
  let clientMult = 1.0;
  if (clientTypes.includes('Enterprise')) clientMult = 1.15; // 15% bump for enterprise
  else if (clientTypes.includes('Non-profits')) clientMult = 0.9;
  
  const totalMult = locationMult * expMult * arrangementMult * clientMult;
  
  const minRate = Math.round(baseMin * totalMult);
  const maxRate = Math.round(baseMax * totalMult);

  return {
    minRate,
    maxRate,
    midpoint: Math.round((minRate + maxRate) / 2),
    breakdown: {
      baseMin,
      baseMax,
      countryMult,
      cityMult,
      expMult,
      arrangementMult,
      clientMult
    }
  };
}

export function calculateProjection(
  hourlyRate: number,
  billableHours: number,
  workingWeeks: number,
  nonBillablePercent: number,
  countryCode: string,
  userProvidedAnnualExpenses: number = 0
): Projection {
  const effectiveHours = billableHours * (1 - nonBillablePercent / 100);
  const weeklyIncome = effectiveHours * hourlyRate;
  const annualGross = weeklyIncome * workingWeeks;

  const taxData = calculateTax(countryCode, annualGross);
  const expenses = userProvidedAnnualExpenses > 0 ? userProvidedAnnualExpenses : annualGross * 0.10;
  
  const annualNet = annualGross - taxData.taxAmount - expenses;
  const monthlyNet = annualNet / 12;

  return {
    annualGross,
    taxEstimate: taxData.taxAmount,
    taxData,
    expenses,
    annualNet,
    monthlyNet,
    effectiveHoursPerWeek: Number(effectiveHours.toFixed(1))
  };
}

export function analyzeGoal(
  currentAnnualNet: number,
  goalAnnual: number,
  hourlyRate: number,
  workingWeeks: number,
  effectiveHours: number
): GoalAnalysis | null {
  if (!goalAnnual || goalAnnual <= 0) return null;

  const gap = goalAnnual - currentAnnualNet;

  if (gap <= 0) {
    return { status: "achieved", message: "You're on track to exceed your goal!" };
  }

  // Pre-tax equivalent needed for the net gap (very rough calc to add back ~20-30% loss)
  const preTaxGap = gap / 0.70; 

  const rateIncreaseNeeded = Math.ceil(preTaxGap / (workingWeeks * effectiveHours));
  const hoursIncreaseNeeded = Math.ceil(preTaxGap / (hourlyRate * workingWeeks));
  const weeklyIncome = effectiveHours * hourlyRate;
  const vacationReductionNeeded = Math.ceil(preTaxGap / (weeklyIncome || 1));

  return {
    status: "gap",
    gapAmount: gap,
    suggestions: [
      `Increase rate by $${rateIncreaseNeeded}/hr`,
      `Work ${hoursIncreaseNeeded} more effective hours/week`,
      `Reduce vacation by ${vacationReductionNeeded} weeks`
    ]
  };
}
