'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, 
  Plus, 
  TrendingDown, 
  Calendar,
  Home,
  Car,
  Utensils,
  Gamepad2,
  GraduationCap,
  Heart,
  MoreHorizontal,
  BarChart3,
  Target,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const mockExpenseData = {
  categories: [
    {
      id: '1',
      name: 'Housing',
      amount: 1200,
      budget: 1300,
      type: 'fixed',
      icon: Home,
      color: '#3b82f6',
      transactions: 12
    },
    {
      id: '2',
      name: 'Transportation',
      amount: 350,
      budget: 400,
      type: 'variable',
      icon: Car,
      color: '#10b981',
      transactions: 8
    },
    {
      id: '3',
      name: 'Food & Dining',
      amount: 450,
      budget: 500,
      type: 'variable',
      icon: Utensils,
      color: '#f59e0b',
      transactions: 24
    },
    {
      id: '4',
      name: 'Entertainment',
      amount: 180,
      budget: 200,
      type: 'variable',
      icon: Gamepad2,
      color: '#ef4444',
      transactions: 6
    },
    {
      id: '5',
      name: 'Education',
      amount: 300,
      budget: 300,
      type: 'fixed',
      icon: GraduationCap,
      color: '#8b5cf6',
      transactions: 2
    },
    {
      id: '6',
      name: 'Family Support',
      amount: 250,
      budget: 250,
      type: 'fixed',
      icon: Heart,
      color: '#ec4899',
      transactions: 4
    },
  ],
  monthlyTrend: [
    { month: 'Jul', housing: 1200, food: 420, transport: 320, entertainment: 150, education: 300, family: 250 },
    { month: 'Aug', housing: 1200, food: 480, transport: 380, entertainment: 200, education: 300, family: 250 },
    { month: 'Sep', housing: 1200, food: 440, transport: 350, entertainment: 160, education: 300, family: 250 },
    { month: 'Oct', housing: 1200, food: 450, transport: 350, entertainment: 180, education: 300, family: 250 },
    { month: 'Nov', housing: 1200, food: 490, transport: 370, entertainment: 220, education: 300, family: 250 },
    { month: 'Dec', housing: 1200, food: 450, transport: 350, entertainment: 180, education: 300, family: 250 },
  ],
  budgetComparison: [
    { category: 'Housing', budget: 1300, actual: 1200, variance: 100 },
    { category: 'Food', budget: 500, actual: 450, variance: 50 },
    { category: 'Transport', budget: 400, actual: 350, variance: 50 },
    { category: 'Entertainment', budget: 200, actual: 180, variance: 20 },
    { category: 'Education', budget: 300, actual: 300, variance: 0 },
    { category: 'Family', budget: 250, actual: 250, variance: 0 },
  ],
};

export default function ExpensesPage() {
  const [data, setData] = useState(mockExpenseData);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'categories' | 'trends' | 'budget'>('categories');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const totalExpenses = data.categories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalBudget = data.categories.reduce((sum, cat) => sum + cat.budget, 0);
  const budgetVariance = totalBudget - totalExpenses;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your expense data...</p>
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
          Expense Management
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Track and optimize your spending with intelligent categorization and budgeting
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center mt-6">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 flex space-x-2">
            {[
              { key: 'categories', label: 'Categories', icon: PieChart },
              { key: 'trends', label: 'Trends', icon: BarChart3 },
              { key: 'budget', label: 'Budget', icon: Target },
            ].map((view) => (
              <motion.button
                key={view.key}
                onClick={() => setActiveView(view.key as 'categories' | 'trends' | 'budget')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeView === view.key
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg' 
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

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: 'Total Expenses',
            value: formatCurrency(totalExpenses),
            icon: PieChart,
            gradient: 'from-red-500 to-rose-600',
            description: 'This month'
          },
          {
            title: 'Budget Remaining',
            value: formatCurrency(budgetVariance),
            icon: Target,
            gradient: budgetVariance > 0 ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600',
            description: budgetVariance > 0 ? 'Under budget' : 'Over budget'
          },
          {
            title: 'Categories',
            value: data.categories.length.toString(),
            icon: MoreHorizontal,
            gradient: 'from-blue-500 to-cyan-600',
            description: 'Active categories'
          },
          {
            title: 'Avg Daily',
            value: formatCurrency(totalExpenses / 30),
            icon: Calendar,
            gradient: 'from-purple-500 to-violet-600',
            description: 'Daily average'
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
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg animate-breathe`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <motion.p 
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeView === 'categories' && (
          <motion.div
            key="categories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Add Expense Button */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button className="btn-primary px-8 py-4 text-lg hover-scale">
                <Plus className="w-5 h-5 mr-2" />
                Add Expense Category
              </Button>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.categories.map((category, index) => {
                const budgetUsed = (category.amount / category.budget) * 100;
                const IconComponent = category.icon;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card className="card-premium h-full relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 opacity-50"></div>
                      
                      <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div 
                            className="p-3 rounded-xl shadow-lg animate-float"
                            style={{ backgroundColor: category.color }}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            category.type === 'fixed' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                            {category.type}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {category.name}
                        </h3>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Spent</span>
                            <motion.span 
                              className="text-xl font-bold text-gray-900 dark:text-white"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              {formatCurrency(category.amount)}
                            </motion.span>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Budget Usage</span>
                              <span className={`font-medium ${
                                budgetUsed > 100 ? 'text-red-600' :
                                budgetUsed > 80 ? 'text-orange-600' : 'text-green-600'
                              }`}>
                                {budgetUsed.toFixed(1)}%
                              </span>
                            </div>
                            <div className="relative">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <motion.div
                                  className={`h-2 rounded-full ${
                                    budgetUsed > 100 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                    budgetUsed > 80 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                    'bg-gradient-to-r from-green-500 to-green-600'
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(budgetUsed, 100)}%` }}
                                  transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {category.transactions} transactions
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              Budget: {formatCurrency(category.budget)}
                            </span>
                          </div>

                          {budgetUsed > 100 && (
                            <motion.div 
                              className="flex items-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 text-xs"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1 + index * 0.1 }}
                            >
                              <AlertTriangle className="w-3 h-3 mr-1 animate-pulse" />
                              Over budget by {formatCurrency(category.amount - category.budget)}
                            </motion.div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeView === 'trends' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Expense Trends */}
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Monthly Expense Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.monthlyTrend}>
                        <defs>
                          <linearGradient id="housingGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="foodGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
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
                        <Area type="monotone" dataKey="housing" stackId="1" stroke="#3b82f6" fill="url(#housingGradient)" />
                        <Area type="monotone" dataKey="food" stackId="1" stroke="#f59e0b" fill="url(#foodGradient)" />
                        <Area type="monotone" dataKey="transport" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown Pie Chart */}
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-indigo-600" />
                    Spending Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={data.categories}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [formatCurrency(Number(value)), 'Amount']}
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeView === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Budget vs Actual */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  Budget vs Actual Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.budgetComparison}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="category" stroke="#6b7280" />
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
                      <Bar dataKey="budget" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
