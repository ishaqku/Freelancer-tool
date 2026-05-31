export interface TaxBracket {
  min: number;
  max: number | null; // null = infinity
  rate: number; // percentage
}

export interface CountryTax {
  countryCode: string;
  countryName: string;
  currency: string;
  taxName: string;
  brackets: TaxBracket[];
  standardDeduction: number;
  selfEmploymentTax?: number; 
  hasProgressiveTax: boolean;
}

export const taxDatabase: Record<string, CountryTax> = {
  "US": {
    countryCode: "US",
    countryName: "United States",
    currency: "USD",
    taxName: "Federal Income Tax",
    standardDeduction: 13850,
    selfEmploymentTax: 15.3,
    hasProgressiveTax: true,
    brackets: [
      { min: 0, max: 11000, rate: 10 },
      { min: 11000, max: 44725, rate: 12 },
      { min: 44725, max: 95375, rate: 22 },
      { min: 95375, max: 182100, rate: 24 },
      { min: 182100, max: 231250, rate: 32 },
      { min: 231250, max: 578125, rate: 35 },
      { min: 578125, max: null, rate: 37 }
    ]
  },
  "GB": {
    countryCode: "GB",
    countryName: "United Kingdom",
    currency: "GBP",
    taxName: "Income Tax",
    standardDeduction: 12570,
    selfEmploymentTax: 0,
    hasProgressiveTax: true,
    brackets: [
      { min: 0, max: 12570, rate: 0 },
      { min: 12570, max: 50270, rate: 20 },
      { min: 50270, max: 125140, rate: 40 },
      { min: 125140, max: null, rate: 45 }
    ]
  },
  "IN": {
    countryCode: "IN",
    countryName: "India",
    currency: "INR",
    taxName: "Income Tax",
    standardDeduction: 50000,
    selfEmploymentTax: 0,
    hasProgressiveTax: true,
    brackets: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300000, max: 600000, rate: 5 },
      { min: 600000, max: 900000, rate: 10 },
      { min: 900000, max: 1200000, rate: 15 },
      { min: 1200000, max: 1500000, rate: 20 },
      { min: 1500000, max: null, rate: 30 }
    ]
  },
  "PK": {
    countryCode: "PK",
    countryName: "Pakistan",
    currency: "PKR",
    taxName: "Income Tax",
    standardDeduction: 0,
    selfEmploymentTax: 0,
    hasProgressiveTax: true,
    brackets: [
      { min: 0, max: 600000, rate: 0 },
      { min: 600000, max: 1200000, rate: 5 },
      { min: 1200000, max: 2200000, rate: 15 },
      { min: 2200000, max: 3200000, rate: 25 },
      { min: 3200000, max: 4100000, rate: 30 },
      { min: 4100000, max: null, rate: 35 }
    ]
  },
  "DE": {
    countryCode: "DE",
    countryName: "Germany",
    currency: "EUR",
    taxName: "Einkommensteuer",
    standardDeduction: 1200,
    selfEmploymentTax: 0,
    hasProgressiveTax: true,
    brackets: [
      { min: 0, max: 11604, rate: 0 },
      { min: 11604, max: 17005, rate: 14 },
      { min: 17005, max: 66760, rate: 24 },
      { min: 66760, max: 277825, rate: 42 },
      { min: 277825, max: null, rate: 45 }
    ]
  }
};

export function calculateTax(
  countryCode: string, 
  annualIncome: number
): { 
  taxableIncome: number;
  taxAmount: number;
  effectiveRate: number;
  brackets: { range: string; rate: number; tax: number; name?: string }[];
} {
  const countryTax = taxDatabase[countryCode];

  // Global Fallback
  if (!countryTax) {
    const tax = annualIncome * 0.20;
    return {
      taxableIncome: annualIncome,
      taxAmount: tax,
      effectiveRate: 20,
      brackets: [{ range: "Generic estimate", rate: 20, tax }]
    };
  }

  const taxableIncome = Math.max(0, annualIncome - countryTax.standardDeduction);
  let totalTax = 0;
  const bracketBreakdown: { range: string; rate: number; tax: number; name?: string }[] = [];

  for (const bracket of countryTax.brackets) {
    if (taxableIncome <= bracket.min) continue;

    const bracketMax = bracket.max === null ? taxableIncome : bracket.max;
    if (bracketMax < bracket.min) continue;
    
    const incomeInBracket = Math.min(taxableIncome, bracketMax) - bracket.min;
    
    if (incomeInBracket > 0) {
      const bracketTax = incomeInBracket * (bracket.rate / 100);
      totalTax += bracketTax;

      bracketBreakdown.push({
        range: `${bracket.min.toLocaleString()} - ${bracket.max ? bracket.max.toLocaleString() : '∞'}`,
        rate: bracket.rate,
        tax: bracketTax
      });
    }
  }

  if (countryTax.selfEmploymentTax && taxableIncome > 0) {
    const seTax = taxableIncome * (countryTax.selfEmploymentTax / 100);
    totalTax += seTax;
    bracketBreakdown.push({
      range: "Self-Employment Tax",
      rate: countryTax.selfEmploymentTax,
      name: "SE Tax",
      tax: seTax
    });
  }

  const effectiveRate = annualIncome > 0 ? (totalTax / annualIncome) * 100 : 0;

  return {
    taxableIncome,
    taxAmount: totalTax,
    effectiveRate: parseFloat(effectiveRate.toFixed(2)),
    brackets: bracketBreakdown
  };
}
