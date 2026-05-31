import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { Search, ChevronRight, Mail } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export const BlogPage = () => {
  useSEO({
    title: 'Freelance Pricing Blog',
    description: 'Learn to price your work, negotiate better, and grow your freelance income. Best pricing tips for modern freelancers.'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(blogPosts.map(p => p.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(p => p !== featuredPost);

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Freelance Rate Blog</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Learn to price your work, negotiate better, and grow your freelance income.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-6">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search articles, tags..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col md:flex-row group hover:shadow-md transition-shadow">
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img 
              src={featuredPost.coverImage} 
              alt={featuredPost.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center space-x-3 mb-4 text-xs font-semibold uppercase tracking-wider text-blue-600">
              <span className="bg-blue-50 px-2.5 py-1 rounded-full text-blue-700">{featuredPost.category}</span>
              <span className="text-slate-400">{featuredPost.readTime} min read</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
              <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
            </h2>
            <p className="text-slate-500 mb-6 text-lg leading-relaxed">
              {featuredPost.excerpt}
            </p>
            <div className="mt-auto">
              <Link to={`/blog/${featuredPost.slug}`} className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                Read Article <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Latest Articles Grid */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">Latest Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md group flex flex-col transition-all hover:-translate-y-1">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center">
                    <img src={post.author.photo} alt={post.author.name} className="w-5 h-5 rounded-full mr-2" />
                    {post.author.name}
                  </div>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden mt-16 shadow-xl">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-400">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Freelance Pricing Weekly</h2>
          <p className="text-slate-300 text-lg">
            Join 12,000+ freelancers who get weekly rate insights, negotiation tips, and tool updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-4">No spam. Unsubscribe anytime.</p>
        </div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};
