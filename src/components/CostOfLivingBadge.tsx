import React from 'react';
import { Progress } from './ui/progress';
import { cityDatabase } from '../data/costOfLiving';

interface CostOfLivingBadgeProps {
  countryCode: string;
  cityName: string;
}

export const CostOfLivingBadge: React.FC<CostOfLivingBadgeProps> = ({ countryCode, cityName }) => {
  if (!cityName) return null;
  
  const cities = cityDatabase[countryCode] || [];
  const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  
  if (!city) return null;
  
  const largestCity = cities.find(c => c.name !== "Other" && c.name !== city.name);

  return (
    <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-blue-900 font-mono tracking-tight flex items-center space-x-2">
          <span className="text-lg">📍</span>
          <span>Cost of Living Context</span>
        </h4>
        <span className="text-xs font-medium px-2 py-1 bg-white border border-blue-200 text-blue-700 rounded-full">
          Multiplier: x{city.multiplier.toFixed(2)}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-slate-700">{city.name}</span>
            <span className="text-slate-500">{city.costIndex}/100</span>
          </div>
          <Progress value={city.costIndex} className="h-1.5 bg-blue-100 [&>div]:bg-blue-600" />
        </div>
        
        {largestCity && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-slate-600">{largestCity.name}</span>
              <span className="text-slate-500">{largestCity.costIndex}/100</span>
            </div>
            <Progress value={largestCity.costIndex} className="h-1.5 bg-slate-200 [&>div]:bg-slate-400" />
          </div>
        )}

        <div>
           <div className="flex justify-between text-xs mb-1">
             <span className="font-medium text-slate-600">New York City (Baseline)</span>
             <span className="text-slate-500">100/100</span>
           </div>
           <Progress value={100} className="h-1.5 bg-slate-200 [&>div]:bg-slate-300" />
        </div>
      </div>
      
      {largestCity && city.costIndex < largestCity.costIndex && (
        <div className="pt-2 border-t border-blue-100">
          <p className="text-xs text-blue-800 font-medium">
            Your money goes {Math.round(((largestCity.costIndex - city.costIndex) / city.costIndex) * 100)}% further 
            in {city.name} than in {largestCity.name}.
          </p>
        </div>
      )}
    </div>
  );
};
