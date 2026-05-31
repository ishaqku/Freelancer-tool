import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { AlertCircle, TrendingDown, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import { countries, currencies } from '../data/rateData';

interface CurrencyRiskAlertProps {
  countryCode: string;
  currencyCode: string;
}

// Simulated volatility data (annual % drop vs USD)
const VOLATILE_CURRENCIES: Record<string, number> = {
  'PKR': 15.5,
  'NGN': 25.0,
  'ARS': 45.0,
  'EGP': 22.0,
  'TRY': 30.0,
  'ZAR': 8.5,
  'COP': 9.2,
};

export const CurrencyRiskAlert: React.FC<CurrencyRiskAlertProps> = ({ countryCode, currencyCode }) => {
  const annualDrop = VOLATILE_CURRENCIES[currencyCode];
  
  if (!annualDrop) return null; // Only show for known volatile currencies

  return (
    <Card className="shadow-sm border-rose-200 bg-white">
      <CardHeader className="pb-4 border-b border-rose-100 bg-rose-50/50">
        <CardTitle className="text-lg flex items-center text-rose-900">
           <ShieldAlert className="w-5 h-5 mr-2 text-rose-600" />
           Currency Volatility Alert
        </CardTitle>
        <CardDescription className="text-rose-700">Protect your freelance income from exchange rate fluctuations.</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
         <div className="flex flex-col md:flex-row gap-6">
            
            <div className="md:w-1/3">
               <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center space-y-2">
                 <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex justify-center items-center">
                    <TrendingDown className="w-3 h-3 text-rose-500 mr-1" />
                    Historical Trend
                 </div>
                 <div className="text-3xl font-bold font-mono text-slate-800">
                   {annualDrop}%
                 </div>
                 <div className="text-xs text-slate-600">
                    avg annual depreciation of {currencyCode} vs USD
                 </div>
               </div>
            </div>
            
            <div className="md:w-2/3 space-y-4">
               <div>
                  <h4 className="flex items-center text-sm font-semibold text-slate-900 mb-2">
                    <AlertCircle className="w-4 h-4 mr-1 text-amber-500" />
                    What this means for you
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    If you agree to a long-term contract priced in {currencyCode}, your actual purchasing power drops by ~{annualDrop}% over a year. Your "$50/hr equivalent" might only be worth ${Math.round(50 * (1 - annualDrop/100))}/hr next year.
                  </p>
               </div>
               
               <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 border-l-4 border-l-emerald-500">
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Actionable Protection Strategy:</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                     <li className="flex items-start">
                        <ArrowRightLeft className="w-4 h-4 text-emerald-500 shrink-0 mr-2 mt-0.5" />
                        <span><strong>Invoice foreign clients in USD/EUR/GBP</strong> using platforms like Wise, Payoneer, or Deel.</span>
                     </li>
                     <li className="flex items-start">
                        <ArrowRightLeft className="w-4 h-4 text-emerald-500 shrink-0 mr-2 mt-0.5" />
                        <span><strong>Convert funds only when needed</strong>. Keep your savings in the stable currency.</span>
                     </li>
                     <li className="flex items-start">
                        <ArrowRightLeft className="w-4 h-4 text-emerald-500 shrink-0 mr-2 mt-0.5" />
                        <span><strong>Add inflation clauses</strong> to multi-month contracts if forced to bill in {currencyCode}.</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </CardContent>
    </Card>
  );
};
