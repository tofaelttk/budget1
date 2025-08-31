'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Plus, 
  TrendingUp, 
  Calendar,
  Briefcase,
  PiggyBank,
  Zap,
  Target,
  BarChart3,
  Edit,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';

const mockIncomeData = {
  sources: [
    {
      id: '1',
      name: 'Main Job - Software Engineer',
      amount: 800,
      frequency: 'weekly',
      nextPayment: '2024-01-19',
      type: 'salary',
      isActive: true,
    },
    {
      id: '2',
      name: 'Freelance Projects',
      amount: 350,
      frequency: 'weekly',
      nextPayment: '2024-01-20',
      type: 'freelance',
      isActive: true,
    },
    {
      id: '3',
      name: 'Side Business',
      amount: 200,
      frequency: 'weekly',
      nextPayment: '2024-01-21',
      type: 'business',
      isActive: true,
    },
  ],
  weeklyTrend: [
    { week: 'Week 1', salary: 800, freelance: 350, business: 200, total: 1350 },
    { week: 'Week 2', salary: 800, freelance: 420, business: 180, total: 1400 },
    { week: 'Week 3', salary: 800, freelance: 280, business: 250, total: 1330 },
    { week: 'Week 4', salary: 800, freelance: 380, business: 220, total: 1400 },
  ],
  monthlyProjection: [
    { month: 'Jul', income: 5200 },
    { month: 'Aug', income: 5400 },
    { month: 'Sep', income: 5100 },
    { month: 'Oct', income: 5600 },
    { month: 'Nov', income: 5300 },
    { month: 'Dec', income: 5500 },
  ],
};

const incomeIcons = {
  salary: Briefcase,
  freelance: Zap,
  business: Target,
  investment: TrendingUp,
  other: DollarSign,
};

const incomeGradients = {
  salary: 'from-blue-500 to-blue-700',
  freelance: 'from-purple-500 to-purple-700',
  business: 'from-green-500 to-green-700',
  investment: 'from-orange-500 to-orange-700',
  other: 'from-gray-500 to-gray-700',
};

export default function IncomePage() {
  const [data, setData] = useState(mockIncomeData);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeView, setActiveView] = useState<'overview' | 'analytics' | 'projections'>('overview');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const totalWeeklyIncome = data.sources.reduce((sum, source) => sum + source.amount, 0);
  const totalMonthlyIncome = totalWeeklyIncome * 4.33;
  const totalYearlyIncome = totalMonthlyIncome * 12;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your income data...</p>
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
          Income Tracking
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Monitor your income streams and optimize your earning potential
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center mt-6">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 flex space-x-2">
            {[
              { key: 'overview', label: 'Overview', icon: DollarSign },
              { key: 'analytics', label: 'Analytics', icon: BarChart3 },
              { key: 'projections', label: 'Projections', icon: TrendingUp },
            ].map((view) => (
              <motion.button
                key={view.key}
                onClick={() => setActiveView(view.key as 'overview' | 'analytics' | 'projections')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeView === view.key
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <view.icon className="w-4 h-4 mr-2 inline" />
                {view.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Income Summary Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            title: 'Weekly Income',
            value: formatCurrency(totalWeeklyIncome),
            icon: Calendar,
            gradient: 'from-green-500 to-emerald-600',
            description: 'Every Friday'
          },
          {
            title: 'Monthly Income',
            value: formatCurrency(totalMonthlyIncome),
            icon: DollarSign,
            gradient: 'from-blue-500 to-cyan-600',
            description: 'Projected monthly'
          },
          {
            title: 'Yearly Income',
            value: formatCurrency(totalYearlyIncome),
            icon: TrendingUp,
            gradient: 'from-purple-500 to-violet-600',
            description: 'Annual projection'
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
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg animate-float`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <motion.p 
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.description}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.title}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Add Income Source Button */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button 
                onClick={() => setShowAddForm(true)}
                className="btn-primary px-8 py-4 text-lg hover-scale"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Income Source
              </Button>
            </motion.div>

            {/* Income Sources */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.sources.map((source, index) => {
                const IconComponent = incomeIcons[source.type as keyof typeof incomeIcons] || DollarSign;
                const gradient = incomeGradients[source.type as keyof typeof incomeGradients] || 'from-gray-500 to-gray-700';
                
                return (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="card-premium h-full relative overflow-hidden">
                      <div className={`bg-gradient-to-br ${gradient} text-white p-6 relative`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1, rotate: -10 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white/20 rounded-lg hover:bg-red-500/30"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-bold mb-2">{source.name}</h3>
                          <motion.p 
                            className="text-3xl font-bold"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            {formatCurrency(source.amount)}
                          </motion.p>
                          <p className="text-sm opacity-90 capitalize">
                            {source.frequency} • {source.type}
                          </p>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Next Payment</span>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                              {source.nextPayment}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Equivalent</span>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {formatCurrency(source.amount * 4.33)}
                            </span>
                          </div>

                          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              source.isActive 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                            }`}>
                              {source.isActive ? 'Active' : 'Inactive'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weekly Income Trend */}
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Weekly Income Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.weeklyTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="week" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          formatter={(value) => [formatCurrency(Number(value)), 'Amount']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Bar dataKey="salary" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="freelance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="business" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Projection */}
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Monthly Projection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.monthlyProjection}>
                        <defs>
                          <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          formatter={(value) => [formatCurrency(Number(value)), 'Income']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="income" 
                          stroke="#10b981" 
                          fillOpacity={1} 
                          fill="url(#incomeGradient)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeView === 'projections' && (
          <motion.div
            key="projections"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Income Goals */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Income Goals & Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-4">
                        Income Growth Goal
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700 dark:text-blue-300">Current</span>
                          <span className="font-bold text-blue-800 dark:text-blue-200">
                            {formatCurrency(totalMonthlyIncome)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700 dark:text-blue-300">Target</span>
                          <span className="font-bold text-blue-800 dark:text-blue-200">
                            {formatCurrency(6000)}
                          </span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-3">
                            <motion.div
                              className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(totalMonthlyIncome / 6000) * 100}%` }}
                              transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
                          {((totalMonthlyIncome / 6000) * 100).toFixed(1)}% of goal achieved
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                      <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-4">
                        Diversification Score
                      </h3>
                      <div className="text-center">
                        <motion.div
                          className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                        >
                          85%
                        </motion.div>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          Excellent income diversification
                        </p>
                        <div className="mt-4 flex justify-center">
                          <div className="flex space-x-2">
                            {[1,2,3,4,5].map((star, i) => (
                              <motion.div
                                key={star}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + i * 0.1 }}
                              >
                                <div className={`w-3 h-3 rounded-full ${i < 4 ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
