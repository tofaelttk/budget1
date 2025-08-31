'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Shield
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from 'react-countup';

interface OverviewCard {
  title: string;
  value: number;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
  prefix?: string;
  suffix?: string;
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  color: string;
}

export default function FinancialOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data - in real app, this would come from your database
  const overviewData: OverviewCard[] = [
    {
      title: 'Total Balance',
      value: 12450.75,
      change: 8.5,
      icon: DollarSign,
      color: 'from-green-400 to-emerald-600',
      prefix: '$'
    },
    {
      title: 'Monthly Income',
      value: 5200.00,
      change: 12.3,
      icon: TrendingUp,
      color: 'from-blue-400 to-cyan-600',
      prefix: '$'
    },
    {
      title: 'Monthly Expenses',
      value: 3450.25,
      change: -5.2,
      icon: TrendingDown,
      color: 'from-orange-400 to-red-600',
      prefix: '$'
    },
    {
      title: 'Credit Utilization',
      value: 32.5,
      change: -8.1,
      icon: CreditCard,
      color: 'from-purple-400 to-pink-600',
      suffix: '%'
    }
  ];

  const goals: Goal[] = [
    {
      id: '1',
      title: 'Emergency Fund',
      target: 10000,
      current: 6500,
      deadline: '2024-12-31',
      color: '#10b981'
    },
    {
      id: '2',
      title: 'Vacation Fund',
      target: 5000,
      current: 2800,
      deadline: '2024-08-15',
      color: '#f59e0b'
    },
    {
      id: '3',
      title: 'Debt Payoff',
      target: 15000,
      current: 8200,
      deadline: '2025-06-30',
      color: '#ef4444'
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'income', description: 'Salary Deposit', amount: 2600, date: '2024-01-15', category: 'Salary' },
    { id: 2, type: 'expense', description: 'Grocery Shopping', amount: -145.50, date: '2024-01-14', category: 'Food' },
    { id: 3, type: 'expense', description: 'Credit Card Payment', amount: -850.00, date: '2024-01-13', category: 'Credit Card' },
    { id: 4, type: 'income', description: 'Freelance Project', amount: 450.00, date: '2024-01-12', category: 'Freelance' },
    { id: 5, type: 'expense', description: 'Netflix Subscription', amount: -15.99, date: '2024-01-11', category: 'Entertainment' }
  ];

  const financialHealthScore = 78;

  return (
    <div className="space-y-6">
      {/* Header with Period Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Financial Overview</h2>
          <p className="text-gray-400">Your complete financial snapshot</p>
        </div>
        <div className="flex space-x-2">
          {['week', 'month', 'year'].map((period) => (
            <motion.button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedPeriod === period
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white star-border'
                  : 'glass text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewData.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover-lift group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center text-sm font-semibold ${
                  card.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {card.change > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {Math.abs(card.change)}%
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors">
                {card.title}
              </h3>
              <div className="text-2xl font-bold">
                {card.prefix}
                <CountUp
                  end={card.value}
                  duration={2}
                  decimals={card.prefix === '$' ? 2 : 1}
                  separator=","
                />
                {card.suffix}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Health Score */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="card hover-lift"
        >
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 gradient-text">Financial Health Score</h3>
            <div className="w-32 h-32 mx-auto mb-4">
              <CircularProgressbar
                value={financialHealthScore}
                text={`${financialHealthScore}`}
                styles={buildStyles({
                  textSize: '24px',
                  pathColor: financialHealthScore > 70 ? '#10b981' : financialHealthScore > 40 ? '#f59e0b' : '#ef4444',
                  textColor: '#ffffff',
                  trailColor: 'rgba(255, 255, 255, 0.1)',
                  pathTransitionDuration: 2,
                })}
              />
            </div>
            <div className="space-y-2">
              <div className={`flex items-center justify-center space-x-2 ${
                financialHealthScore > 70 ? 'text-green-400' : 
                financialHealthScore > 40 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {financialHealthScore > 70 ? <CheckCircle className="w-5 h-5" /> : 
                 financialHealthScore > 40 ? <Clock className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                <span className="font-semibold">
                  {financialHealthScore > 70 ? 'Excellent' : 
                   financialHealthScore > 40 ? 'Good' : 'Needs Attention'}
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                {financialHealthScore > 70 ? 'Keep up the great work!' : 
                 financialHealthScore > 40 ? 'You\'re on the right track' : 'Let\'s improve together'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Goals Progress */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card hover-lift"
        >
          <h3 className="text-xl font-bold mb-4 gradient-text">Goal Progress</h3>
          <div className="space-y-4">
            {goals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">{goal.title}</span>
                    <span className="text-xs text-gray-400">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      style={{ background: goal.color }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{Math.round(progress)}% complete</span>
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="card hover-lift"
        >
          <h3 className="text-xl font-bold mb-4 gradient-text">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Zap className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Savings Rate</p>
                  <p className="font-semibold">33.7%</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Emergency Months</p>
                  <p className="font-semibold">3.2</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Debt-to-Income</p>
                  <p className="font-semibold">28.5%</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="card hover-lift"
      >
        <h3 className="text-xl font-bold mb-4 gradient-text">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/10 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {transaction.type === 'income' ? 
                    <TrendingUp className="w-4 h-4" /> : 
                    <TrendingDown className="w-4 h-4" />
                  }
                </div>
                <div>
                  <p className="font-semibold">{transaction.description}</p>
                  <p className="text-sm text-gray-400">{transaction.category} • {transaction.date}</p>
                </div>
              </div>
              <div className={`font-bold ${
                transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
