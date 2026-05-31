import React, { createContext, useState, useContext, ReactNode } from 'react';
import { calculateRate, calculateProjection, analyzeGoal, RateCalculation, Projection, GoalAnalysis } from '../lib/calculator';

export interface FormData {
  country: string;
  city: string;
  skillCategory: string;
  subSkill: string;
  experience: string;
  currency: string;
  billableHours: number;
  workingWeeks: number;
  nonBillablePercent: number;
  annualGoal: string;
  monthlyExpenses: string;
  
  // Phase 2 enhancements
  workArrangement: 'remote' | 'hybrid' | 'onsite';
  clientTypes: string[];
  contractType: 'hourly' | 'project' | 'retainer' | 'mixed';
  savingsGoal: string;
  benefitsCost: string;
}

export interface Results {
  rateData: RateCalculation;
  projection: Projection;
  goalAnalysis: GoalAnalysis | null;
  timestamp: number;
}

interface CalculatorContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  results: Results | null;
  calculateResults: () => void;
  loadCalculation: (data: { formData: FormData; results: Results }) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    country: 'US', // default
    city: '',
    skillCategory: '',
    subSkill: '',
    experience: '',
    currency: 'USD',
    billableHours: 25,
    workingWeeks: 48,
    nonBillablePercent: 20,
    annualGoal: '',
    monthlyExpenses: '',
    
    // Extensions
    workArrangement: 'remote',
    clientTypes: [],
    contractType: 'hourly',
    savingsGoal: '',
    benefitsCost: ''
  });

  const [results, setResults] = useState<Results | null>(null);

  const calculateResults = () => {
    if (!formData.country || !formData.subSkill || !formData.experience) {
      return; 
    }

    const rateData = calculateRate(
      formData.country, 
      formData.city,
      formData.subSkill, 
      formData.experience,
      formData.workArrangement,
      formData.clientTypes
    );
    
    const expenses = (parseFloat(formData.monthlyExpenses) || 0) * 12;
    const benefits = (parseFloat(formData.benefitsCost) || 0) * 12;
    const savings = (parseFloat(formData.savingsGoal) || 0) * 12;
    const totalExpenses = expenses + benefits + savings;
    
    const projection = calculateProjection(
      rateData.midpoint,
      formData.billableHours,
      formData.workingWeeks,
      formData.nonBillablePercent,
      formData.country,
      totalExpenses
    );

    const goalAnnual = parseFloat(formData.annualGoal) || 0;
    const goalAnalysis = analyzeGoal(
      projection.annualNet,
      goalAnnual,
      rateData.midpoint,
      formData.workingWeeks,
      projection.effectiveHoursPerWeek
    );

    setResults({ rateData, projection, goalAnalysis, timestamp: Date.now() });
  };
  
  const loadCalculation = (data: { formData: FormData; results: Results }) => {
    setFormData(data.formData);
    setResults(data.results);
  };

  return (
    <CalculatorContext.Provider value={{ formData, setFormData, results, calculateResults, loadCalculation }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};
