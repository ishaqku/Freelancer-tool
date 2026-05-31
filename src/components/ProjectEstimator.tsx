import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { projectTemplates } from '../lib/projectTemplates';
import { Calculator, Check, ArrowRight, Copy } from 'lucide-react';

interface ProjectEstimatorProps {
  baseRate: number;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ baseRate }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [bufferPercent, setBufferPercent] = useState<number>(15);
  
  const template = projectTemplates.find(t => t.id === selectedTemplateId);
  
  const toggleAddOn = (name: string) => {
    setSelectedAddOns(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const calculateEstimate = () => {
    if (!template) return null;
    
    // Adjusted rate based on complexity
    const hourlyRate = baseRate * template.hourlyRateMultiplier;
    
    // Base min/max hours
    const baseMinHours = template.estimatedHours.min;
    const baseMaxHours = template.estimatedHours.max;
    
    // Add-ons hours
    const addOnsHours = template.commonAddOns
      .filter(a => selectedAddOns.includes(a.name))
      .reduce((sum, addOn) => sum + addOn.hours, 0);
      
    const minHours = baseMinHours + addOnsHours;
    const maxHours = baseMaxHours + addOnsHours;
    
    const baseMinQuote = minHours * hourlyRate;
    const baseMaxQuote = maxHours * hourlyRate;
    
    const bufferMin = baseMinQuote * (bufferPercent / 100);
    const bufferMax = baseMaxQuote * (bufferPercent / 100);
    
    const finalMin = Math.round(baseMinQuote + bufferMin);
    const finalMax = Math.round(baseMaxQuote + bufferMax);
    const recommendedFixed = Math.round((finalMin + finalMax) / 2);
    
    return {
      minHours,
      maxHours,
      hourlyRate: Math.round(hourlyRate),
      baseMin: Math.round(baseMinQuote),
      baseMax: Math.round(baseMaxQuote),
      bufferMin: Math.round(bufferMin),
      bufferMax: Math.round(bufferMax),
      finalMin,
      finalMax,
      recommendedFixed
    };
  };

  const generateQuoteText = (estimate: any) => {
    if (!template || !estimate) return "";
    
    const addOnsText = selectedAddOns.length > 0 
      ? `\nAdd-ons Included:\n${selectedAddOns.map(a => `• ${a}`).join('\n')}` 
      : "";

    return `PROJECT QUOTE ESTIMATE
Date: ${new Date().toLocaleDateString()}

Project: ${template.name}
Description: ${template.description}

PROJECT SCOPE:
${template.scopeItems.map(item => `• ${item}`).join('\n')}${addOnsText}

REVISIONS: ${template.revisionRounds} rounds included
DELIVERABLES: ${template.deliverables.join(', ')}

INVESTMENT OPTIONS:
Option 1 (Fixed Price): $${estimate.recommendedFixed}
Option 2 (Hourly): $${estimate.hourlyRate}/hr (Estimated ${estimate.minHours}-${estimate.maxHours} hours)
`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const estimate = calculateEstimate();

  return (
    <Card className="shadow-sm border-slate-200 bg-white">
      <CardHeader className="pb-4 border-b border-slate-100 bg-emerald-50/30">
        <CardTitle className="text-lg flex items-center">
           <Calculator className="w-5 h-5 mr-2 text-emerald-600" />
           Project Quote Estimator
        </CardTitle>
        <CardDescription>Generate professional estimates based on your hourly rate.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        
        <div className="space-y-2">
           <label className="text-sm font-medium text-slate-700">Select Project Type</label>
           <Select value={selectedTemplateId} onChange={(e) => {
             setSelectedTemplateId(e.target.value);
             setSelectedAddOns([]);
           }} className="w-full">
             <option value="">-- Choose a standard project --</option>
             {projectTemplates.map(t => (
               <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
             ))}
           </Select>
        </div>

        {template && estimate && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            
            <div className="space-y-6">
               <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                 <h3 className="font-semibold text-slate-800 text-lg mb-1">{template.name}</h3>
                 <div className="text-sm text-slate-500 mb-4 capitalize">Complexity: {template.complexity}</div>
                 
                 <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between items-center text-slate-600">
                       <span>Base Rate</span>
                       <span>${baseRate}/hr</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                       <span>Complexity Factor</span>
                       <span>×{template.hourlyRateMultiplier}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-800 font-semibold border-b border-dashed pb-2 border-slate-300">
                       <span>Project Rate</span>
                       <span>${estimate.hourlyRate}/hr</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-slate-600 pt-2">
                       <span>Base Estimate ({estimate.minHours}-{estimate.maxHours}h)</span>
                       <span>${estimate.baseMin} - ${estimate.baseMax}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-500 text-xs">
                       <span>Risk Buffer ({bufferPercent}%)</span>
                       <span>+${estimate.bufferMin} - ${estimate.bufferMax}</span>
                    </div>
                 </div>
                 
                 <div className="mt-6 pt-4 border-t border-emerald-200 bg-emerald-50 -mx-5 -mb-5 p-5 rounded-b-lg">
                    <div className="text-xs font-semibold uppercase text-emerald-800 mb-1">Recommended Quote</div>
                    <div className="text-3xl font-bold text-emerald-700">${estimate.recommendedFixed}</div>
                    <div className="text-sm text-emerald-600 font-medium mt-1">Or: ${estimate.hourlyRate}/hr (Cap: ${estimate.finalMax})</div>
                 </div>
               </div>
               
               <div className="space-y-3">
                 <div className="text-sm font-semibold text-slate-800 flex justify-between items-center">
                    Risk Buffer
                    <span className="text-blue-600">{bufferPercent}%</span>
                 </div>
                 <input 
                   type="range" 
                   min="0" max="50" step="5" 
                   value={bufferPercent} 
                   onChange={(e) => setBufferPercent(parseInt(e.target.value))}
                   className="w-full accent-blue-600" 
                 />
                 <p className="text-xs text-slate-500">Adds padding for revisions and unforeseen scope creep.</p>
               </div>
            </div>
            
            <div className="space-y-4 text-sm bg-white rounded-lg p-5 border border-slate-100 shadow-sm">
               
               <div className="space-y-2">
                 <h4 className="font-semibold text-slate-900 border-b pb-1">Included Scope</h4>
                 <ul className="space-y-1.5 pt-1">
                   {template.scopeItems.map((item, idx) => (
                     <li key={idx} className="flex items-start text-slate-600">
                        <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                        {item}
                     </li>
                   ))}
                 </ul>
               </div>

               {template.commonAddOns.length > 0 && (
                 <div className="space-y-2 pt-4">
                   <h4 className="font-semibold text-slate-900 border-b pb-1">Common Add-ons</h4>
                   <div className="space-y-2 pt-1">
                     {template.commonAddOns.map((addon, idx) => (
                       <label key={idx} className="flex items-start justify-between cursor-pointer group">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              className="mr-2 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                              checked={selectedAddOns.includes(addon.name)}
                              onChange={() => toggleAddOn(addon.name)}
                            />
                            <span className="text-slate-600 group-hover:text-slate-900 transition-colors">{addon.name}</span>
                          </div>
                          <span className="text-slate-400 text-xs">+{addon.hours}h</span>
                       </label>
                     ))}
                   </div>
                 </div>
               )}
               
               <Button 
                onClick={() => copyToClipboard(generateQuoteText(estimate))}
                variant="outline" 
                className="w-full mt-4"
               >
                 <Copy className="w-4 h-4 mr-2" />
                 Copy Text Quote
               </Button>
            </div>
            
          </div>
        )}
      </CardContent>
    </Card>
  );
};
