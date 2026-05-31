import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalculator } from '../context/CalculatorContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Progress } from '../components/ui/progress';
import { countries, skillCategories, experienceLevels, currencies } from '../data/rateData';
import { getCityOptions } from '../data/costOfLiving';

export const CalculatorPage = () => {
  const [step, setStep] = useState(1);
  const { formData, setFormData, calculateResults } = useCalculator();
  const navigate = useNavigate();

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));
  const handleCalculate = () => {
    calculateResults();
    navigate('/results');
  };

  const isStep1Valid = formData.country && formData.skillCategory && formData.subSkill && formData.experience;
  
  const currentCategory = skillCategories.find(c => c.id === formData.skillCategory);
  
  const cityOptions = useMemo(() => getCityOptions(formData.country), [formData.country]);

  const toggleClientType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      clientTypes: prev.clientTypes.includes(type)
        ? prev.clientTypes.filter(t => t !== type)
        : [...prev.clientTypes, type]
    }));
  };

  const clientTypeOptions = ["Startups", "Small Businesses", "Enterprises", "Agencies", "Non-profits"];

  return (
    <div className="max-w-3xl mx-auto space-y-8 fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-center">Calculate Your Rate</h1>
        <div className="flex items-center justify-between text-sm font-medium text-slate-600">
          <span>Step {step} of 3</span>
          <span>{Math.round((step / 3) * 100)}% Completed</span>
        </div>
        <Progress value={(step / 3) * 100} className="h-2" />
      </div>

      <Card className="shadow-lg border-slate-200">
        
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Tell us about your location and expertise to determine your market baseline.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      id="country" 
                      value={formData.country} 
                      onChange={(e) => setFormData({ ...formData, country: e.target.value, city: '' })}
                    >
                      <option value="" disabled>Select a country</option>
                      {countries.map(c => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City for Cost of Living</Label>
                    <Select 
                      id="city" 
                      value={formData.city} 
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                      disabled={!formData.country || cityOptions.length === 0}
                    >
                      <option value="">{cityOptions.length ? "Select a city" : "Auto-detect average"}</option>
                      {cityOptions.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Primary Skill Category</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skillCategories.map(cat => (
                    <div 
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, skillCategory: cat.id, subSkill: '' })}
                      className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                        formData.skillCategory === cat.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-medium text-slate-900">{cat.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.skillCategory && currentCategory && (
                <div className="space-y-2 fade-in">
                  <Label htmlFor="subSkill">Specific Skill</Label>
                  <Select 
                    id="subSkill" 
                    value={formData.subSkill} 
                    onChange={(e) => setFormData({ ...formData, subSkill: e.target.value })}
                  >
                    <option value="" disabled>Select your specific skill</option>
                    {currentCategory.subSkills.map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label>Experience Level</Label>
                <div className="grid grid-cols-1 gap-2">
                  {experienceLevels.map(exp => (
                    <label 
                      key={exp.id} 
                      className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.experience === exp.id ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="experience"
                        value={exp.id}
                        checked={formData.experience === exp.id}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-600"
                      />
                      <div>
                        <div className="font-medium text-slate-900">{exp.label} ({exp.title})</div>
                        <div className="text-xs text-slate-500">{exp.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </CardContent>
            <CardFooter className="flex justify-end pt-6 border-t border-slate-100">
              <Button onClick={handleNext} disabled={!isStep1Valid} size="lg">Next Step</Button>
            </CardFooter>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Work Preferences</CardTitle>
              <CardDescription>Setup your working hours, clients, and currency.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="space-y-3">
                <Label htmlFor="currency">Preferred Currency (Results Display)</Label>
                <Select 
                  id="currency" 
                  value={formData.currency} 
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="max-w-xs"
                >
                  {currencies.map(c => (
                    <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                  ))}
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Work Arrangement</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'remote', label: 'Fully Remote' },
                    { id: 'hybrid', label: 'Hybrid' },
                    { id: 'onsite', label: 'On-site' }
                  ].map(wa => (
                    <label key={wa.id} className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.workArrangement === wa.id ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                      <input type="radio" value={wa.id} checked={formData.workArrangement === wa.id} onChange={e => setFormData({...formData, workArrangement: e.target.value as any})} className="h-4 w-4 text-blue-600 focus:ring-blue-600" />
                      <span className="font-medium text-sm">{wa.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Client Types (Select applicable)</Label>
                <div className="flex flex-wrap gap-2">
                  {clientTypeOptions.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => toggleClientType(type)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        formData.clientTypes.includes(type) ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Billable Hours Per Week</Label>
                  <span className="font-medium text-blue-600">{formData.billableHours} hours</span>
                </div>
                <Slider 
                  min={5} max={60} step={1} 
                  value={formData.billableHours} 
                  onChange={(e) => setFormData({ ...formData, billableHours: parseInt(e.target.value) })} 
                />
                <p className="text-xs text-slate-500">Only count time you actively bill clients for.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Working Weeks Per Year</Label>
                  <span className="font-medium text-blue-600">{formData.workingWeeks} weeks</span>
                </div>
                <Slider 
                  min={40} max={52} step={1} 
                  value={formData.workingWeeks} 
                  onChange={(e) => setFormData({ ...formData, workingWeeks: parseInt(e.target.value) })} 
                />
                <p className="text-xs text-slate-500">Accounts for vacation and sick leave ({52 - formData.workingWeeks} weeks off).</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Non-Billable Time %</Label>
                  <span className="font-medium text-blue-600">{formData.nonBillablePercent}%</span>
                </div>
                <Slider 
                  min={0} max={50} step={5} 
                  value={formData.nonBillablePercent} 
                  onChange={(e) => setFormData({ ...formData, nonBillablePercent: parseInt(e.target.value) })} 
                />
                <p className="text-xs text-slate-500">Time spent on admin, meetings, learning, and marketing.</p>
              </div>

            </CardContent>
            <CardFooter className="flex justify-between pt-6 border-t border-slate-100">
              <Button variant="outline" onClick={handleBack} size="lg">Back</Button>
              <Button onClick={handleNext} size="lg">Next Step</Button>
            </CardFooter>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Financial Goals & Expenses (Optional)</CardTitle>
              <CardDescription>Tell us your goals so we can calculate what you need to do to hit them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="annualGoal">Annual Net Income Goal (USD Equivalent)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                  <Input 
                    id="annualGoal" 
                    type="number" 
                    placeholder="e.g., 50000" 
                    className="pl-7"
                    value={formData.annualGoal} 
                    onChange={(e) => setFormData({ ...formData, annualGoal: e.target.value })} 
                  />
                </div>
                <p className="text-xs text-slate-500">How much do you want to keep strictly for yourself after taxes and business expenses?</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-dashed border-slate-200">
                <Label htmlFor="monthlyExpenses">Monthly Business & Living Expenses (USD Eq)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                  <Input 
                    id="monthlyExpenses" 
                    type="number" 
                    placeholder="e.g., 2000" 
                    className="pl-7"
                    value={formData.monthlyExpenses} 
                    onChange={(e) => setFormData({ ...formData, monthlyExpenses: e.target.value })} 
                  />
                </div>
                <p className="text-xs text-slate-500">Includes rent, food, transport, utilities, software, etc.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="savingsGoal">Monthly Savings Goal (Optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                  <Input 
                    id="savingsGoal" 
                    type="number" 
                    placeholder="e.g., 500" 
                    className="pl-7"
                    value={formData.savingsGoal} 
                    onChange={(e) => setFormData({ ...formData, savingsGoal: e.target.value })} 
                  />
                </div>
                <p className="text-xs text-slate-500">How much you want to save or invest each month.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="benefitsCost">Monthly Benefits / Insurance Cost (USD Eq)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                  <Input 
                    id="benefitsCost" 
                    type="number" 
                    placeholder="e.g., 300" 
                    className="pl-7"
                    value={formData.benefitsCost} 
                    onChange={(e) => setFormData({ ...formData, benefitsCost: e.target.value })} 
                  />
                </div>
                <p className="text-xs text-slate-500">Health insurance, retirement matches, etc.</p>
              </div>

            </CardContent>
            <CardFooter className="flex justify-between pt-6 border-t border-slate-100">
              <Button variant="outline" onClick={handleBack} size="lg">Back</Button>
              <Button onClick={handleCalculate} size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                Calculate Final Rate
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
      
    </div>
  );
};
