import React from 'react';
import { guides } from '../data/guides';
import { BookOpen, Download, ExternalLink } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const GuidesPage = () => {
  useSEO({
    title: 'Free Freelance Guides',
    description: 'Step-by-step guides to help you price, negotiate, and grow your freelance business.'
  });

  const beginnerGuides = guides.filter(g => g.category === 'beginner');
  const advancedGuides = guides.filter(g => g.category === 'advanced');

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 pt-8 animate-in fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight flex-col items-center justify-center gap-3">
          Free Freelance Guides
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Step-by-step guides to help you price, negotiate, and grow your freelance business.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg"><BookOpen className="w-5 h-5" /></div>
            <h2 className="text-2xl font-bold text-slate-900">Beginner Guides</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerGuides.map(guide => (
              <div key={guide.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                <div className="h-40 bg-slate-100 overflow-hidden relative border-b border-slate-100">
                  <img src={guide.thumbnail} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur font-bold text-[10px] uppercase tracking-wider text-slate-800 px-2 py-1 rounded">
                    {guide.pages} Pages
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 text-xl mb-2">{guide.title}</h3>
                  <p className="text-slate-500 text-sm mb-6">{guide.description}</p>
                  
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{guide.format}</span>
                    <button className="flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg transition-colors">
                      <Download className="w-4 h-4 mr-1.5" /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg"><BookOpen className="w-5 h-5" /></div>
            <h2 className="text-2xl font-bold text-slate-900">Advanced Guides</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedGuides.map(guide => (
              <div key={guide.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                <div className="h-40 bg-slate-100 overflow-hidden relative border-b border-slate-100">
                  <img src={guide.thumbnail} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur font-bold text-[10px] uppercase tracking-wider text-slate-800 px-2 py-1 rounded">
                    {guide.pages} Pages
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-900 text-xl mb-2">{guide.title}</h3>
                  <p className="text-slate-500 text-sm mb-6">{guide.description}</p>
                  
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{guide.format}</span>
                    <button className="flex items-center text-sm font-bold text-purple-600 hover:text-purple-700 bg-purple-50 px-4 py-2 rounded-lg transition-colors">
                      <Download className="w-4 h-4 mr-1.5" /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="bg-blue-50 rounded-3xl p-8 md:p-12 border border-blue-100 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Want early access to new guides?</h2>
          <p className="text-blue-700 mb-8 max-w-lg mx-auto">We publish a new comprehensive guide every month. Join the newsletter to get them directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap shadow-sm">
              Subscribe Free
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
