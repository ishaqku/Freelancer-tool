import React from 'react';
import { Share2, Twitter, Linkedin, Facebook, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

interface ShareResultsProps {
  rate: number;
  skillName: string;
  experienceYears: string;
  countryName: string;
}

export const ShareResults: React.FC<ShareResultsProps> = ({
  rate, skillName, experienceYears, countryName
}) => {
  // Safe fallback if somehow variables are missing
  const safeRate = rate || 0;
  const safeLocation = countryName || 'my location';
  
  const twitterMsg = encodeURIComponent(
    `Just calculated my freelance rate: $${safeRate}/hr for ${skillName} in ${safeLocation}.\n\nIs this fair? Calculate yours \uD83D\uDC47\n#freelance #developer`
  );
  
  const linkedinMsg = encodeURIComponent(
    `Knowledge is power. I used this tool to benchmark my freelance rate against global standards. \n\nResult: $${safeRate}/hr for ${experienceYears} of ${skillName} experience.\n\nWhat's your rate? Let's normalize pay transparency.`
  );

  const url = encodeURIComponent(window.location.origin);

  return (
    <Card className="shadow-sm border-slate-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-10 rounded-bl-full pointer-events-none" />
      
      <CardHeader className="pb-3 border-b border-slate-100">
        <CardTitle className="text-lg flex items-center">
           <Share2 className="w-5 h-5 mr-2 text-slate-700" />
           Share Your Market Value
        </CardTitle>
        <CardDescription>Normalize pay transparency. Share your baseline to help others negotiate better rates.</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="space-y-4">
          <div className="font-semibold text-sm text-slate-800">Pre-written Social Posts</div>
          
          <div className="space-y-3">
             <Button 
               variant="outline" 
               className="w-full justify-start text-left border-slate-200 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all font-normal h-auto py-3"
               onClick={() => window.open(`https://twitter.com/intent/tweet?text=${twitterMsg}&url=${url}`, '_blank')}
             >
                <Twitter className="w-5 h-5 mr-3 shrink-0" />
                <div className="space-y-1 overflow-hidden">
                   <div className="font-medium">Share on X (Twitter)</div>
                   <p className="text-xs text-slate-500 truncate leading-relaxed">"Just calculated my freelance rate: ${safeRate}/hr..."</p>
                </div>
             </Button>

             <Button 
               variant="outline" 
               className="w-full justify-start text-left border-slate-200 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all font-normal h-auto py-3"
               onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')}
             >
                <Linkedin className="w-5 h-5 mr-3 shrink-0" />
                <div className="space-y-1 overflow-hidden">
                   <div className="font-medium">Share on LinkedIn</div>
                   <p className="text-xs text-slate-500 truncate leading-relaxed">"Knowledge is power. I used this tool to benchmark..."</p>
                </div>
             </Button>
          </div>
        </div>

        <div className="space-y-4 flex flex-col items-center justify-center">
           <div className="w-full max-w-xs relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500 opacity-20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500 opacity-20 rounded-full blur-2xl" />
              
              <div className="relative z-10 text-center space-y-3">
                 <div className="uppercase tracking-widest text-[10px] font-bold text-slate-400">My Market Benchmark</div>
                 <div className="text-4xl font-black font-mono tracking-tighter">
                   ${safeRate}<span className="text-xl text-slate-400 font-medium tracking-normal">/hr</span>
                 </div>
                 <div className="h-px bg-slate-700 w-1/2 mx-auto my-2" />
                 <div className="text-sm font-semibold truncate px-2 text-slate-200">{skillName}</div>
                 <div className="text-xs text-slate-400 flex items-center justify-center">
                    {experienceYears} exp • {safeLocation}
                 </div>
              </div>
           </div>
           
           <p className="text-xs text-slate-500 max-w-xs text-center">Capture a screenshot of this card to share on visually-focused platforms like Instagram or LinkedIn.</p>
        </div>

      </CardContent>
    </Card>
  );
};
