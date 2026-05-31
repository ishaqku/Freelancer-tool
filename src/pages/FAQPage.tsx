import React, { useState } from 'react';
import { faqs } from '../data/faqs';
import { Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export const FAQPage = () => {
  useSEO({
    title: 'Frequently Asked Questions',
    description: 'Get answers about freelance rates, taxes, client negotiations, and more.',
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (id: string) => {
    const next = new Set(openIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setOpenIds(next);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16 pt-8 animate-in fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Get answers about freelance rates, taxes, client negotiations, and more.
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map(faq => {
            const isOpen = openIds.has(faq.id);
            return (
              <div 
                key={faq.id} 
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <button 
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`text-lg font-bold pr-4 transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <span className={`p-1 rounded-full ${isOpen ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 fade-in">
                    <p className="text-slate-600 leading-relaxed text-base">{faq.answer}</p>
                    
                    <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4 text-sm">
                      {faq.relatedTool && (
                        <Link to="/" className="flex items-center font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
                          {faq.relatedTool} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      )}
                      {faq.relatedArticle && (
                        <Link to={`/blog/${faq.relatedArticle}`} className="flex items-center font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg w-fit">
                          Read Full Article <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">No questions found matching your search.</p>
            <button onClick={() => {setSearchTerm(''); setActiveCategory('all');}} className="mt-4 text-blue-600 font-medium hover:underline">Clear search</button>
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white mt-16 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto">We're here to help! Ask us anything about freelance pricing and we'll reply via email.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input 
              type="text" 
              placeholder="Your question..." 
              className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap">
              Ask Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
