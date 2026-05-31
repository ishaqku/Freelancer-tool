import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { skillUpgradePaths } from '../lib/skillTrends';
import { Button } from './ui/button';
import { TrendingUp, BookOpen, ArrowRight, ExternalLink } from 'lucide-react';

interface SkillUpgradePathProps {
  currentSkillId: string;
}

export const SkillUpgradePath: React.FC<SkillUpgradePathProps> = ({ currentSkillId }) => {
  // Try to find matching paths. Map generic skill categories if exact match isn't found
  let matchId = currentSkillId;
  if (!skillUpgradePaths[currentSkillId]) {
    // Basic mapping heuristic (for demo structure purposes)
    if (currentSkillId.includes('react') || currentSkillId.includes('vue') || currentSkillId.includes('front')) matchId = 'react-nextjs';
    else if (currentSkillId.includes('word') || currentSkillId.includes('cms')) matchId = 'wordpress';
    else if (currentSkillId.includes('writ') || currentSkillId.includes('content')) matchId = 'content-writing';
    else if (currentSkillId.includes('ui') || currentSkillId.includes('ux') || currentSkillId.includes('design')) matchId = 'ui-design';
  }

  const upgradeData = skillUpgradePaths[matchId];

  if (!upgradeData) {
    return null; // Don't show component if no path exists for this skill
  }

  return (
    <Card className="shadow-sm border-blue-100 bg-white">
      <CardHeader className="pb-4 border-b border-slate-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardTitle className="text-lg flex items-center">
           <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
           Skill Upgrade Roadmap
        </CardTitle>
        <CardDescription>High-ROI skills you can learn based on your current expertise.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        
        <div className="flex items-center text-sm font-medium text-slate-500 mb-2">
           Current: <span className="font-semibold text-slate-800 ml-1">{upgradeData.currentSkill}</span>
        </div>

        <div className="space-y-4">
          {upgradeData.paths.map((path, idx) => (
            <div key={idx} className="border border-slate-200 rounded-lg p-5 hover:border-indigo-300 hover:shadow-md transition-all group overflow-hidden relative">
              <div className="absolute right-0 top-0 h-full w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                 <div>
                    <h3 className="font-semibold text-lg text-slate-900">{path.targetSkill}</h3>
                    <div className="flex items-center text-xs text-slate-500 mt-1 space-x-3">
                       <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {path.timeToLearn}</span>
                       <span className={`capitalize ${path.difficulty === 'hard' ? 'text-rose-500' : path.difficulty === 'moderate' ? 'text-amber-500' : 'text-emerald-500'}`}>
                         {path.difficulty} to transition
                       </span>
                    </div>
                 </div>
                 
                 <div className="text-right">
                    <div className="text-sm text-slate-500 line-through decoration-slate-300">
                      ${path.currentRate.min}-${path.currentRate.max}/hr
                    </div>
                    <div className="text-lg font-bold text-slate-900 flex items-center justify-end">
                      ${path.targetRate.min}-${path.targetRate.max}/hr
                       <span className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                         +{path.incomeIncrease}% ROI
                       </span>
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-100 mb-4">
                 <div>
                   <div className="text-xs font-semibold text-slate-900 mb-1.5">What you need to learn:</div>
                   <ul className="text-sm text-slate-600 space-y-1">
                     {path.prerequisites.map((prereq, pIdx) => (
                       <li key={pIdx} className="flex items-start">
                         <span className="text-indigo-400 mr-1.5">•</span> {prereq}
                       </li>
                     ))}
                   </ul>
                 </div>
                 <div>
                   <div className="text-xs font-semibold text-slate-900 mb-1.5 align-middle">Demand Trend</div>
                   <div className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-sm font-medium">
                      {path.demandTrend === 'rising' && <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />}
                      <span className="capitalize">{path.demandTrend} Market Demand</span>
                   </div>
                 </div>
              </div>
              
              <div>
                <div className="text-xs font-semibold text-slate-900 mb-2 flex items-center">
                   <BookOpen className="w-3.5 h-3.5 mr-1" /> Learning Resources:
                </div>
                <div className="flex flex-wrap gap-2">
                   {path.resources.map((res, rIdx) => (
                     <a 
                       key={rIdx} 
                       href={res.url} 
                       target="_blank" 
                       rel="noreferrer"
                       className={`inline-flex items-center text-xs px-2.5 py-1 rounded border ${
                         res.type === 'free' 
                           ? 'bg-blue-50/50 border-blue-200 text-blue-700 hover:bg-blue-100' 
                           : 'bg-amber-50/50 border-amber-200 text-amber-700 hover:bg-amber-100'
                       }`}
                     >
                       {res.name}
                       <span className="ml-1 opacity-50">[{res.type}]</span>
                       <ExternalLink className="w-2.5 h-2.5 ml-1" />
                     </a>
                   ))}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper clock icon
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  );
}
