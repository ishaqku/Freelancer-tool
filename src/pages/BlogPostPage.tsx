import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { Clock, Calendar, ArrowLeft, Twitter, Linkedin, Link2, Copy, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useSEO } from '../hooks/useSEO';

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useSEO({
    title: post?.title || 'Blog Post',
    description: post?.excerpt || 'Read our latest insights.',
    schema: post ? {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.author.name
      }
    } : undefined
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-slate-900">Post not found</h1>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">Return to Blog</Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      <div className="fixed top-16 left-0 right-0 h-1 bg-slate-200 z-40">
        <div className="h-full bg-blue-600 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      
      <article className="max-w-4xl mx-auto pb-20 pt-8 animate-in fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-slate-500 mb-8 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{post.category}</span>
        </div>

        {/* Header */}
        <header className="space-y-6 text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{post.category}</span>
            <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.publishedAt}</span>
            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readTime} min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-center space-x-6 pt-6">
            <div className="flex items-center">
              <img src={post.author.photo} alt={post.author.name} className="w-12 h-12 rounded-full mr-3 shadow-sm" />
              <div className="text-left">
                <div className="font-bold text-slate-900">{post.author.name}</div>
                <div className="text-xs text-slate-500 line-clamp-1 max-w-[200px]">{post.author.bio}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden mb-16 shadow-xl border border-slate-200">
          <img src={post.coverImage} alt={post.title} className="w-full h-auto aspect-[2/1] object-cover" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Social Share */}
            <div className="mt-8 flex items-center gap-3">
              <span className="font-bold text-slate-900 mr-2">Share:</span>
              <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button onClick={handleCopyLink} className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors">
                {copiedLink ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Link2 className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            {post.toc.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 sticky top-24">
                <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Table of Contents</h3>
                <nav className="space-y-2 text-sm text-slate-600">
                  {post.toc.map(item => (
                    <div 
                      key={item.id} 
                      className={`hover:text-blue-600 cursor-pointer transition-colors ${item.level === 3 ? 'ml-4' : ''}`}
                    >
                      {item.text}
                    </div>
                  ))}
                </nav>
              </div>
            )}
            
            {post.relatedTools.length > 0 && (
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-900 mb-4 uppercase tracking-wider text-sm flex items-center">
                  Recommended Tools
                </h3>
                <ul className="space-y-3">
                  {post.relatedTools.map(tool => (
                    <li key={tool}>
                      <Link to="/" className="text-blue-700 hover:text-blue-800 font-medium text-sm flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2 rotate-180" /> {tool}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>
    </>
  );
};
