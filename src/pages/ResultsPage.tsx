import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculator } from '../context/CalculatorContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Share2, FileText, ArrowRight, TrendingUp, AlertCircle, CheckCircle, Lightbulb, Globe } from 'lucide-react';
import { countries, skillCategories, experienceLevels, currencies } from '../data/rateData';
import { CurrencyConverter } from '../components/CurrencyConverter';
import { CostOfLivingBadge } from '../components/CostOfLivingBadge';
import { TaxEstimator } from '../components/TaxEstimator';
import { ClientLocationAdjuster } from '../components/ClientLocationAdjuster';
import { ProjectEstimator } from '../components/ProjectEstimator';
import { RateJustification } from '../components/RateJustification';
import { ScheduleVisualizer } from '../components/ScheduleVisualizer';
import { CurrencyRiskAlert } from '../components/CurrencyRiskAlert';
import { SkillUpgradePath } from '../components/SkillUpgradePath';
import { ShareResults } from '../components/ShareResults';
import { NegotiationSimulator } from '../components/NegotiationSimulator';

export const ResultsPage = () => {
  const { results, formData } = useCalculator();
  const navigate = useNavigate();

  useEffect(() => {
    if (!results) {
      navigate('/calculator');
    }
  }, [results, navigate]);

  if (!results) return null;

  const { rateData, projection, goalAnalysis } = results;

  const countryName = countries.find(c => c.code === formData.country)?.name || formData.country;
  let skillName = '';
  skillCategories.forEach(cat => {
    const sub = cat.subSkills.find(s => s.id === formData.subSkill);
    if (sub) skillName = sub.name;
  });
  const expLabel = experienceLevels.find(e => e.id === formData.experience)?.label || formData.experience;
  
  const currencySymbol = currencies.find(c => c.code === formData.currency)?.symbol || '$';
  
  const customRateStr = localStorage.getItem('userHourlyRate');
  const effectiveBaseRate = customRateStr ? parseFloat(customRateStr) : rateData.midpoint;
  
  const formatCurrency = (amount: number, forceUSD = false) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: forceUSD ? 'USD' : (formData.currency || 'USD'),
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate Health Score
  const getHealthScore = () => {
    let score = 70; // Base score
    const details = [];

    if (rateData.midpoint > 30) {
      score += 15;
      details.push({ text: "Rate vs Market: +15 pts", subtext: "(Above global average)", positive: true });
    }
    
    if (formData.billableHours >= 25 && formData.billableHours <= 35) {
      score += 10;
      details.push({ text: "Billable Hours: +10 pts", subtext: "(Healthy balance)", positive: true });
    } else if (formData.billableHours < 20) {
      score -= 10;
      details.push({ text: "Billable Hours: -10 pts", subtext: `(${formData.billableHours} hrs - under-utilization)`, positive: false });
    } else {
      score -= 15;
      details.push({ text: "Burnout Risk: -15 pts", subtext: `(${formData.billableHours} hrs is too high)`, positive: false });
    }

    if (formData.clientTypes.length === 1) {
      score -= 5;
      details.push({ text: "Diversification: -5 pts", subtext: "(Single client type focus)", positive: false });
    } else if (formData.clientTypes.length > 2) {
      score += 10;
      details.push({ text: "Diversification: +10 pts", subtext: "(Multiple income streams)", positive: true });
    }

    score += 5;
    details.push({ text: "Tax Planning: +5 pts", subtext: "(Using estimator)", positive: true });

    return { score: Math.min(100, Math.max(0, score)), details };
  };

  const healthScore = getHealthScore();
  const subSkillId = formData.subSkill || '';

  return (
    <div className="max-w-6xl mx-auto space-y-8 fade-in">
      
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Personalized Rate Results</h1>
        <p className="text-slate-600 font-medium flex items-center justify-center space-x-2">
          <span>{formData.city ? `${formData.city}, ` : ''}{countryName}</span>
          <span className="text-slate-300">•</span>
          <span>{skillName}</span>
          <span className="text-slate-300">•</span>
          <span>{expLabel}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Result Column */}
        <div className="lg:col-span-8 space-y-8">
          
          <CurrencyRiskAlert countryCode={formData.country} currencyCode={formData.currency} />
          
          <CurrencyConverter 
            amountInUSD={rateData.midpoint} 
            userCurrency={formData.currency} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CostOfLivingBadge countryCode={formData.country} cityName={formData.city} />
            
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="py-4 border-b border-slate-100">
                <CardTitle className="text-sm uppercase tracking-wider text-slate-500">Rate Calculation Factors</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-600">
                   <span>Global US Benchmark ({skillName})</span>
                   <span className="font-semibold">${rateData.breakdown.baseMin} - ${rateData.breakdown.baseMax}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                   <span>Location Factor ({formData.city || countryName})</span>
                   <span className="font-semibold">x{rateData.breakdown.cityMult || rateData.breakdown.countryMult}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                   <span>Experience Factor ({expLabel})</span>
                   <span className="font-semibold">x{rateData.breakdown.expMult}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600">
                   <span>Work Config (Arrangement & Client)</span>
                   <span className="font-semibold">x{(rateData.breakdown.arrangementMult * rateData.breakdown.clientMult).toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900 text-sm">
                   <span>Final Adjusted Target</span>
                   <span>${rateData.minRate} - ${rateData.maxRate}/hr</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <TaxEstimator 
            countryCode={formData.country} 
            annualIncome={projection.annualGross} 
            currencySymbol="$" 
          />
          
          {/* Smart Suggestions */}
          <Card className="border border-blue-100 shadow-sm bg-blue-50/30">
            <CardHeader className="pb-3 border-b border-blue-100 flex justify-between items-center flex-row">
              <CardTitle className="text-lg text-slate-800 flex items-center">
                 <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                 Smart Optimization Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-white p-4 rounded-lg border border-blue-100">
                   <h4 className="text-sm font-semibold text-slate-800 mb-2">Income Growth Paths</h4>
                   <ul className="text-sm space-y-2 text-slate-600">
                     <li className="flex items-start"><TrendingUp className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" /> Consider targeting Enterprise clients for a potential 15% rate bump.</li>
                     <li className="flex items-start"><TrendingUp className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" /> By retaining clients longer, you can reduce your {formData.nonBillablePercent}% non-billable time.</li>
                   </ul>
                 </div>
                 
                 <div className="bg-white p-4 rounded-lg border border-blue-100">
                   <h4 className="text-sm font-semibold text-slate-800 mb-2">Market & Location context</h4>
                   <ul className="text-sm space-y-2 text-slate-600">
                     <li className="flex items-start"><Globe className="w-4 h-4 text-blue-500 mr-2 shrink-0 mt-0.5" /> {formData.city ? `Your rate is optimized for ${formData.city}'s exact cost index.` : 'Select a city in Step 1 to get a much more accurate local rate.'}</li>
                     <li className="flex items-start"><Globe className="w-4 h-4 text-blue-500 mr-2 shrink-0 mt-0.5" /> Working fully remote for US/UK clients? You can use US Location benchmarks instead.</li>
                   </ul>
                 </div>
               </div>
               
            </CardContent>
          </Card>

          <ClientLocationAdjuster 
            baseRate={effectiveBaseRate}
            userCountry={formData.country}
            skillId={subSkillId}
            experienceId={formData.experience}
          />
          
          <ProjectEstimator baseRate={effectiveBaseRate} />
          
          <RateJustification 
            baseRate={effectiveBaseRate}
            userCountry={formData.country}
            skillName={skillName}
            experienceId={formData.experience}
          />
          
          <NegotiationSimulator />
          
          <ScheduleVisualizer 
            billableHoursPerWeek={formData.billableHours} 
            nonBillablePercent={formData.nonBillablePercent} 
          />
          
          <SkillUpgradePath currentSkillId={subSkillId} />
          
          <ShareResults 
             rate={rateData.midpoint}
             skillName={skillName}
             experienceYears={expLabel}
             countryName={countryName}
          />

        </div>

        {/* Sidebar Info Column */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card className="shadow-sm border-slate-200 bg-white">
             <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-lg">Your Freelance Health Score</CardTitle>
             </CardHeader>
             <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-4xl font-bold font-mono tracking-tighter">
                      <span className={healthScore.score > 80 ? 'text-emerald-600' : healthScore.score > 60 ? 'text-amber-500' : 'text-rose-600'}>
                        {healthScore.score}
                      </span>
                      <span className="text-xl text-slate-300">/100</span>
                   </div>
                   <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      healthScore.score > 80 ? 'bg-emerald-100 text-emerald-800' : 
                      healthScore.score > 60 ? 'bg-amber-100 text-amber-800' : 
                      'bg-rose-100 text-rose-800'
                   }`}>
                      {healthScore.score > 80 ? 'Excellent' : healthScore.score > 60 ? 'Good' : 'Needs Work'}
                   </div>
                </div>
                
                <div className="space-y-3 pt-2 border-t border-slate-100">
                   {healthScore.details.map((detail, idx) => (
                      <div key={idx} className="text-sm">
                         <div className={`mt-0.5 font-medium ${detail.positive ? 'text-emerald-700' : 'text-rose-700'}`}>
                           {detail.positive ? <CheckCircle className="w-3.5 h-3.5 inline mr-1" /> : <AlertCircle className="w-3.5 h-3.5 inline mr-1" />}
                           {detail.text}
                         </div>
                         <div className="text-xs text-slate-500 ml-5">{detail.subtext}</div>
                      </div>
                   ))}
                </div>
                
                {healthScore.score < 85 && (
                   <div className="pt-4 border-t border-slate-100">
                      <div className="text-xs font-semibold text-slate-900 mb-2">Recommendations to reach 85+:</div>
                      <ul className="text-xs text-slate-600 space-y-1.5 ml-4 list-disc">
                         {formData.billableHours < 25 && <li>Increase billable hours to 30+/week</li>}
                         {formData.clientTypes.length < 2 && <li>Diversify your client portfolio</li>}
                         <li>Learn a complementary high-ROI skill</li>
                      </ul>
                   </div>
                )}
             </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-white sticky top-24">
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="text-lg">Schedule Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Billable hours/week</span>
                <span className="font-medium">{formData.billableHours} h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Effective billable/week</span>
                <span className="font-semibold text-blue-600">{projection.effectiveHoursPerWeek} h</span>
              </div>
              <div className="flex justify-between text-sm pb-2 border-b border-slate-100">
                <span className="text-slate-500">Working weeks/year</span>
                <span className="font-medium">{formData.workingWeeks} wk</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-medium text-slate-900">Total billable output</span>
                <span className="font-bold text-slate-900">{projection.effectiveHoursPerWeek * formData.workingWeeks} hrs / yr</span>
              </div>
            </CardContent>
          </Card>

          {goalAnalysis && (
            <Card className={`border-2 ${goalAnalysis.status === 'achieved' ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'} shadow-sm`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center space-x-2">
                  {goalAnalysis.status === 'achieved' 
                    ? <><CheckCircle className="w-5 h-5 text-emerald-600"/> <span className="text-emerald-800">Goal Achieved</span></>
                    : <><AlertCircle className="w-5 h-5 text-amber-600"/> <span className="text-amber-800">Goal Gap Analysis</span></>
                  }
                </CardTitle>
                <CardDescription className={goalAnalysis.status === 'achieved' ? "text-emerald-700 font-medium" : "text-amber-700"}>
                  {goalAnalysis.status === 'achieved' ? goalAnalysis.message : `You are short by ${formatCurrency(goalAnalysis.gapAmount || 0, true)}/yr net.`}
                </CardDescription>
              </CardHeader>
              
              {goalAnalysis.status === 'gap' && goalAnalysis.suggestions && (
                <CardContent>
                  <p className="text-xs font-semibold text-amber-800 mb-2 uppercase tracking-wider">To hit your goal, try one of these:</p>
                  <ul className="space-y-2">
                    {goalAnalysis.suggestions.map((sug, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-amber-900">
                        <TrendingUp className="w-4 h-4 mt-0.5 text-amber-600 flex-shrink-0" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          )}

          <div className="flex flex-col space-y-3 pt-4">
            <Button variant="outline" onClick={() => navigate('/compare')} className="w-full h-12 text-sm font-bold border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
               View Global Rate Map 🌍
            </Button>
            <Button variant="outline" onClick={() => navigate('/calculator')} className="w-full h-12 text-sm font-medium">
               ⟵ Edit Calculator Inputs
            </Button>
            <div className="flex justify-center space-x-2 pt-2 text-slate-400 text-[10px] items-center">
               <span className="flex items-center"><Globe className="w-3 h-3 mr-1" /> Data: Numbeo 2024</span>
               <span>•</span>
               <span>Taxes: 2024 Official Brackets</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
