import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CalculatorProvider } from './context/CalculatorContext';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ResultsPage } from './pages/ResultsPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ComparePage } from './pages/ComparePage';
import { DashboardPage } from './pages/DashboardPage';

// Placeholder Pages
import { InvoiceGeneratorPage } from './pages/InvoiceGeneratorPage';
import { SchedulePlannerPage } from './pages/SchedulePlannerPage';
import { TimeTrackerPage } from './pages/TimeTrackerPage';
import { IncomeGoalPlannerPage } from './pages/IncomeGoalPlannerPage';
import { ContractClauseLibraryPage } from './pages/ContractClauseLibraryPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { FAQPage } from './pages/FAQPage';
import { GuidesPage } from './pages/GuidesPage';

export default function App() {
  return (
    <ErrorBoundary>
      <CalculatorProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="calculator" element={<CalculatorPage />} />
              <Route path="results" element={<ResultsPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="invoice-generator" element={<InvoiceGeneratorPage />} />
              <Route path="schedule-planner" element={<SchedulePlannerPage />} />
              <Route path="time-tracker" element={<TimeTrackerPage />} />
              <Route path="income-goal-planner" element={<IncomeGoalPlannerPage />} />
              <Route path="contract-clause-library" element={<ContractClauseLibraryPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="guides" element={<GuidesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CalculatorProvider>
    </ErrorBoundary>
  );
}
