'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Zap,
  Brain,
  Target,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  Sparkles,
  Eye,
  EyeOff,
  RefreshCw,
  Bell,
  Settings,
  Filter,
  Download,
  Upload,
  Clock,
  ArrowUpDown,
  Layers,
  TrendingUp as TrendUp,
  Award,
  Shield
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Legend,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  RadialBarChart,
  RadialBar,
  Treemap
} from 'recharts';
import Button from '@/components/ui/Button';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface CashFlowItem {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  recurring: boolean;
  frequency?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  confidence: number;
  predictedAmount?: number;
  variance?: number;
  description: string;
}

interface CashFlowPrediction {
  month: string;
  predictedInflow: number;
  predictedOutflow: number;
  netCashFlow: number;
  confidence: number;
  runningBalance: number;
  scenarios: {
    optimistic: number;
    realistic: number;
    pessimistic: number;
  };
}

interface CashFlowAlert {
  id: string;
  type: 'warning' | 'opportunity' | 'critical' | 'info';
  title: string;
  description: string;
  impact: number;
  likelihood: number;
  suggestedAction: string;
  timeframe: string;
}

interface SeasonalPattern {
  month: string;
  incomeMultiplier: number;
  expenseMultiplier: number;
  historicalVariance: number;
}

export default function PredictiveCashFlowManager() {
  const [cashFlowItems, setCashFlowItems] = useState<CashFlowItem[]>([
    {
      id: '1',
      type: 'income',
      category: 'Salary',
      amount: 5200,
      date: '2024-01-01',
      recurring: true,
      frequency: 'monthly',
      confidence: 95,
      predictedAmount: 5460,
      variance: 3.2,
      description: 'Primary employment income'
    },
    {
      id: '2',
      type: 'income',
      category: 'Freelance',
      amount: 1200,
      date: '2024-01-15',
      recurring: true,
      frequency: 'monthly',
      confidence: 78,
      predictedAmount: 1580,
      variance: 28.5,
      description: 'Freelance consulting work'
    },
    {
      id: '3',
      type: 'expense',
      category: 'Housing',
      amount: 1800,
      date: '2024-01-01',
      recurring: true,
      frequency: 'monthly',
      confidence: 100,
      predictedAmount: 1800,
      variance: 0,
      description: 'Rent and utilities'
    },
    {
      id: '4',
      type: 'expense',
      category: 'Transportation',
      amount: 450,
      date: '2024-01-05',
      recurring: true,
      frequency: 'monthly',
      confidence: 85,
      predictedAmount: 485,
      variance: 12.8,
      description: 'Car payment, gas, insurance'
    },
    {
      id: '5',
      type: 'expense',
      category: 'Food',
      amount: 650,
      date: '2024-01-10',
      recurring: true,
      frequency: 'monthly',
      confidence: 72,
      predictedAmount: 720,
      variance: 25.4,
      description: 'Groceries and dining out'
    }
  ]);

  const [predictions, setPredictions] = useState<CashFlowPrediction[]>([
    {
      month: 'Feb 2024',
      predictedInflow: 7040,
      predictedOutflow: 3005,
      netCashFlow: 4035,
      confidence: 87,
      runningBalance: 16485,
      scenarios: { optimistic: 4850, realistic: 4035, pessimistic: 3220 }
    },
    {
      month: 'Mar 2024',
      predictedInflow: 7280,
      predictedOutflow: 3125,
      netCashFlow: 4155,
      confidence: 84,
      runningBalance: 20640,
      scenarios: { optimistic: 5100, realistic: 4155, pessimistic: 3210 }
    },
    {
      month: 'Apr 2024',
      predictedInflow: 7520,
      predictedOutflow: 3245,
      netCashFlow: 4275,
      confidence: 81,
      runningBalance: 24915,
      scenarios: { optimistic: 5350, realistic: 4275, pessimistic: 3200 }
    },
    {
      month: 'May 2024',
      predictedInflow: 7760,
      predictedOutflow: 3365,
      netCashFlow: 4395,
      confidence: 78,
      runningBalance: 29310,
      scenarios: { optimistic: 5600, realistic: 4395, pessimistic: 3190 }
    },
    {
      month: 'Jun 2024',
      predictedInflow: 8000,
      predictedOutflow: 3485,
      netCashFlow: 4515,
      confidence: 75,
      runningBalance: 33825,
      scenarios: { optimistic: 5850, realistic: 4515, pessimistic: 3180 }
    },
    {
      month: 'Jul 2024',
      predictedInflow: 8240,
      predictedOutflow: 3605,
      netCashFlow: 4635,
      confidence: 72,
      runningBalance: 38460,
      scenarios: { optimistic: 6100, realistic: 4635, pessimistic: 3170 }
    }
  ]);

  const [alerts, setAlerts] = useState<CashFlowAlert[]>([
    {
      id: '1',
      type: 'opportunity',
      title: 'Surplus Optimization',
      description: 'Your projected cash surplus will reach $4,500+ next month. Consider increasing investment contributions.',
      impact: 85,
      likelihood: 92,
      suggestedAction: 'Increase 401k contribution by 2% or invest in index funds',
      timeframe: 'Next month'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Seasonal Expense Spike',
      description: 'Historical data shows 15% increase in expenses during summer months due to vacation and utility costs.',
      impact: 65,
      likelihood: 88,
      suggestedAction: 'Build summer expense buffer of $800-1200',
      timeframe: '3-4 months'
    },
    {
      id: '3',
      type: 'info',
      title: 'Income Growth Pattern',
      description: 'Freelance income showing consistent 8% monthly growth. Consider formalizing additional revenue streams.',
      impact: 78,
      likelihood: 85,
      suggestedAction: 'Explore retainer agreements or passive income options',
      timeframe: 'Next 6 months'
    }
  ]);

  const [selectedScenario, setSelectedScenario] = useState<'optimistic' | 'realistic' | 'pessimistic'>('realistic');
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [analysisRunning, setAnalysisRunning] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');

  // Seasonal patterns based on historical data
  const seasonalPatterns: SeasonalPattern[] = [
    { month: 'Jan', incomeMultiplier: 0.95, expenseMultiplier: 1.05, historicalVariance: 8.2 },
    { month: 'Feb', incomeMultiplier: 1.02, expenseMultiplier: 0.98, historicalVariance: 6.8 },
    { month: 'Mar', incomeMultiplier: 1.08, expenseMultiplier: 1.02, historicalVariance: 7.5 },
    { month: 'Apr', incomeMultiplier: 1.12, expenseMultiplier: 1.08, historicalVariance: 9.1 },
    { month: 'May', incomeMultiplier: 1.15, expenseMultiplier: 1.12, historicalVariance: 10.3 },
    { month: 'Jun', incomeMultiplier: 1.18, expenseMultiplier: 1.18, historicalVariance: 12.8 }
  ];

  // Category breakdown for expenses
  const expenseBreakdown = [
    { category: 'Housing', amount: 1800, percentage: 42, color: '#ef4444' },
    { category: 'Transportation', amount: 485, percentage: 11, color: '#f59e0b' },
    { category: 'Food', amount: 720, percentage: 17, color: '#10b981' },
    { category: 'Entertainment', amount: 380, percentage: 9, color: '#6366f1' },
    { category: 'Healthcare', amount: 290, percentage: 7, color: '#8b5cf6' },
    { category: 'Shopping', amount: 450, percentage: 10, color: '#06b6d4' },
    { category: 'Other', amount: 175, percentage: 4, color: '#84cc16' }
  ];

  // Cash flow velocity metrics
  const velocityMetrics = {
    averageMonthlyInflow: 7200,
    averageMonthlyOutflow: 3200,
    netPositiveMonths: 11,
    cashConversionCycle: 2.3,
    burnRate: 3200,
    runwayMonths: 15.6
  };

  const runPredictiveAnalysis = async () => {
    setAnalysisRunning(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Update predictions with new confidence scores
    const updatedPredictions = predictions.map(p => ({
      ...p,
      confidence: Math.min(100, p.confidence + Math.random() * 5)
    }));
    
    setPredictions(updatedPredictions);
    setAnalysisRunning(false);
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(a => a.id !== alertId));
  };

  const totalIncome = cashFlowItems.filter(item => item.type === 'income').reduce((sum, item) => sum + (item.predictedAmount || item.amount), 0);
  const totalExpenses = cashFlowItems.filter(item => item.type === 'expense').reduce((sum, item) => sum + (item.predictedAmount || item.amount), 0);
  const netCashFlow = totalIncome - totalExpenses;
  const averageConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text">Predictive Cash Flow Manager</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-6">
            Advanced ML-powered cash flow forecasting with seasonal analysis, scenario planning, and intelligent alerts
          </p>
          
          {/* Key Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">${netCashFlow.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Monthly Net Flow</div>
              <div className="text-xs text-green-400 mt-1">↑ 12% vs last month</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">{averageConfidence.toFixed(0)}%</div>
              <div className="text-sm text-gray-400">Prediction Accuracy</div>
              <div className="text-xs text-blue-400 mt-1">AI Confidence Level</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">{velocityMetrics.runwayMonths}</div>
              <div className="text-sm text-gray-400">Months Runway</div>
              <div className="text-xs text-purple-400 mt-1">At current burn rate</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">{alerts.length}</div>
              <div className="text-sm text-gray-400">Active Alerts</div>
              <div className="text-xs text-orange-400 mt-1">Requires attention</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Predictive Analysis Controls */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold gradient-text mb-4">AI Prediction Engine</h3>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-300">Scenario:</label>
                  <select
                    value={selectedScenario}
                    onChange={(e) => setSelectedScenario(e.target.value as any)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                    aria-label="Select prediction scenario"
                    title="Choose between optimistic, realistic, or pessimistic scenarios"
                  >
                    <option value="optimistic">Optimistic (+15%)</option>
                    <option value="realistic">Realistic (Base)</option>
                    <option value="pessimistic">Pessimistic (-15%)</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold text-gray-300">Timeframe:</label>
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                    aria-label="Select prediction timeframe"
                    title="Choose the prediction timeframe"
                  >
                    <option value="3M">3 Months</option>
                    <option value="6M">6 Months</option>
                    <option value="12M">12 Months</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={runPredictiveAnalysis}
                disabled={analysisRunning}
                className="flex items-center gap-2 px-6 py-3"
              >
                {analysisRunning ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Brain className="w-5 h-5" />
                )}
                {analysisRunning ? 'Analyzing...' : 'Run AI Analysis'}
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                className="flex items-center gap-2 px-6 py-3"
              >
                {showDetailedAnalysis ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                {showDetailedAnalysis ? 'Hide Details' : 'Show Analysis'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cash Flow Predictions Chart */}
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Prediction Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-2 card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold gradient-text">6-Month Cash Flow Forecast</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>ML-Powered Predictions</span>
              </div>
            </div>
            
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={predictions}>
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
                  <Legend />
                  
                  <Area
                    type="monotone"
                    dataKey="predictedInflow"
                    fill="#10b981"
                    fillOpacity={0.3}
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Predicted Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="predictedOutflow"
                    fill="#ef4444"
                    fillOpacity={0.3}
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Predicted Expenses"
                  />
                  <Line
                    type="monotone"
                    dataKey="netCashFlow"
                    stroke="#6366f1"
                    strokeWidth={4}
                    name="Net Cash Flow"
                  />
                  <Line
                    type="monotone"
                    dataKey="runningBalance"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Running Balance"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Scenario Comparison */}
            <div className="grid grid-cols-3 gap-4">
              {['optimistic', 'realistic', 'pessimistic'].map((scenario) => (
                <button
                  key={scenario}
                  onClick={() => setSelectedScenario(scenario as any)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    selectedScenario === scenario
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                >
                  <div className="text-lg font-bold mb-1">
                    {scenario === 'optimistic' ? '+15%' : scenario === 'realistic' ? 'Base' : '-15%'}
                  </div>
                  <div className="text-sm text-gray-400 capitalize">{scenario}</div>
                  <div className="text-sm font-semibold mt-2">
                    ${predictions[0]?.scenarios[scenario as keyof typeof predictions[0]['scenarios']].toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Cash Flow Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Expense Breakdown Pie */}
            <div className="card">
              <h3 className="text-lg font-bold gradient-text mb-4">Expense Breakdown</h3>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="amount"
                      label={({ category, percentage }) => `${percentage}%`}
                    >
                      {expenseBreakdown.map((entry, index) => (
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
              
              <div className="space-y-2">
                {expenseBreakdown.slice(0, 4).map((item) => (
                  <div key={item.category} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                                          <div
                      className="w-3 h-3 rounded-full bg-blue-500"
                      data-color={item.color}
                    />
                      <span className="text-gray-400">{item.category}</span>
                    </div>
                    <span className="font-semibold">${item.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cash Velocity Metrics */}
            <div className="card">
              <h3 className="text-lg font-bold gradient-text mb-4">Cash Velocity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Conversion Cycle</span>
                  <span className="font-bold">{velocityMetrics.cashConversionCycle} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Burn Rate</span>
                  <span className="font-bold text-red-400">${velocityMetrics.burnRate}/mo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Runway</span>
                  <span className="font-bold text-green-400">{velocityMetrics.runwayMonths} months</span>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Financial Health</span>
                    <span className="font-semibold">Excellent</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-[87%]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Smart Alerts */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold gradient-text">Intelligent Cash Flow Alerts</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Bell className="w-4 h-4 text-yellow-400" />
              <span>Real-time Monitoring</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 ${
                  alert.type === 'critical' ? 'border-red-500 bg-red-500/10' :
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-500/10' :
                  alert.type === 'opportunity' ? 'border-green-500 bg-green-500/10' :
                  'border-blue-500 bg-blue-500/10'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    alert.type === 'critical' ? 'bg-red-500/20 text-red-400' :
                    alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    alert.type === 'opportunity' ? 'bg-green-500/20 text-green-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {alert.type === 'critical' && <AlertTriangle className="w-5 h-5" />}
                    {alert.type === 'warning' && <Clock className="w-5 h-5" />}
                    {alert.type === 'opportunity' && <TrendingUp className="w-5 h-5" />}
                    {alert.type === 'info' && <Sparkles className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{alert.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                      <span>{alert.likelihood}% likely</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        alert.impact > 80 ? 'bg-red-500/20 text-red-400' :
                        alert.impact > 60 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {alert.impact > 80 ? 'High Impact' : alert.impact > 60 ? 'Medium Impact' : 'Low Impact'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{alert.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Suggested Action:</div>
                    <div className="text-sm font-semibold">{alert.suggestedAction}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Timeline:</span>
                    <span className="font-semibold">{alert.timeframe}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="flex-1"
                  >
                    Dismiss
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Act Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Analysis (Expandable) */}
      <AnimatePresence>
        {showDetailedAnalysis && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="container"
          >
            <div className="space-y-8">
              {/* Seasonal Patterns */}
              <div className="card">
                <h3 className="text-xl font-bold gradient-text mb-6">Seasonal Cash Flow Patterns</h3>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={seasonalPatterns}>
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
                      <Legend />
                      <Bar dataKey="incomeMultiplier" fill="#10b981" name="Income Multiplier" />
                      <Bar dataKey="expenseMultiplier" fill="#ef4444" name="Expense Multiplier" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-gray-400 text-sm">
                  Historical seasonal patterns show income typically peaks in spring/summer while expenses increase during vacation months.
                </p>
              </div>

              {/* Cash Flow Items Detail */}
              <div className="card">
                <h3 className="text-xl font-bold gradient-text mb-6">Cash Flow Items Analysis</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-3 text-gray-400">Item</th>
                        <th className="text-right p-3 text-gray-400">Current</th>
                        <th className="text-right p-3 text-gray-400">Predicted</th>
                        <th className="text-center p-3 text-gray-400">Confidence</th>
                        <th className="text-center p-3 text-gray-400">Variance</th>
                        <th className="text-center p-3 text-gray-400">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashFlowItems.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-800">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                item.type === 'income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }`}>
                                {item.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="font-semibold">{item.category}</div>
                                <div className="text-sm text-gray-400">{item.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-right font-mono">
                            <span className={item.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                              ${item.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3 text-right font-mono">
                            <span className={item.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                              ${(item.predictedAmount || item.amount).toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center">
                              <div className="w-12 h-12">
                                <CircularProgressbar
                                  value={item.confidence}
                                  text={`${item.confidence}%`}
                                  styles={buildStyles({
                                    textSize: '20px',
                                    pathColor: item.confidence > 85 ? '#10b981' : item.confidence > 70 ? '#f59e0b' : '#ef4444',
                                    textColor: '#ffffff',
                                    trailColor: 'rgba(255, 255, 255, 0.1)',
                                    pathTransitionDuration: 1,
                                  })}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`font-mono ${
                              (item.variance || 0) > 20 ? 'text-red-400' : 
                              (item.variance || 0) > 10 ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              ±{(item.variance || 0).toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-1 bg-gray-700 rounded-full text-xs capitalize">
                              {item.frequency || 'one-time'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
