import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { MessageCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface Scenario {
  id: string;
  clientSays: string;
  options: {
    answer: string;
    feedback: string;
    isCorrect: boolean;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: "too-expensive",
    clientSays: "That's too expensive. I can get a freelancer on Upwork for half that price.",
    options: [
      {
         answer: "I understand budget is important. Can I ask what specific concerns you have about the investment?",
         feedback: "Good response. It opens up dialogue instead of immediately getting defensive or lowering your price.",
         isCorrect: true
      },
      {
         answer: "Cheap developers write bad code. You'll end up paying more to fix it later.",
         feedback: "Too aggressive. While true, insulting their other options makes you seem arrogant.",
         isCorrect: false
      },
      {
         answer: "Okay, I can drop my rate by 20% to fit your budget.",
         feedback: "Never negotiate your rate immediately without reducing scope. It makes your original rate look fake.",
         isCorrect: false
      }
    ]
  },
  {
    id: "free-test",
    clientSays: "We have multiple candidates. Can you do a small test project for free so we can evaluate your skills?",
    options: [
      {
         answer: "No, I don't work for free.",
         feedback: "While enforcing boundaries is good, this is too abrupt and burns the bridge.",
         isCorrect: false
      },
      {
         answer: "I don't do free technical tests, but here is my portfolio of similar work, and I'd be happy to do a paid trial of 5-10 hours.",
         feedback: "Perfect boundary setting. It respects your time while offering a professional alternative.",
         isCorrect: true
      },
      {
         answer: "Sure, what do you need me to build?",
         feedback: "You're devaluing your time. Professional freelancers with decent experience rarely work for free.",
         isCorrect: false
      }
    ]
  },
  {
    id: "start-today",
    clientSays: "We need this done ASAP. Can you start today and work through the weekend to finish it?",
    options: [
      {
         answer: "I can start next Tuesday. Or, if it's an absolute emergency, I can start today but it requires a 50% rush fee.",
         feedback: "Excellent. Rush jobs require rush fees. It trains the client to respect your time and plan better.",
         isCorrect: true
      },
      {
         answer: "Yes, I can start right now and I'll work the weekend.",
         feedback: "You are setting a terrible precedent. The client will expect you to jump every time they say jump.",
         isCorrect: false
      },
      {
         answer: "I don't work weekends.",
         feedback: "A bit too short. It's better to offer alternatives (like a rush fee) instead of a flat rejection.",
         isCorrect: false
      }
    ]
  }
];

export const NegotiationSimulator = () => {
  const [currentScenarioIdx, setCurrentScenarioIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);

  const scenario = scenarios[currentScenarioIdx];
  const isAnswered = selectedOptionIdx !== null;

  const handleNext = () => {
    setSelectedOptionIdx(null);
    setCurrentScenarioIdx(prev => (prev + 1) % scenarios.length);
  };

  return (
    <Card className="shadow-sm border-slate-200 bg-white">
      <CardHeader className="pb-4 border-b border-amber-100 bg-amber-50/30">
        <CardTitle className="text-lg flex items-center">
           <MessageCircle className="w-5 h-5 mr-2 text-amber-600" />
           Negotiation Simulator
        </CardTitle>
        <CardDescription>Practice handling common client objections regarding your rates.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
         
         <div className="space-y-6">
            
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
               <span>Scenario {currentScenarioIdx + 1} of {scenarios.length}</span>
               <div className="flex space-x-1">
                 {scenarios.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentScenarioIdx ? 'bg-amber-500' : 'bg-slate-200'}`} />
                 ))}
               </div>
            </div>

            <div className="bg-slate-100 p-5 rounded-lg border border-slate-200 relative">
               <div className="text-xs font-bold text-slate-500 mb-2">CLIENT SAYS:</div>
               <p className="text-lg text-slate-800 font-medium italic">"{scenario.clientSays}"</p>
            </div>

            <div className="space-y-3">
               <div className="text-xs font-bold text-slate-500 mb-2">HOW DO YOU RESPOND?</div>
               {scenario.options.map((opt, idx) => {
                  const isSelected = selectedOptionIdx === idx;
                  const showFeedback = isAnswered && isSelected;
                  
                  let optStyle = "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white text-slate-700";
                  if (isSelected) {
                     optStyle = opt.isCorrect 
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900" 
                        : "border-rose-500 bg-rose-50 text-rose-900";
                  } else if (isAnswered) {
                     optStyle = "border-slate-100 opacity-50 bg-white";
                  }

                  return (
                     <div key={idx} className="space-y-2">
                        <button 
                          disabled={isAnswered}
                          onClick={() => setSelectedOptionIdx(idx)}
                          className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${optStyle}`}
                        >
                           <p className="font-medium text-sm">"{opt.answer}"</p>
                        </button>
                        
                        {showFeedback && (
                           <div className={`animate-in slide-in-from-top-2 p-3 rounded-lg text-sm flex items-start mt-2 ${
                              opt.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                           }`}>
                              {opt.isCorrect ? <CheckCircle2 className="w-5 h-5 mr-2 shrink-0" /> : <XCircle className="w-5 h-5 mr-2 shrink-0" />}
                              <span>{opt.feedback}</span>
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>

            {isAnswered && (
               <div className="pt-4 flex justify-end animate-in fade-in">
                  <Button onClick={handleNext} className="bg-slate-800 text-white">
                    Next Scenario <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
               </div>
            )}

         </div>

      </CardContent>
    </Card>
  );
};
