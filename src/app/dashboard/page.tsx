'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Target, 
  AlertTriangle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  Zap,
  Sparkles,
  TrendingDown,
  Calendar,
  Wallet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { formatCurrency } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts';

// Enhanced mock data with more detailed information
const mockData = {
  totalDebt: 15750,
  monthlyIncome: 3200,
  monthlyExpenses: 2850,
  emergencyFund: 1200,
  creditCards: [
    {
      id: '1',
      name: 'Chase Freedom',
      balance: 3500,
      limit: 8000,
      rate: 0.1899,
      minPayment: 87.50,
      dueDate: 15,
    },
    {
      id: '2',
      name: 'Capital One',
      balance: 2250,
      limit: 5000,
      rate: 0.2199,
      minPayment: 56.25,
      dueDate: 22,
    },
    {
      id: '3',
      name: 'Discover It',
      balance: 1800,
      limit: 4000,
      rate: 0.1749,
      minPayment: 45.00,
      dueDate: 8,
    },
  ],
  recentTransactions: [
    { id: '1', description: 'Grocery Store', amount: -85.32, date: '2024-01-15', category: 'Food' },
    { id: '2', description: 'Salary Deposit', amount: 800.00, date: '2024-01-12', category: 'Income' },
    { id: '3', description: 'Gas Station', amount: -45.20, date: '2024-01-10', category: 'Transportation' },
    { id: '4', description: 'Netflix', amount: -15.99, date: '2024-01-08', category: 'Entertainment' },
    { id: '5', description: 'Coffee Shop', amount: -8.50, date: '2024-01-07', category: 'Food' },
  ],
  monthlyGoals: [
    { id: '1', name: 'Emergency Fund', current: 1200, target: 3000, category: 'savings' },
    { id: '2', name: 'Debt Payoff', current: 2500, target: 5000, category: 'debt' },
    { id: '3', name: 'Vacation Fund', current: 450, target: 2000, category: 'savings' },
  ],
  monthlySpending: [
    { month: 'Jul', income: 3200, expenses: 2650, savings: 550 },
    { month: 'Aug', income: 3200, expenses: 2780, savings: 420 },
    { month: 'Sep', income: 3200, expenses: 2900, savings: 300 },
    { month: 'Oct', income: 3200, expenses: 2850, savings: 350 },
    { month: 'Nov', income: 3200, expenses: 2950, savings: 250 },
    { month: 'Dec', income: 3200, expenses: 2850, savings: 350 },
  ],
  expenseCategories: [
    { name: 'Housing', value: 1200, color: '#8884d8' },
    { name: 'Food', value: 450, color: '#82ca9d' },
    { name: 'Transportation', value: 350, color: '#ffc658' },
    { name: 'Utilities', value: 200, color: '#ff7300' },
    { name: 'Entertainment', value: 180, color: '#00ff88' },
    { name: 'Other', value: 470, color: '#ff8888' },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff88', '#ff8888'];

export default function DashboardPage() {
  const [data, setData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    // Quick loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const netWorth = data.monthlyIncome - data.totalDebt;
  const monthlyCashFlow = data.monthlyIncome - data.monthlyExpenses;
  const totalCreditUtilization = data.creditCards.reduce((acc, card) => acc + (card.balance / card.limit), 0) / data.creditCards.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-purple-600 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 text-lg font-medium"
          >
            Loading your financial dashboard...
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-4"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h1 
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Financial Dashboard
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Take control of your finances with intelligent insights and beautiful visualizations
          </motion.p>
        </motion.div>

        {/* Key Metrics Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: 'Monthly Income',
              value: formatCurrency(data.monthlyIncome),
              change: '+12%',
              icon: DollarSign,
              gradient: 'from-emerald-500 to-teal-600',
              shadowColor: 'shadow-glow-green'
            },
            {
              title: 'Total Debt',
              value: formatCurrency(data.totalDebt),
              change: '-5%',
              icon: CreditCard,
              gradient: 'from-red-500 to-pink-600',
              shadowColor: 'shadow-glow-red'
            },
            {
              title: 'Cash Flow',
              value: formatCurrency(monthlyCashFlow),
              change: '+8%',
              icon: TrendingUp,
              gradient: 'from-blue-500 to-cyan-600',
              shadowColor: 'shadow-glow'
            },
            {
              title: 'Emergency Fund',
              value: formatCurrency(data.emergencyFund),
              change: '+15%',
              icon: Target,
              gradient: 'from-purple-500 to-violet-600',
              shadowColor: 'shadow-glow-purple'
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card className={`bg-gradient-to-br ${metric.gradient} text-white border-0 hover-lift ${metric.shadowColor} overflow-hidden relative`}>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <CardHeader className="pb-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium opacity-90">
                      {metric.title}
                    </CardTitle>
                    <div className="p-2 bg-white/20 rounded-lg">
                      <metric.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.div 
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {metric.value}
                  </motion.div>
                  <div className="flex items-center text-sm opacity-90">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center"
                    >
                      {metric.change.startsWith('+') ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {metric.change} from last month
                    </motion.div>
                  </div>
                </CardContent>
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Spending Trend */}
          <motion.div variants={itemVariants}>
            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Monthly Spending Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.monthlySpending}>
                      <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
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
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        stroke="#ef4444" 
                        fillOpacity={1} 
                        fill="url(#expensesGradient)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Expense Categories */}
          <motion.div variants={itemVariants}>
            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  Expense Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={data.expenseCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {data.expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
          </motion.div>
        </div>

        {/* Credit Cards Section */}
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  Credit Cards Overview
                </CardTitle>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Card
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.creditCards.map((card, index) => {
                  const utilization = (card.balance / card.limit) * 100;
                  const gradients = [
                    'from-blue-500 to-blue-700',
                    'from-purple-500 to-purple-700',
                    'from-green-500 to-green-700'
                  ];
                  
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, rotateY: -90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      onHoverStart={() => setActiveCard(card.id)}
                      onHoverEnd={() => setActiveCard(null)}
                      className={`relative p-6 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white cursor-pointer overflow-hidden hover-lift`}
                      style={{ perspective: '1000px' }}
                    >
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold">{card.name}</h3>
                          <div className="w-8 h-5 bg-white/30 rounded-sm"></div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm opacity-80">Balance</p>
                            <p className="text-2xl font-bold">{formatCurrency(card.balance)}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Utilization</span>
                              <span>{utilization.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <motion.div
                                className="bg-white rounded-full h-2"
                                initial={{ width: 0 }}
                                animate={{ width: `${utilization}%` }}
                                transition={{ delay: 0.5 + index * 0.2, duration: 1 }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-sm opacity-90">
                            <span>Limit: {formatCurrency(card.limit)}</span>
                            <span>Due: {card.dueDate}th</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Animated background elements */}
                      <motion.div
                        className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full"
                        animate={{
                          scale: activeCard === card.id ? 1.2 : 1,
                          opacity: activeCard === card.id ? 0.3 : 0.1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/5 rounded-full blur-xl"></div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Goals and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Card className="glass hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Financial Goals
                  </CardTitle>
                  <Button size="sm" variant="outline" className="hover-scale">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {data.monthlyGoals.map((goal, index) => {
                    const progress = (goal.current / goal.target) * 100;
                    return (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-3 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl hover-lift"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{goal.name}</h3>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                          </span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <motion.div
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full relative overflow-hidden"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: 'easeOut' }}
                            >
                              <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                            </motion.div>
                          </div>
                          <motion.span 
                            className="absolute right-0 -top-6 text-xs font-medium text-gray-600 dark:text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + index * 0.1 }}
                          >
                            {progress.toFixed(1)}%
                          </motion.span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-orange-600" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.recentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover-lift cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 
                            ? 'bg-green-100 dark:bg-green-900/30' 
                            : 'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          {transaction.amount > 0 ? (
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.date} • {transaction.category}
                          </p>
                        </div>
                      </div>
                      <motion.span
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`font-semibold ${
                          transaction.amount > 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {transaction.amount > 0 ? '+' : ''}
                        {formatCurrency(Math.abs(transaction.amount))}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Add Transaction', icon: Plus, color: 'blue' },
                  { name: 'Pay Bills', icon: Calendar, color: 'green' },
                  { name: 'Set Budget', icon: Target, color: 'purple' },
                  { name: 'View Reports', icon: BarChart3, color: 'orange' },
                ].map((action, index) => (
                  <motion.button
                    key={action.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 text-white rounded-xl hover-lift flex flex-col items-center space-y-2 transition-all duration-200`}
                  >
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{action.name}</span>
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Financial Health Alert */}
        {totalCreditUtilization > 0.7 && (
          <motion.div 
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="animate-wiggle"
          >
            <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
                      High Credit Utilization Alert
                    </h3>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Your average credit utilization is {(totalCreditUtilization * 100).toFixed(1)}%. 
                      Consider paying down balances to improve your credit score.
                    </p>
                    <Button 
                      size="sm" 
                      className="mt-3 bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Suggestions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}