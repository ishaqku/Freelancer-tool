import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, FileText, Calendar, Clock, Target, Shield, LayoutDashboard } from 'lucide-react';

export const TopNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Calculator', path: '/calculator', icon: Calculator },
    { name: 'Invoices', path: '/invoice-generator', icon: FileText },
    { name: 'Schedule', path: '/schedule-planner', icon: Calendar },
    { name: 'Time Tracker', path: '/time-tracker', icon: Clock },
    { name: 'Goals', path: '/income-goal-planner', icon: Target },
    { name: 'Contracts', path: '/contract-clause-library', icon: Shield },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex w-full">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-lg text-blue-600 flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                RateKit
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 overflow-x-auto w-full">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-blue-500 text-slate-900'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
