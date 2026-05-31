import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FormData, Results } from '../context/CalculatorContext';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useCalculator } from '../context/CalculatorContext';
import { getCurrencySymbol } from '../lib/currencyApi';
import { Clock, ExternalLink, Trash2 } from 'lucide-react';

export interface SavedCalc {
  id: string;
  formData: FormData;
  results: Results;
}

export const SavedCalculations = () => {
  const [saved, setSaved] = useLocalStorage<SavedCalc[]>('ratecalc_history', []);
  const { loadCalculation } = useCalculator();
  const navigate = useNavigate();

  if (!saved || saved.length === 0) return null;

  const handleLoad = (calc: SavedCalc) => {
    loadCalculation({ formData: calc.formData, results: calc.results });
    navigate('/results');
  };

  const clearHistory = () => {
     if(window.confirm("Are you sure you want to clear your calculation history?")) {
        setSaved([]);
     }
  };

  const timeAgo = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 1000 / 60);
    if (diff < 60) return `${diff} min ago`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} hrs ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm border-slate-200 bg-white fade-in mt-16">
      <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg font-semibold flex items-center space-x-2">
          <Clock className="w-5 h-5 text-slate-400" />
          <span>Your Recent Calculations</span>
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={clearHistory} className="text-slate-500 hover:text-rose-600">
           <Trash2 className="w-4 h-4 mr-2" /> Clear
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {saved.slice(0, 5).map((calc) => (
            <div key={calc.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-medium text-slate-900">
                  {calc.formData.subSkill.replace('-', ' ')} <span className="text-slate-400 mx-1">|</span> {calc.formData.country}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Target: {getCurrencySymbol(calc.formData.currency)}{calc.results.rateData.midpoint}/hr 
                  <span className="mx-2">•</span> 
                  {timeAgo(calc.results.timestamp)}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleLoad(calc)} className="space-x-2">
                <span>View</span>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
