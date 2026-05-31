import React, { useEffect, useState } from 'react';
import { useCurrencyRates } from '../hooks/useCurrencyRates';
import { getCurrencySymbol, convertCurrency } from '../lib/currencyApi';

interface CurrencyConverterProps {
  amountInUSD: number;
  userCurrency: string;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ amountInUSD, userCurrency }) => {
  const { rates, loading, error } = useCurrencyRates();
  const [converted, setConverted] = useState<number>(amountInUSD);
  const [alts, setAlts] = useState<{eur: number; gbp: number; inr: number}>({ eur: 0, gbp: 0, inr: 0 });

  useEffect(() => {
    let mounted = true;
    const processConverted = async () => {
       if (rates) {
         try {
           const c = await convertCurrency(amountInUSD, 'USD', userCurrency, rates);
           const eur = await convertCurrency(amountInUSD, 'USD', 'EUR', rates);
           const gbp = await convertCurrency(amountInUSD, 'USD', 'GBP', rates);
           const inr = await convertCurrency(amountInUSD, 'USD', 'INR', rates);
           
           if (mounted) {
             setConverted(Math.round(c));
             setAlts({ eur: Math.round(eur), gbp: Math.round(gbp), inr: Math.round(inr) });
           }
         } catch (e) {
           console.error(e);
         }
       } else if (userCurrency === 'USD') {
         if (mounted) setConverted(amountInUSD);
       }
    };
    processConverted();
    return () => { mounted = false; };
  }, [rates, amountInUSD, userCurrency]);

  if (loading) {
    return <div className="animate-pulse rounded h-16 bg-slate-100 max-w-sm mx-auto"></div>;
  }

  const symbol = getCurrencySymbol(userCurrency);

  return (
    <div className="text-center rounded-xl overflow-hidden border border-slate-200">
      <div className="bg-slate-50 py-2 border-b border-slate-200">
        <h4 className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Your Rate Overview</h4>
      </div>
      <div className="py-6 px-4 bg-white">
        {userCurrency !== 'USD' && (
          <div className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-1">Local Equivalent</div>
        )}
        <div className="flex justify-center items-baseline space-x-2">
          <span className="text-5xl font-extrabold tracking-tighter text-slate-900">
            {symbol}{converted.toLocaleString()}
          </span>
          <span className="text-xl text-slate-500 font-medium">/ hr</span>
        </div>
        
        {userCurrency !== 'USD' && (
           <div className="mt-2 text-slate-500 font-medium">
             US Baseline: ${amountInUSD} / hour
           </div>
        )}
      </div>
      
      {!error && (
        <div className="bg-slate-50 py-3 border-t border-slate-200 flex justify-center space-x-4 text-xs font-mono text-slate-500">
          <span>€{alts.eur} / hr</span>
          <span className="text-slate-300">|</span>
          <span>£{alts.gbp} / hr</span>
          <span className="text-slate-300">|</span>
          <span>₹{alts.inr} / hr</span>
        </div>
      )}
      
      <div className="bg-slate-100 py-1.5 text-[10px] text-slate-400">
        {error ? "Using fallback currency data" : `Last updated: ${rates?.date || 'Live'}`}
      </div>
    </div>
  );
};
