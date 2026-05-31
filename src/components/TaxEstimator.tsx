import React from 'react';
import { calculateTax } from '../data/taxData';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Info } from 'lucide-react';

interface TaxEstimatorProps {
  countryCode: string;
  annualIncome: number;
  currencySymbol: string;
}

export const TaxEstimator: React.FC<TaxEstimatorProps> = ({ countryCode, annualIncome, currencySymbol }) => {
  const taxData = calculateTax(countryCode, annualIncome);

  const format = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
      .format(num)
      .replace('$', currencySymbol);
  };

  return (
    <Card className="bg-slate-900 border-none shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
      <CardHeader className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-row items-center justify-between">
        <CardTitle className="text-slate-200 text-sm font-semibold tracking-wide">
          TAX ESTIMATE: {countryCode}
        </CardTitle>
        <Info className="w-4 h-4 text-slate-500" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-1.5 text-slate-400">
          <div className="flex justify-between text-slate-300 font-medium pb-2">
            <span>Gross Annual Income:</span>
            <span>{format(annualIncome)}</span>
          </div>
          
          <div className="border-t border-dashed border-slate-700 my-2"></div>
          
          <div className="flex justify-between items-center text-slate-300">
            <span>Taxable Income Base:</span>
            <span>{format(taxData.taxableIncome)}</span>
          </div>

          <div className="pt-4 pb-2 text-slate-500 uppercase tracking-widest text-[10px]">
             Tax Breakdown
          </div>
          
          {taxData.brackets.map((b, i) => (
             <div key={i} className="flex justify-between pl-2">
               <span className="text-slate-500">
                 {b.name || `${b.range} @ ${b.rate}%`}
               </span>
               <span className="text-slate-400">{format(b.tax)}</span>
             </div>
          ))}

          <div className="border-t border-solid border-slate-700 mt-4 pt-3">
             <div className="flex justify-between text-rose-300 font-bold mb-1">
               <span>Total Estimated Tax:</span>
               <span>{format(taxData.taxAmount)}</span>
             </div>
             <div className="flex justify-between text-emerald-400 font-bold">
               <span>Net After Tax:</span>
               <span>{format(annualIncome - taxData.taxAmount)}</span>
             </div>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-slate-800/50 rounded flex flex-col items-center">
           <span className="text-slate-400 text-xs uppercase tracking-widest mb-1">Effective Rate</span>
           <span className="text-2xl font-bold text-slate-200">{taxData.effectiveRate}%</span>
        </div>
        
        <p className="text-center text-[10px] text-slate-600 mt-4 font-sans">
          ⚠️ This is a simplified estimate. Consult a tax professional for accuracy.
        </p>
      </CardContent>
    </Card>
  );
};
