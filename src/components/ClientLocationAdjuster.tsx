import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { getMarketRate } from '../lib/calculator';
import { countries } from '../data/rateData';
import { Copy, Globe, ArrowUpRight } from 'lucide-react';

interface ClientLocationAdjusterProps {
  baseRate: number;
  userCountry: string;
  skillId: string;
  experienceId: string;
}

export const ClientLocationAdjuster: React.FC<ClientLocationAdjusterProps> = ({ 
  baseRate, userCountry, skillId, experienceId 
}) => {
  const [clientCountry, setClientCountry] = useState('US');

  const { recommendedRate, marketRange, justification } = React.useMemo(() => {
     const clientMarketRate = getMarketRate(skillId, clientCountry, experienceId);
     const userMinimum = baseRate * 1.2; 
     const recommended = Math.round(Math.max(userMinimum, clientMarketRate.midpoint * 0.85));

     return {
       recommendedRate: recommended,
       marketRange: clientMarketRate,
       justification: [
         `${clientCountry} market rate for this skill: $${clientMarketRate.min}-$${clientMarketRate.max}/hr`,
         `Remote work typically commands 85-90% of local rate`,
         `This rate is highly competitive for the client while maximizing your earnings.`
       ]
     };
  }, [baseRate, clientCountry, skillId, experienceId]);

  const increase = Math.round(((recommendedRate - baseRate) / baseRate) * 100);
  const clientCountryName = countries.find(c => c.code === clientCountry)?.name || clientCountry;

  return (
    <Card className="shadow-sm border-blue-100 bg-white">
      <CardHeader className="pb-4 border-b border-slate-100 bg-blue-50/30">
        <CardTitle className="text-lg flex items-center">
           <Globe className="w-5 h-5 mr-2 text-blue-600" />
           Client Location Rate Adjuster
        </CardTitle>
        <CardDescription>Adapt your rate when working with international clients.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
           <div>
             <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Your Base Target</div>
             <div className="text-xl font-bold font-mono">${baseRate}/hr</div>
           </div>
           <div className="w-full sm:w-auto">
             <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">Select Client Country</div>
             <Select value={clientCountry} onChange={(e) => setClientCountry(e.target.value)} className="w-full sm:w-48 bg-white">
               {countries.filter(c => c.multiplier > 0.5 || c.code === 'US').map(c => (
                 <option key={c.code} value={c.code}>{c.name}</option>
               ))}
             </Select>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div className="text-center p-6 bg-blue-600 rounded-xl text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                   <Globe className="w-16 h-16" />
                </div>
                <div className="text-sm text-blue-100 font-medium mb-1">Recommended Rate</div>
                <div className="text-4xl font-black tracking-tighter">${recommendedRate}<span className="text-xl font-medium">/hr</span></div>
                {increase > 0 && (
                   <div className="mt-2 text-sm font-semibold text-emerald-300 flex items-center justify-center">
                     <ArrowUpRight className="w-4 h-4 mr-1" />
                     {increase}% vs local rate
                   </div>
                )}
             </div>
          </div>
          
          <div className="space-y-3">
             <div className="text-sm font-semibold text-slate-800">Why this rate?</div>
             <ul className="text-sm space-y-2 text-slate-600">
               {justification.map((j, i) => (
                 <li key={i} className="flex items-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 shrink-0" />
                   {j}
                 </li>
               ))}
             </ul>
             
             <div className="pt-2 text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded">
                Market range in {clientCountryName}: ${marketRange.min} - ${marketRange.max}
             </div>
          </div>
        </div>
        
      </CardContent>
    </Card>
  );
};
