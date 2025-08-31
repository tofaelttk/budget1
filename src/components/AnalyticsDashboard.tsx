'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter,
  Download,
  RefreshCw,
  Eye,
  Target,
  DollarSign,
  CreditCard,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart
} from 'recharts';
import CountUp from 'react-countup';

interface ChartData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  netWorth: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

interface TrendData {
  period: string;
  value: number;
  change: number;
}

export default function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedChart, setSelectedChart] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - in real app, this would come from your database
  const monthlyData: ChartData[] = [
    { month: 'Aug', income: 5200, expenses: 4100, savings: 1100, netWorth: 15200 },
    { month: 'Sep', income: 5400, expenses: 4250, savings: 1150, netWorth: 16350 },
    { month: 'Oct', income: 5100, expenses: 4300, savings: 800, netWorth: 17150 },
    { month: 'Nov', income: 5600, expenses: 4200, savings: 1400, netWorth: 18550 },
    { month: 'Dec', income: 5800, expenses: 4500, savings: 1300, netWorth: 19850 },
    { month: 'Jan', income: 5200, expenses: 4180, savings: 1020, netWorth: 20870 }
  ];

  const expenseByCategory: CategoryData[] = [
    { name: 'Housing', value: 1200, color: '#6366f1', percentage: 28.7 },
    { name: 'Food', value: 800, color: '#10b981', percentage: 19.1 },
    { name: 'Transportation', value: 450, color: '#f59e0b', percentage: 10.8 },
    { name: 'Entertainment', value: 350, color: '#ef4444', percentage: 8.4 },
    { name: 'Healthcare', value: 280, color: '#8b5cf6', percentage: 6.7 },
    { name: 'Shopping', value: 320, color: '#06b6d4', percentage: 7.7 },
    { name: 'Education', value: 500, color: '#ec4899', percentage: 12.0 },
    { name: 'Other', value: 280, color: '#84cc16', percentage: 6.7 }
  ];

  const incomeBySource: CategoryData[] = [
    { name: 'Salary', value: 4200, color: '#10b981', percentage: 80.8 },
    { name: 'Freelance', value: 800, color: '#f59e0b', percentage: 15.4 },
    { name: 'Investments', value: 200, color: '#6366f1', percentage: 3.8 }
  ];

  const creditUtilization = [
    { name: 'Chase Sapphire', utilization: 49, limit: 5000, balance: 2450, color: '#6366f1' },
    { name: 'Capital One', utilization: 23, limit: 8000, balance: 1850, color: '#10b981' },
    { name: 'Amex Gold', utilization: 32, limit: 10000, balance: 3200, color: '#f59e0b' }
  ];

  const financialHealthMetrics = [
    { metric: 'Emergency Fund', value: 85, fullMark: 100, color: '#10b981' },
    { metric: 'Debt Management', value: 72, fullMark: 100, color: '#f59e0b' },
    { metric: 'Savings Rate', value: 90, fullMark: 100, color: '#6366f1' },
    { metric: 'Investment Growth', value: 65, fullMark: 100, color: '#8b5cf6' },
    { metric: 'Budget Control', value: 78, fullMark: 100, color: '#ef4444' },
    { metric: 'Goal Progress', value: 82, fullMark: 100, color: '#06b6d4' }
  ];

  const keyMetrics = [
    {
      title: 'Net Worth',
      value: 20870,
      change: 5.2,
      trend: 'up',
      icon: TrendingUp,
      color: '#10b981',
      prefix: '$'
    },
    {
      title: 'Monthly Savings Rate',
      value: 19.6,
      change: 2.1,
      trend: 'up',
      icon: Target,
      color: '#6366f1',
      suffix: '%'
    },
    {
      title: 'Debt-to-Income',
      value: 28.4,
      change: -3.5,
      trend: 'down',
      icon: CreditCard,
      color: '#f59e0b',
      suffix: '%'
    },
    {
      title: 'Emergency Fund Months',
      value: 3.2,
      change: 0.8,
      trend: 'up',
      icon: Wallet,
      color: '#8b5cf6',
      suffix: 'mo'
    }
  ];

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const exportData = () => {
    // Simulate data export
    const dataToExport = {
      monthlyData,
      expenseByCategory,
      incomeBySource,
      creditUtilization,
      financialHealthMetrics,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const chartOptions = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'income', label: 'Income Analysis', icon: TrendingUp },
    { id: 'expenses', label: 'Expense Breakdown', icon: PieChart },
    { id: 'trends', label: 'Trends & Patterns', icon: Activity },
    { id: 'health', label: 'Financial Health', icon: Target }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Analytics Dashboard</h2>
          <p className="text-gray-400">Deep insights into your financial patterns</p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={refreshData}
            disabled={isLoading}
            className="p-3 glass rounded-xl hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </motion.button>
          <motion.button
            onClick={exportData}
            className="p-3 glass rounded-xl hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
          </motion.button>
          <div className="flex space-x-2">
            {['1month', '3months', '6months', '1year'].map((period) => (
              <motion.button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {period.replace('month', 'mo').replace('year', 'yr')}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover-lift group"
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <h3 className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors">
                {metric.title}
              </h3>
              <div className="text-2xl font-bold">
                {metric.prefix}
                <CountUp
                  end={metric.value}
                  duration={2}
                  decimals={metric.title.includes('Months') || metric.title.includes('Rate') ? 1 : 0}
                  separator=","
                />
                {metric.suffix}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-2 rounded-2xl"
      >
        <div className="flex space-x-2 overflow-x-auto">
          {chartOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedChart(option.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  selectedChart === option.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white star-border'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span>{option.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Dynamic Chart Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedChart}
          initial={{ opacity: 0, x: 300, rotateY: 90 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: -300, rotateY: -90 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut",
            rotateY: { duration: 0.8 }
          }}
        >
          {selectedChart === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Income vs Expenses */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Income vs Expenses</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                      <Line type="monotone" dataKey="savings" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Net Worth Growth */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Net Worth Growth</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="netWorth" 
                        stroke="#8b5cf6" 
                        fill="url(#netWorthGradient)" 
                        strokeWidth={3}
                      />
                      <defs>
                        <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {selectedChart === 'income' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Income Sources */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Income Sources</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={incomeBySource}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                      >
                        {incomeBySource.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Income Trend */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Income Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {selectedChart === 'expenses' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expense Categories */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Expense Breakdown</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={expenseByCategory}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                      >
                        {expenseByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Spending */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Monthly Category Spending</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseByCategory} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9ca3af" />
                      <YAxis dataKey="name" type="category" stroke="#9ca3af" width={80} />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {expenseByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {selectedChart === 'trends' && (
            <div className="space-y-6">
              {/* Savings Trend */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Savings Trend Analysis</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="savings" 
                        stroke="#6366f1" 
                        fill="url(#savingsGradient)" 
                        strokeWidth={3}
                      />
                      <defs>
                        <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Credit Utilization */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Credit Card Utilization</h3>
                <div className="space-y-4">
                  {creditUtilization.map((card, index) => (
                    <motion.div
                      key={card.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 glass rounded-xl"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{card.name}</span>
                        <span className="text-sm text-gray-400">
                          ${card.balance.toLocaleString()} / ${card.limit.toLocaleString()}
                        </span>
                      </div>
                      <div className="progress-bar mb-2">
                        <motion.div
                          className="progress-fill"
                          style={{ 
                            backgroundColor: card.utilization > 80 ? '#ef4444' : card.utilization > 50 ? '#f59e0b' : '#10b981',
                            width: `${card.utilization}%`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${card.utilization}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={
                          card.utilization > 80 ? 'text-red-400' : 
                          card.utilization > 50 ? 'text-yellow-400' : 'text-green-400'
                        }>
                          {card.utilization}% utilized
                        </span>
                        <span className="text-gray-400">
                          ${(card.limit - card.balance).toLocaleString()} available
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedChart === 'health' && (
            <div className="space-y-6">
              {/* Financial Health Radar */}
              <div className="card hover-lift">
                <h3 className="text-xl font-bold gradient-text mb-4">Financial Health Score</h3>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={financialHealthMetrics}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                      <PolarRadiusAxis 
                        angle={0} 
                        domain={[0, 100]} 
                        tick={{ fill: '#9ca3af', fontSize: 10 }} 
                      />
                      <Radar
                        name="Score"
                        dataKey="value"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.3}
                        strokeWidth={2}
                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Health Metrics Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {financialHealthMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.metric}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="card hover-lift"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm">{metric.metric}</h4>
                      <span className="text-lg font-bold" style={{ color: metric.color }}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        style={{ backgroundColor: metric.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      {metric.value >= 80 ? 'Excellent' : 
                       metric.value >= 60 ? 'Good' : 
                       metric.value >= 40 ? 'Fair' : 'Needs Improvement'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Summary Insights */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card hover-lift"
      >
        <h3 className="text-xl font-bold gradient-text mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-green-400">Positive Trend</span>
            </div>
            <p className="text-sm text-gray-400">
              Your savings rate has increased by 15% over the last 3 months, putting you ahead of your annual goal.
            </p>
          </div>
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-yellow-400">Opportunity</span>
            </div>
            <p className="text-sm text-gray-400">
              Consider increasing your emergency fund contribution to reach the recommended 6-month coverage faster.
            </p>
          </div>
          <div className="p-4 glass rounded-xl">
            <div className="flex items-center space-x-3 mb-2">
              <Eye className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-blue-400">Watch Out</span>
            </div>
            <p className="text-sm text-gray-400">
              Your entertainment spending is 25% higher than average. Consider setting a stricter budget for this category.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
