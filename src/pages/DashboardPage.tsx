import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Calendar, FileText, Target, Play, Shield, Calculator, BarChart, Edit2, Check } from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [hasData, setHasData] = useState(false);
  const [isEditingRate, setIsEditingRate] = useState(false);
  const rateInputRef = useRef<HTMLInputElement>(null);
  
  const [userData, setUserData] = useState({
    hourlyRate: 45,
    weeklyGoal: 25,
    annualGoal: 60000
  });

  useEffect(() => {
    // Check if user set a manual rate
    const customRate = localStorage.getItem('userHourlyRate');
    if (customRate) {
      setHasData(true);
      setUserData(prev => ({
        ...prev,
        hourlyRate: parseFloat(customRate)
      }));
      return; // Prioritize custom rate
    }

    // Check if user has used tools before by checking localStorage
    const calcData = localStorage.getItem('calculatorState');
    if (calcData) {
      setHasData(true);
      try {
        const parsed = JSON.parse(calcData);
        if (parsed.calculatedRate) {
          setUserData(prev => ({
            ...prev,
            hourlyRate: parsed.calculatedRate
          }));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleRateSave = () => {
    setIsEditingRate(false);
    localStorage.setItem('userHourlyRate', userData.hourlyRate.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRateSave();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back!</h1>
        <p className="text-slate-500 mt-2">Here is your freelance business at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center text-center relative group">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
            <span className="font-bold text-lg">$</span>
          </div>
          <h3 className="text-sm font-medium text-slate-500">Hourly Rate</h3>
          {isEditingRate ? (
            <div className="flex items-center justify-center mt-1 space-x-2">
              <span className="text-xl font-bold text-slate-900">$</span>
              <input
                ref={rateInputRef}
                type="number"
                value={userData.hourlyRate}
                onChange={(e) => setUserData({...userData, hourlyRate: parseFloat(e.target.value) || 0})}
                onKeyDown={handleKeyDown}
                onBlur={handleRateSave}
                className="w-20 text-center font-bold text-xl text-slate-900 border-b-2 border-blue-500 focus:outline-none bg-transparent"
                autoFocus
              />
              <button onMouseDown={(e) => { e.preventDefault(); handleRateSave(); }} className="text-emerald-500 hover:text-emerald-600">
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-1 group cursor-pointer" onClick={() => setIsEditingRate(true)}>
              <p className="text-2xl font-bold text-slate-900">${userData.hourlyRate}</p>
              <button className="ml-2 text-slate-300 group-hover:text-blue-500 transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-3">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-medium text-slate-500">Tracked This Week</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">10.5 hrs</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-3">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-medium text-slate-500">Annual Goal</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">15%</p>
          <p className="text-xs text-slate-400">of ${userData.annualGoal.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-3">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-medium text-slate-500">Utilization</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">74%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Freelancer Toolkit</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/calculator" className="flex items-start bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Rate Calculator</h3>
                <p className="text-sm text-slate-500 mt-1">Calculate your minimum hourly rate</p>
              </div>
            </Link>
            
            <Link to="/compare" className="flex items-start bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <BarChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Compare Market</h3>
                <p className="text-sm text-slate-500 mt-1">Benchark against global rates</p>
              </div>
            </Link>

            <Link to="/invoice-generator" className="flex items-start bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Invoices</h3>
                <p className="text-sm text-slate-500 mt-1">Generate professional PDF invoices</p>
              </div>
            </Link>

            <Link to="/schedule-planner" className="flex items-start bg-white p-5 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Schedule Planner</h3>
                <p className="text-sm text-slate-500 mt-1">Plan billable vs admin time visually</p>
              </div>
            </Link>

            <Link to="/time-tracker" className="flex items-start bg-white p-5 rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Time Tracker</h3>
                <p className="text-sm text-slate-500 mt-1">Log billable hours accurately</p>
              </div>
            </Link>

            <Link to="/income-goal-planner" className="flex items-start bg-white p-5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all group">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Income Goals</h3>
                <p className="text-sm text-slate-500 mt-1">Plan paths to annual revenue targets</p>
              </div>
            </Link>

            <Link to="/contract-clause-library" className="flex items-start bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group md:col-span-2">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-slate-600 group-hover:text-white transition-colors">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Contract Library</h3>
                <p className="text-sm text-slate-500 mt-1">Standard clauses for your freelance agreements</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            <button onClick={() => navigate('/time-tracker')} className="w-full text-left px-6 py-4 hover:bg-slate-50 flex items-center justify-between group transition-colors">
              <div className="flex items-center text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                <Play className="w-4 h-4 mr-3 text-blue-500" />
                Start Timer
              </div>
              <span className="text-xs text-slate-400">Ctrl+T</span>
            </button>
            <button onClick={() => navigate('/invoice-generator')} className="w-full text-left px-6 py-4 hover:bg-slate-50 flex items-center justify-between group transition-colors">
              <div className="flex items-center text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                <FileText className="w-4 h-4 mr-3 text-blue-500" />
                Create Invoice
              </div>
              <span className="text-xs text-slate-400">Ctrl+I</span>
            </button>
            <button onClick={() => navigate('/schedule-planner')} className="w-full text-left px-6 py-4 hover:bg-slate-50 flex items-center justify-between group transition-colors">
              <div className="flex items-center text-slate-700 font-medium group-hover:text-blue-600 transition-colors">
                <Calendar className="w-4 h-4 mr-3 text-blue-500" />
                Plan Next Week
              </div>
              <span className="text-xs text-slate-400">Ctrl+P</span>
            </button>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-rose-400" />
              <h3 className="font-semibold text-lg">Current Milestone</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">You are \$5,000 away from your next milestone: "Consistent Monthly Anchor Client".</p>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <div className="bg-rose-400 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>Goal: \$10k/mo</span>
              <span className="text-white">60%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
