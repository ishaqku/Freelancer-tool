import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Calculator, FileText, Calendar, Clock, Target, Shield, LayoutDashboard, BarChart, Moon, Sun, Menu, X } from 'lucide-react';

export const Layout = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Calculator', path: '/calculator', icon: Calculator },
    { name: 'Compare', path: '/compare', icon: BarChart },
    { name: 'Blog', path: '/blog', icon: FileText },
    { name: 'Guides', path: '/guides', icon: Target },
    { name: 'FAQ', path: '/faq', icon: Shield },
    { name: 'Invoices', path: '/invoice-generator', icon: FileText },
    { name: 'Schedule', path: '/schedule-planner', icon: Calendar },
    { name: 'Tracker', path: '/time-tracker', icon: Clock },
    { name: 'Contracts', path: '/contract-clause-library', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-blue-600">
                <Calculator className="h-6 w-6" />
                <span className="font-bold text-lg tracking-tight text-slate-900">RateKit</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center flex-1 justify-end">
              <nav className="flex space-x-4 items-center mr-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium whitespace-nowrap ${
                        isActive
                          ? 'border-blue-500 text-slate-900'
                          : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-1.5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0 ml-2"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex md:hidden items-center">
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors flex-shrink-0 mr-2"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} RateKit. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0 flex-wrap justify-center">
              <Link to="/dashboard" className="hover:text-slate-900 transition-colors mb-2 md:mb-0">Home</Link>
              <Link to="/calculator" className="hover:text-slate-900 transition-colors mb-2 md:mb-0">Calculator</Link>
              <Link to="/blog" className="hover:text-slate-900 transition-colors mb-2 md:mb-0">Blog</Link>
              <Link to="/guides" className="hover:text-slate-900 transition-colors mb-2 md:mb-0">Guides</Link>
              <Link to="/faq" className="hover:text-slate-900 transition-colors mb-2 md:mb-0">FAQ</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

