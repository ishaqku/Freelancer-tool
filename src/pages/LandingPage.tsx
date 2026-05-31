import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Code, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { AdBanner } from '../components/AdBanner';
import { SavedCalculations } from '../components/SavedCalculations';

export const LandingPage = () => {
  return (
    <div className="flex flex-col space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 mt-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Know Your Worth: <span className="text-blue-600">Freelance Rate Calculator</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Calculate fair hourly rates based on your location, skills, and experience. Used by freelancers worldwide to price their services accurately.
        </p>
        <div className="flex justify-center pt-4">
          <Link to="/calculator">
            <Button size="lg" className="text-lg font-medium px-8 drop-shadow-md">
              Calculate My Rate
            </Button>
          </Link>
        </div>
        
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-8 text-sm font-medium text-slate-500">
          <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> Free Forever</div>
          <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> No Signup Required</div>
          <div className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-emerald-500" /> Updated 2024 Rates</div>
        </div>
      </section>

      <AdBanner slot="hero" format="auto" />

      <SavedCalculations />

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card className="border-none shadow-md bg-white">
          <CardContent className="pt-8 space-y-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Location-Based Rates</h3>
            <p className="text-slate-600">
              Rates automatically adjusted for your country's cost of living and local market conditions.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardContent className="pt-8 space-y-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Skill-Specific Pricing</h3>
            <p className="text-slate-600">
              From global React development to Specialized UI/UX design — get accurate rates for your exact skill.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white">
          <CardContent className="pt-8 space-y-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-blue-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">Experience Adjusted</h3>
            <p className="text-slate-600">
              Whether you are a beginner building a portfolio or an industry expert, get rates that match your level.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className="bg-slate-100 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-20 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto border-4 border-slate-100 shadow-sm">1</div>
              <h4 className="font-semibold text-lg text-slate-900">Answer 3 Simple Questions</h4>
              <p className="text-slate-600 text-sm">Takes less than 30 seconds</p>
            </div>
            
            {/* Step 2 */}
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto border-4 border-slate-100 shadow-sm">2</div>
              <h4 className="font-semibold text-lg text-slate-900">Get Your Personalized Rate</h4>
              <p className="text-slate-600 text-sm">Instant, data-driven calculation</p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto border-4 border-slate-100 shadow-sm">3</div>
              <h4 className="font-semibold text-lg text-slate-900">Start Earning Fairly</h4>
              <p className="text-slate-600 text-sm">Negotiate with confidence today</p>
            </div>
          </div>
          
          <div className="pt-8">
            <Link to="/calculator">
              <Button size="lg" className="px-8">Try the Calculator</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
