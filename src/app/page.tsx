'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Target, 
  PlusCircle, 
  BarChart3,
  PieChart,
  Settings,
  Bell,
  Calculator,
  FileText,
  Calendar,
  Wallet,
  TrendingDown,
  Brain,
  LineChart,
  Shield
} from 'lucide-react';
import CreditCardManager from '@/components/CreditCardManager';
import IncomeTracker from '@/components/IncomeTracker';
import ExpenseCategories from '@/components/ExpenseCategories';
import FinancialOverview from '@/components/FinancialOverview';
import GoalTracker from '@/components/GoalTracker';
import SmartSuggestions from '@/components/SmartSuggestions';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import BudgetPlanner from '@/components/BudgetPlanner';
import DebtCalculator from '@/components/DebtCalculator';
import Reports from '@/components/Reports';
import BillTracker from '@/components/BillTracker';
import AIInsights from '@/components/AIInsights';
import InvestmentTracker from '@/components/InvestmentTracker';
import SmartPortfolioOptimizer from '@/components/SmartPortfolioOptimizer';
import PredictiveCashFlowManager from '@/components/PredictiveCashFlowManager';

interface SplashEffect {
  id: number;
  x: number;
  y: number;
}

export default function PersonalFinanceDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [splashes, setSplashes] = useState<SplashEffect[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add splash cursor effect
    const handleClick = (e: MouseEvent) => {
      const newSplash: SplashEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setSplashes(prev => [...prev, newSplash]);
      
      // Remove splash after animation
      setTimeout(() => {
        setSplashes(prev => prev.filter(splash => splash.id !== newSplash.id));
      }, 600);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'from-blue-500 to-purple-600' },
    { id: 'cards', label: 'Credit Cards', icon: CreditCard, color: 'from-purple-500 to-pink-600' },
    { id: 'income', label: 'Income', icon: TrendingUp, color: 'from-green-500 to-teal-600' },
    { id: 'expenses', label: 'Expenses', icon: DollarSign, color: 'from-orange-500 to-red-600' },
    { id: 'goals', label: 'Goals', icon: Target, color: 'from-indigo-500 to-blue-600' },
    { id: 'investments', label: 'Investments', icon: LineChart, color: 'from-cyan-500 to-blue-600' },
    { id: 'portfolio', label: 'Smart Portfolio', icon: Shield, color: 'from-emerald-500 to-green-600' },
    { id: 'cashflow', label: 'Cash Flow AI', icon: TrendingDown, color: 'from-blue-500 to-indigo-600' },
    { id: 'budget', label: 'Budget Planner', icon: Wallet, color: 'from-emerald-500 to-teal-600' },
    { id: 'bills', label: 'Bill Tracker', icon: Calendar, color: 'from-rose-500 to-pink-600' },
    { id: 'calculator', label: 'Debt Calculator', icon: Calculator, color: 'from-amber-500 to-orange-600' },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, color: 'from-purple-500 to-violet-600' },
    { id: 'reports', label: 'Reports', icon: FileText, color: 'from-violet-500 to-purple-600' },
    { id: 'analytics', label: 'Analytics', icon: PieChart, color: 'from-teal-500 to-cyan-600' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="spinner mb-6"></div>
          <motion.h2 
            className="text-2xl font-bold gradient-text mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading Your Financial Dashboard
          </motion.h2>
          <p className="text-gray-400">Preparing your personalized insights...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl shape-blur"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl shape-blur"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl float-animation"></div>
      </div>

      {/* Splash Effects */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            className="splash-cursor"
            style={{ left: splash.x - 10, top: splash.y - 10 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass p-8 m-6 rounded-3xl shadow-2xl"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center pulse-glow shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <DollarSign className="w-8 h-8 text-white" />
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold metallic-paint leading-tight">
                Personal Finance Hub
              </h1>
              <p className="text-gray-400 text-lg lg:text-xl max-w-2xl">
                Your complete financial command center with AI-powered insights
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.button 
              className="p-4 glass rounded-2xl hover-lift shadow-lg border border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-6 h-6" />
            </motion.button>
            <motion.button 
              className="p-4 glass rounded-2xl hover-lift shadow-lg border border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Settings className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <motion.nav 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="px-8 mb-12"
      >
        <div className="glass p-8 rounded-3xl shadow-xl border border-white/10">
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 whitespace-nowrap relative min-w-[140px] justify-center ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl star-border`
                      : 'text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-lg border border-white/5'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="px-6 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 300, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -300, rotateY: -90 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeInOut",
              rotateY: { duration: 0.8 }
            }}
          >
            {activeTab === 'overview' && <FinancialOverview />}
            {activeTab === 'cards' && <CreditCardManager />}
            {activeTab === 'income' && <IncomeTracker />}
            {activeTab === 'expenses' && <ExpenseCategories />}
            {activeTab === 'goals' && <GoalTracker />}
            {activeTab === 'investments' && <InvestmentTracker />}
            {activeTab === 'portfolio' && <SmartPortfolioOptimizer />}
            {activeTab === 'cashflow' && <PredictiveCashFlowManager />}
            {activeTab === 'budget' && <BudgetPlanner />}
            {activeTab === 'bills' && <BillTracker />}
            {activeTab === 'calculator' && <DebtCalculator />}
            {activeTab === 'ai-insights' && <AIInsights />}
            {activeTab === 'reports' && <Reports />}
            {activeTab === 'analytics' && <AnalyticsDashboard />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Smart Suggestions Sidebar */}
      <SmartSuggestions />

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center star-border pulse-glow"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onClick={() => {
          // Quick action menu
          console.log('Quick actions');
        }}
      >
        <PlusCircle className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}