import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { skillCategories, countries, experienceLevels } from '../data/rateData';
import { getMarketRate } from '../lib/calculator';
import { Globe, MapPin, TrendingUp, BarChart, FileText } from 'lucide-react';
import { Select } from '../components/ui/select';

export const ComparePage = () => {
  const [skillCatId, setSkillCatId] = useState(skillCategories[0].id);
  const [subSkillId, setSubSkillId] = useState(skillCategories[0].subSkills[0].id);
  const [expId, setExpId] = useState(experienceLevels[1].id); // default to mid-level
  const [baseCountryCode, setBaseCountryCode] = useState('US');

  // Handle category change -> reset subskill
  const handleCatChange = (val: string) => {
    setSkillCatId(val);
    const cat = skillCategories.find(c => c.id === val);
    if (cat && cat.subSkills.length > 0) {
      setSubSkillId(cat.subSkills[0].id);
    }
  };

  const selectedCat = skillCategories.find(c => c.id === skillCatId);
  const selectedSub = selectedCat?.subSkills.find(s => s.id === subSkillId);
  
  // Base Rate (the user's baseline for comparison)
  const baseRateData = getMarketRate(subSkillId, baseCountryCode, expId);
  
  // Specific comparison countries
  const compareCountries = ["US", "GB", "DE", "CA", "AU", "NL", "PL", "IN", "PK", "PH", "NG", "BD"];
  
  const comparisonData = compareCountries.map(code => {
    const cData = countries.find(c => c.code === code);
    if (!cData) return null;
    const stats = getMarketRate(subSkillId, code, expId);
    
    // compare to base
    let diffPercent = 0;
    if (stats.midpoint && baseRateData.midpoint) {
       diffPercent = Math.round(((stats.midpoint - baseRateData.midpoint) / baseRateData.midpoint) * 100);
    }

    return {
      name: cData.name,
      code: cData.code,
      min: stats.min,
      max: stats.max,
      mid: stats.midpoint,
      diff: diffPercent
    };
  }).filter(Boolean);
  
  // Sort by highest rate first
  comparisonData.sort((a, b) => (b?.mid || 0) - (a?.mid || 0));

  return (
    <div className="max-w-5xl mx-auto space-y-8 fade-in pb-20 pt-8">
      
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 border-none">Global Rate Map</h1>
        <p className="text-slate-600 font-medium">Compare freelance rates worldwide across different markets.</p>
      </div>
      
      <Card className="shadow-lg border-slate-200 bg-white">
        <CardContent className="p-6 md:p-8">
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 mb-8">
              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Category</label>
                 <Select value={skillCatId} onChange={(e) => handleCatChange(e.target.value)}>
                    {skillCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                 </Select>
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Specific Skill</label>
                 <Select value={subSkillId} onChange={(e) => setSubSkillId(e.target.value)}>
                    {selectedCat?.subSkills.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                 </Select>
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Experience Level</label>
                 <Select value={expId} onChange={(e) => setExpId(e.target.value)}>
                    {experienceLevels.map(e => (
                      <option key={e.id} value={e.id}>{e.label} ({e.yearsRange} yrs)</option>
                    ))}
                 </Select>
              </div>
           </div>
           
           <div className="flex flex-col md:flex-row justify-between mb-4 items-center">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                 <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                 Market Comparison
              </h2>
              <div className="flex items-center space-x-2 text-sm mt-4 md:mt-0">
                 <span className="text-slate-500">Benchmark against:</span>
                 <Select value={baseCountryCode} onChange={e => setBaseCountryCode(e.target.value)} className="w-32 h-8 text-xs">
                    {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                 </Select>
              </div>
           </div>
           
           <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 font-semibold text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                 <div className="col-span-5 md:col-span-4">Country</div>
                 <div className="col-span-4 md:col-span-4">Rate Range (USD/hr)</div>
                 <div className="col-span-3 md:col-span-4 text-right">vs Benchmark</div>
              </div>
              
              <div className="divide-y divide-slate-100">
                 {comparisonData.map((data, i) => {
                    if (!data) return null;
                    const isBase = data.code === baseCountryCode;
                    
                    return (
                        <div key={data.code} className={`grid grid-cols-12 gap-4 p-4 text-sm items-center ${isBase ? 'bg-blue-50/30' : 'hover:bg-slate-50'} transition-colors`}>
                          <div className="col-span-5 md:col-span-4 font-medium flex items-center">
                             <div className="w-6 h-6 mr-3 bg-slate-100 rounded-md flex items-center justify-center text-xs font-bold text-slate-400 shrink-0 border border-slate-200">
                               {data.code}
                             </div>
                             <span className={`truncate ${isBase ? 'text-blue-700 font-bold' : 'text-slate-700'}`}>{data.name}</span>
                             {isBase && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase hidden md:inline">Base</span>}
                          </div>
                          
                          <div className="col-span-4 md:col-span-4 flex items-center font-mono">
                             ${data.min} - ${data.max}
                          </div>
                          
                          <div className="col-span-3 md:col-span-4 text-right">
                             {isBase ? (
                                <span className="text-slate-400 font-medium">---</span>
                             ) : (
                                <span className={`font-medium ${data.diff > 0 ? 'text-emerald-600' : data.diff < 0 ? 'text-rose-600' : 'text-slate-400'}`}>
                                   {data.diff > 0 ? '+' : ''}{data.diff}%
                                </span>
                             )}
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>
           
           <div className="mt-8 bg-indigo-50 border border-indigo-100 p-6 rounded-xl flex items-start space-x-4">
              <Globe className="w-8 h-8 text-indigo-500 shrink-0" />
              <div>
                 <h4 className="font-bold text-indigo-900 mb-1">Strategic Market Insight</h4>
                 <p className="text-sm text-indigo-800/80 leading-relaxed">
                   <strong>{selectedSub?.name}</strong> professionals in the US/UK markets command significantly higher rates (up to {!comparisonData[0] ? '0' : comparisonData[0].max}/hr) compared to the global average. 
                   If you are located in a lower-cost region, focus on securing remote contracts in these high-value markets. You can offer a competitive discount to their local rates while still multiplying your own local income.
                 </p>
              </div>
           </div>

        </CardContent>
      </Card>
    </div>
  );
};
