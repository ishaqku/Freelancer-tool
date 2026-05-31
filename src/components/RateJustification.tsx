import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { negotiationScripts } from '../lib/negotiationScripts';
import { experienceLevels } from '../data/rateData';
import { MessageSquare, Copy, CheckCircle2 } from 'lucide-react';

interface RateJustificationProps {
  baseRate: number;
  userCountry: string;
  skillName: string;
  experienceId: string;
}

export const RateJustification: React.FC<RateJustificationProps> = ({ 
  baseRate, userCountry, skillName, experienceId 
}) => {
  const [clientCountry, setClientCountry] = useState('United States');
  const [selectedScriptId, setSelectedScriptId] = useState('professional-standard');
  const [copied, setCopied] = useState(false);
  
  const scriptTemplate = negotiationScripts.find(s => s.id === selectedScriptId);
  const experienceYears = experienceLevels.find(e => e.id === experienceId)?.yearsRange || 'several';
  
  const generateScriptText = () => {
    if (!scriptTemplate) return "";
    
    // Very simplified market min/max estimation for the template
    const marketMin = Math.round(baseRate * 0.9);
    const marketMax = Math.round(baseRate * 1.4);
    const reducedRate = Math.round(baseRate * 0.85);

    return scriptTemplate.template
      .replace(/\[Client Name\]/g, "Client")
      .replace(/\[experience\]/g, experienceYears)
      .replace(/\[skill\]/g, skillName)
      .replace(/\[clientCountry\]/g, clientCountry)
      .replace(/\[userCountry\]/g, userCountry)
      .replace(/\[rate\]/g, baseRate.toString())
      .replace(/\[reducedRate\]/g, reducedRate.toString())
      .replace(/\[marketMin\]/g, marketMin.toString())
      .replace(/\[marketMax\]/g, marketMax.toString())
      .replace(/\[project name\]/g, "the project")
      .replace(/\[Your Name\]/g, "(Your Name)");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateScriptText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-sm border-slate-200 bg-white">
      <CardHeader className="pb-4 border-b border-slate-100 bg-indigo-50/30">
        <CardTitle className="text-lg flex items-center">
           <MessageSquare className="w-5 h-5 mr-2 text-indigo-600" />
           Rate Justification Scripts
        </CardTitle>
        <CardDescription>Professional copy-paste scripts to explain and defend your rates.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="md:col-span-1 space-y-4 border-r border-slate-100 pr-4">
             <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select Context</label>
                <div className="space-y-1.5">
                  {negotiationScripts.map(script => (
                    <button
                      key={script.id}
                      onClick={() => setSelectedScriptId(script.id)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        selectedScriptId === script.id 
                          ? 'bg-indigo-50 text-indigo-700 font-medium border border-indigo-100' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <div className="capitalize">{script.tone}</div>
                      <div className="text-[10px] opacity-70 truncate font-normal leading-tight mt-0.5">{script.useCase}</div>
                    </button>
                  ))}
                </div>
             </div>
          </div>
          
          <div className="md:col-span-3 space-y-4">
             <div className="bg-slate-50 p-4 sm:p-5 rounded-lg border border-slate-200 relative group min-h-[300px]">
                {copied && (
                  <div className="absolute top-3 right-3 bg-slate-800 text-white text-xs px-2 py-1 rounded flex items-center animate-in fade-in zoom-in transition-all">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Copied!
                  </div>
                )}
                <pre className="whitespace-pre-wrap font-sans text-sm text-slate-700 leading-relaxed">
                  {generateScriptText()}
                </pre>
             </div>
             
             <div className="flex justify-end">
                <Button 
                  onClick={copyToClipboard}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? 'Copied to Clipboard' : 'Copy Email Script'}
                </Button>
             </div>
          </div>

        </div>

      </CardContent>
    </Card>
  );
};
