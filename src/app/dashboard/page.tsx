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
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { formatCurrency } from '@/lib/utils';

// Mock data - in real app, this would come from API
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
    },
    {
      id: '2',
      name: 'Capital One',
      balance: 2250,
      limit: 5000,
      rate: 0.2199,
      minPayment: 56.25,
    },
  ],
  recentTransactions: [
    { id: '1', description: 'Grocery Store', amount: -85.32, date: '2024-01-15' },
    { id: '2', description: 'Salary Deposit', amount: 800.00, date: '2024-01-12' },
    { id: '3', description: 'Gas Station', amount: -45.20, date: '2024-01-10' },
  ],
  monthlyGoals: [
    { id: '1', name: 'Emergency Fund', current: 1200, target: 3000, category: 'savings' },
    { id: '2', name: 'Debt Payoff', current: 2500, target: 5000, category: 'debt' },
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

export default function DashboardPage() {
  const [data, setData] = useState(mockData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const netWorth = data.monthlyIncome - data.totalDebt;
  const monthlyCashFlow = data.monthlyIncome - data.monthlyExpenses;
  const totalCreditUtilization = data.creditCards.reduce((acc, card) => acc + (card.balance / card.limit), 0) / data.creditCards.length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your financial overview for this month.
        </p>
      </motion.div>

      {/* Key Metrics Cards */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90">
                Monthly Income
              </CardTitle>
              <DollarSign className="w-4 h-4 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.monthlyIncome)}
            </div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Debt
              </CardTitle>
              <CreditCard className="w-4 h-4 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.totalDebt)}
            </div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              -5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90">
                Cash Flow
              </CardTitle>
              <TrendingUp className="w-4 h-4 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(monthlyCashFlow)}
            </div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium opacity-90">
                Emergency Fund
              </CardTitle>
              <Target className="w-4 h-4 opacity-90" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(data.emergencyFund)}
            </div>
            <div className="flex items-center text-xs opacity-90 mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Credit Cards Overview */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Credit Cards</CardTitle>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.creditCards.map((card) => {
                const utilization = (card.balance / card.limit) * 100;
                return (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{card.name}</h3>
                      <span className="text-sm text-gray-500">
                        {formatCurrency(card.balance)} / {formatCurrency(card.limit)}
                      </span>
                    </div>
                    <Progress value={utilization} className="mb-2" />
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{utilization.toFixed(1)}% utilized</span>
                      <span>Min: {formatCurrency(card.minPayment)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Goals and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Monthly Goals</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.monthlyGoals.map((goal) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{goal.name}</h3>
                        <span className="text-sm text-gray-500">
                          {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                        </span>
                      </div>
                      <Progress value={progress} />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {progress.toFixed(1)}% complete
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.recentTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                    <span
                      className={`font-medium ${
                        transaction.amount > 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Alerts Section */}
      {totalCreditUtilization > 0.7 && (
        <motion.div variants={itemVariants}>
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-orange-800 dark:text-orange-200">
                    High Credit Utilization Alert
                  </h3>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    Your average credit utilization is {(totalCreditUtilization * 100).toFixed(1)}%. 
                    Consider paying down balances to improve your credit score.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
