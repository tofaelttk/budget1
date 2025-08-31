'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingDown, 
  Calendar,
  DollarSign,
  Percent,
  AlertCircle,
  CheckCircle,
  Zap,
  Target,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency, calculatePayoffTime, formatPercentage } from '@/lib/utils';

interface CreditCardData {
  _id: string;
  name: string;
  currentBalance: number;
  creditLimit: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: number;
  paymentStrategy: 'minimum' | 'percentage';
  extraPaymentPercentage: number;
}

const mockCards: CreditCardData[] = [
  {
    _id: '1',
    name: 'Chase Sapphire Preferred',
    currentBalance: 3500,
    creditLimit: 8000,
    interestRate: 0.1899,
    minimumPayment: 87.50,
    dueDate: 15,
    paymentStrategy: 'minimum',
    extraPaymentPercentage: 0.25,
  },
  {
    _id: '2',
    name: 'Capital One Venture',
    currentBalance: 2250,
    creditLimit: 5000,
    interestRate: 0.2199,
    minimumPayment: 56.25,
    dueDate: 22,
    paymentStrategy: 'percentage',
    extraPaymentPercentage: 0.15,
  },
  {
    _id: '3',
    name: 'Discover It Cash Back',
    currentBalance: 1800,
    creditLimit: 4000,
    interestRate: 0.1749,
    minimumPayment: 45.00,
    dueDate: 8,
    paymentStrategy: 'minimum',
    extraPaymentPercentage: 0.10,
  },
];

const cardGradients = [
  'from-blue-600 via-blue-700 to-indigo-800',
  'from-purple-600 via-purple-700 to-violet-800',
  'from-emerald-600 via-green-700 to-teal-800',
  'from-rose-600 via-pink-700 to-red-800',
  'from-amber-600 via-orange-700 to-yellow-800',
];

export default function CreditCardsPage() {
  const [cards, setCards] = useState<CreditCardData[]>(mockCards);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'cards' | 'analytics'>('cards');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const totalDebt = cards.reduce((sum, card) => sum + card.currentBalance, 0);
  const totalLimit = cards.reduce((sum, card) => sum + card.creditLimit, 0);
  const avgUtilization = cards.reduce((sum, card) => sum + (card.currentBalance / card.creditLimit), 0) / cards.length;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your credit cards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-4">
          Credit Cards
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Manage your credit cards with intelligent payment strategies and beautiful visualizations
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center mt-6">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 flex space-x-2">
            <motion.button
              onClick={() => setActiveView('cards')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeView === 'cards' 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard className="w-4 h-4 mr-2 inline" />
              Cards View
            </motion.button>
            <motion.button
              onClick={() => setActiveView('analytics')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeView === 'analytics' 
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-4 h-4 mr-2 inline" />
              Analytics
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: 'Total Debt',
            value: formatCurrency(totalDebt),
            icon: CreditCard,
            gradient: 'from-red-500 to-rose-600',
            change: '-5.2%'
          },
          {
            title: 'Available Credit',
            value: formatCurrency(totalLimit - totalDebt),
            icon: DollarSign,
            gradient: 'from-green-500 to-emerald-600',
            change: '+12%'
          },
          {
            title: 'Avg Utilization',
            value: formatPercentage(avgUtilization),
            icon: Percent,
            gradient: 'from-orange-500 to-amber-600',
            change: '-2.1%'
          },
          {
            title: 'Cards Active',
            value: cards.length.toString(),
            icon: Target,
            gradient: 'from-blue-500 to-cyan-600',
            change: '+1'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-premium hover-lift relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`}></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <motion.p 
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeView === 'cards' && (
          <motion.div
            key="cards"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Add Card Button */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button 
                onClick={() => setShowAddForm(true)}
                className="btn-primary px-8 py-4 text-lg hover-scale"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Credit Card
              </Button>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card, index) => {
                const utilization = (card.currentBalance / card.creditLimit) * 100;
                const actualPayment = card.minimumPayment * (1 + card.extraPaymentPercentage);
                const payoffInfo = calculatePayoffTime(card.currentBalance, card.interestRate, actualPayment);
                const gradientClass = cardGradients[index % cardGradients.length];

                return (
                  <motion.div
                    key={card._id}
                    initial={{ opacity: 0, y: 30, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, rotateY: 5, scale: 1.02 }}
                    className="group"
                    style={{ perspective: '1000px' }}
                  >
                    <Card className="card-premium relative overflow-hidden h-full">
                      {/* Card Header with Gradient */}
                      <div className={`bg-gradient-to-br ${gradientClass} text-white p-6 relative`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">{card.name}</h3>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: -10 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white/20 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm opacity-90">Current Balance</span>
                              <motion.span 
                                className="text-2xl font-bold"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                              >
                                {formatCurrency(card.currentBalance)}
                              </motion.span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm opacity-90">Credit Limit</span>
                              <span className="text-lg">
                                {formatCurrency(card.creditLimit)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-6">
                        {/* Utilization */}
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-gray-900 dark:text-white">Utilization</span>
                            <span className={`text-sm font-bold ${
                              utilization > 70 ? 'text-red-600' : 
                              utilization > 30 ? 'text-orange-600' : 'text-green-600'
                            }`}>
                              {utilization.toFixed(1)}%
                            </span>
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <motion.div
                                className={`h-3 rounded-full ${
                                  utilization > 70 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                  utilization > 30 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                  'bg-gradient-to-r from-green-500 to-green-600'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${utilization}%` }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                          {utilization > 70 && (
                            <motion.div 
                              className="flex items-center mt-2 text-red-600 text-xs"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1 + index * 0.1 }}
                            >
                              <AlertCircle className="w-3 h-3 mr-1 animate-pulse" />
                              High utilization may hurt credit score
                            </motion.div>
                          )}
                        </div>

                        {/* Payment Information */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Min Payment</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {formatCurrency(card.minimumPayment)}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Actual Payment</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                              {formatCurrency(actualPayment)}
                            </p>
                          </div>
                        </div>

                        {/* Payoff Timeline */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <TrendingDown className="w-4 h-4 text-green-500 mr-2" />
                              <span className="font-medium">Payoff Timeline</span>
                            </div>
                            <span className="text-sm font-bold">
                              {payoffInfo.months === Infinity 
                                ? 'Never' 
                                : `${Math.ceil(payoffInfo.months)} months`
                              }
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Total Interest</span>
                            <span className="font-medium text-red-600 dark:text-red-400">
                              {payoffInfo.totalInterest === Infinity 
                                ? '∞' 
                                : formatCurrency(payoffInfo.totalInterest)
                              }
                            </span>
                          </div>
                        </div>

                        {/* Due Date */}
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                            <span className="text-sm font-medium">Next Due Date</span>
                          </div>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {card.dueDate}{card.dueDate === 1 ? 'st' : card.dueDate === 2 ? 'nd' : card.dueDate === 3 ? 'rd' : 'th'} of each month
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Smart Recommendations */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                          Debt Avalanche Strategy
                        </h3>
                        <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                          Pay minimums on all cards, then focus extra payments on highest APR card first.
                        </p>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Apply Strategy
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                        <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                          Balance Transfer Option
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                          Consider transferring high-interest balances to lower APR cards.
                        </p>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Explore Options
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeView === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Advanced Analytics Coming Soon!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Detailed credit analysis, payment optimization, and financial insights.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}