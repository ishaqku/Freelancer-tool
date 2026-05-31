import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, DollarSign, Clock, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const IncomeGoalPlannerPage = () => {
  const [annualGoal, setAnnualGoal] = useState(60000);
  const [hourlyRate, setHourlyRate] = useState(45);
  const [weeklyHours, setWeeklyHours] = useState(25);
  const [workingWeeks, setWorkingWeeks] = useState(48);
  
  useEffect(() => {
    let customRateAvailable = false;
    const customRate = localStorage.getItem('userHourlyRate');
    if (customRate) {
      setHourlyRate(parseFloat(customRate));
      customRateAvailable = true;
    }

    const calcData = localStorage.getItem('calculatorState');
    if (calcData) {
      try {
        const parsed = JSON.parse(calcData);
        if (parsed.calculatedRate && !customRateAvailable) setHourlyRate(parsed.calculatedRate);
        if (parsed.billableHoursPerWeek) setWeeklyHours(parsed.billableHoursPerWeek);
        if (parsed.vacationWeeks) setWorkingWeeks(52 - parsed.vacationWeeks);
        if (parsed.targetAnnualSalary) setAnnualGoal(parsed.targetAnnualSalary);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const currentProjection = hourlyRate * weeklyHours * workingWeeks;
  const gap = annualGoal - currentProjection;
  const percentToGoal = Math.min((currentProjection / (annualGoal || 1)) * 100, 100);

  // Strategy 1: Rate Increase
  const requiredRate = annualGoal / (weeklyHours * workingWeeks);
  const rateIncrease = requiredRate - hourlyRate;

  // Strategy 2: Hours Increase
  const requiredHours = annualGoal / (hourlyRate * workingWeeks);
  const hoursIncrease = requiredHours - weeklyHours;

  // Strategy 3: Mixed
  const mixedRate = hourlyRate + (rateIncrease * 0.5);
  const mixedHours = annualGoal / (mixedRate * workingWeeks);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center">
          <Target className="w-8 h-8 mr-3 text-rose-500" />
          Income Goal Planner
        </h1>
        <p className="text-slate-500 mt-2">Map out the exact path to reach your annual revenue target.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Your Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-500 mb-1">Target Annual Income</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number" 
                  value={annualGoal} 
                  onChange={e => setAnnualGoal(Number(e.target.value) || 0)} 
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Hourly Rate</label>
                <div className="font-bold text-slate-900 py-2 border-b border-slate-200">${hourlyRate.toFixed(2)}</div>
              </div>
              <div>
                <label className="block text-sm text-slate-500 mb-1">Billable Hours/Wk</label>
                <div className="font-bold text-slate-900 py-2 border-b border-slate-200">{weeklyHours} hrs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
          <div className="z-10 relative space-y-4">
            <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider">Gap Analysis</h2>
            
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-sm">Goal:</span>
              <span className="font-bold text-xl">${annualGoal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-sm">Current Projection:</span>
              <span className="font-bold text-xl">${currentProjection.toLocaleString()}</span>
            </div>
            
            <div className="border-t border-slate-700 pt-3 flex justify-between items-baseline">
              <span className="text-slate-400 text-sm">Gap:</span>
              <span className={`font-bold text-2xl ${gap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {gap > 0 ? `-$${gap.toLocaleString(undefined, {maximumFractionDigits:0})}` : `+$${Math.abs(gap).toLocaleString(undefined, {maximumFractionDigits:0})}`}
              </span>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-400">Progress</span>
                <span className="text-rose-400">{percentToGoal.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: `${percentToGoal}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-6 -bottom-6 opacity-10">
            <TrendingUp className="w-48 h-48" />
          </div>
        </div>
      </div>

      {gap > 0 ? (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-amber-500" />
            Paths to Reach ${annualGoal.toLocaleString()}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-300 transition-colors">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 justify-center items-center flex rounded-full mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Raise Rate</h3>
              <p className="text-slate-500 text-sm mb-4">Keep your current hours, just charge more per hour.</p>
              
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">New Target Rate:</span>
                  <span className="font-bold text-slate-900">${requiredRate.toFixed(2)}/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Increase Needed:</span>
                  <span className="font-bold text-amber-600">+${rateIncrease.toFixed(2)}/hr</span>
                </div>
              </div>
              
              <Link to="/contract-clause-library" className="mt-4 flex items-center text-sm font-medium text-amber-600 hover:text-amber-700">
                Prepare negotiation clauses <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 justify-center items-center flex rounded-full mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Work More</h3>
              <p className="text-slate-500 text-sm mb-4">Keep your current rate, find more billable work.</p>
              
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">New Target Hours:</span>
                  <span className="font-bold text-slate-900">{requiredHours.toFixed(1)}/wk</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Increase Needed:</span>
                  <span className="font-bold text-blue-600">+{hoursIncrease.toFixed(1)} hrs/wk</span>
                </div>
              </div>
              
              <Link to="/schedule-planner" className="mt-4 flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                Update schedule planner <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMMENDED
              </div>
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 justify-center items-center flex rounded-full mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Mixed Strategy</h3>
              <p className="text-slate-500 text-sm mb-4">A balanced approach combining rate updates and slight hour tweaks.</p>
              
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">New Rate:</span>
                  <span className="font-bold text-slate-900">${mixedRate.toFixed(2)}/hr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">New Hours:</span>
                  <span className="font-bold text-slate-900">{mixedHours.toFixed(1)}/wk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-800">You're on track!</h2>
          <p className="text-emerald-600 max-w-lg mx-auto">
            Based on your current rate and schedule, you are projected to hit or exceed your annual goal. Keep up the great work!
          </p>
        </div>
      )}

    </div>
  );
};
