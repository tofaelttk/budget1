'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Target,
  Zap,
  Brain,
  Shield,
  Sparkles,
  CheckCircle,
  ArrowUpDown,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  Line
} from 'recharts';
import Button from '@/components/ui/Button';

interface Portfolio {
  id: string;
  name: string;
  value: number;
  allocation: number;
  performance: number;
  risk: number;
  color: string;
  category: 'stocks' | 'bonds' | 'crypto' | 'reits' | 'commodities' | 'cash';
  expectedReturn: number;
  volatility: number;
  sharpeRatio: number;
}

interface OptimizationSuggestion {
  id: string;
  type: 'rebalance' | 'add' | 'reduce' | 'diversify';
  title: string;
  description: string;
  impact: number;
  confidence: number;
  expectedGain: number;
  riskReduction: number;
  fromAsset?: string;
  toAsset?: string;
  amount?: number;
}

interface RiskMetrics {
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  beta: number;
  alpha: number;
  informationRatio: number;
}

export default function SmartPortfolioOptimizer() {
  const [portfolios] = useState<Portfolio[]>([
    {
      id: '1',
      name: 'S&P 500 ETF',
      value: 25000,
      allocation: 40,
      performance: 12.5,
      risk: 65,
      color: '#10b981',
      category: 'stocks',
      expectedReturn: 10.2,
      volatility: 16.8,
      sharpeRatio: 0.61
    },
    {
      id: '2',
      name: 'Bond Index Fund',
      value: 15000,
      allocation: 25,
      performance: 4.2,
      risk: 25,
      color: '#3b82f6',
      category: 'bonds',
      expectedReturn: 4.5,
      volatility: 6.2,
      sharpeRatio: 0.73
    },
    {
      id: '3',
      name: 'Tech Growth ETF',
      value: 12000,
      allocation: 20,
      performance: 18.7,
      risk: 85,
      color: '#8b5cf6',
      category: 'stocks',
      expectedReturn: 14.8,
      volatility: 22.4,
      sharpeRatio: 0.66
    },
    {
      id: '4',
      name: 'REITs',
      value: 6000,
      allocation: 10,
      performance: 8.9,
      risk: 45,
      color: '#f59e0b',
      category: 'reits',
      expectedReturn: 8.2,
      volatility: 14.5,
      sharpeRatio: 0.57
    },
    {
      id: '5',
      name: 'Cryptocurrency',
      value: 3000,
      allocation: 5,
      performance: 45.2,
      risk: 95,
      color: '#ef4444',
      category: 'crypto',
      expectedReturn: 25.6,
      volatility: 65.8,
      sharpeRatio: 0.39
    }
  ]);

  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([
    {
      id: '1',
      type: 'rebalance',
      title: 'Rebalance Tech Exposure',
      description: 'Your tech allocation is 8% above optimal. Consider moving $2,400 to bonds for better risk-adjusted returns.',
      impact: 85,
      confidence: 92,
      expectedGain: 1.3,
      riskReduction: 12,
      fromAsset: 'Tech Growth ETF',
      toAsset: 'Bond Index Fund',
      amount: 2400
    },
    {
      id: '2',
      type: 'diversify',
      title: 'Add International Exposure',
      description: 'Adding 10% international stocks could reduce correlation risk and improve long-term returns.',
      impact: 78,
      confidence: 88,
      expectedGain: 2.1,
      riskReduction: 8,
      amount: 6100
    },
    {
      id: '3',
      type: 'reduce',
      title: 'Minimize Crypto Volatility',
      description: 'Current crypto allocation exceeds risk tolerance. Consider reducing to 3% for better stability.',
      impact: 65,
      confidence: 94,
      expectedGain: 0.8,
      riskReduction: 18,
      fromAsset: 'Cryptocurrency',
      amount: 1200
    }
  ]);

  const [showOptimization, setShowOptimization] = useState(false);
  const [riskTolerance, setRiskTolerance] = useState(65);
  const [optimizationRunning, setOptimizationRunning] = useState(false);

  const totalValue = portfolios.reduce((sum, p) => sum + p.value, 0);
  const weightedReturn = portfolios.reduce((sum, p) => sum + (p.expectedReturn * p.allocation / 100), 0);
  const weightedRisk = Math.sqrt(portfolios.reduce((sum, p) => sum + Math.pow(p.volatility * p.allocation / 100, 2), 0));

  const riskMetrics: RiskMetrics = {
    sharpeRatio: 0.68,
    maxDrawdown: -18.5,
    volatility: weightedRisk,
    beta: 0.92,
    alpha: 2.3,
    informationRatio: 0.45
  };

  // Efficient frontier data
  const efficientFrontier = [
    { risk: 8, return: 4.5, optimal: false },
    { risk: 12, return: 6.2, optimal: false },
    { risk: 16, return: 8.1, optimal: false },
    { risk: 20, return: 9.8, optimal: true },
    { risk: 24, return: 11.2, optimal: false },
    { risk: 28, return: 12.4, optimal: false },
    { risk: 32, return: 13.1, optimal: false }
  ];

  // Historical performance data
  const performanceData = [
    { month: 'Jan', current: 58500, optimal: 59200, benchmark: 58800 },
    { month: 'Feb', current: 59800, optimal: 61400, benchmark: 59500 },
    { month: 'Mar', current: 57200, optimal: 59800, benchmark: 57800 },
    { month: 'Apr', current: 60500, optimal: 62800, benchmark: 60200 },
    { month: 'May', current: 61000, optimal: 64200, benchmark: 61500 },
    { month: 'Jun', current: 61000, optimal: 64800, benchmark: 62100 }
  ];

  // Asset correlation matrix
  const correlationData = [
    { asset: 'Stocks', stocks: 1.00, bonds: -0.15, crypto: 0.25, reits: 0.65, commodities: 0.35 },
    { asset: 'Bonds', stocks: -0.15, bonds: 1.00, crypto: -0.08, reits: 0.12, commodities: 0.18 },
    { asset: 'Crypto', stocks: 0.25, bonds: -0.08, crypto: 1.00, reits: 0.15, commodities: 0.45 },
    { asset: 'REITs', stocks: 0.65, bonds: 0.12, crypto: 0.15, reits: 1.00, commodities: 0.28 },
    { asset: 'Commodities', stocks: 0.35, bonds: 0.18, crypto: 0.45, reits: 0.28, commodities: 1.00 }
  ];

  const runOptimization = async () => {
    setOptimizationRunning(true);
    // Simulate AI optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update suggestions based on risk tolerance
    const newSuggestions = suggestions.map(s => ({
      ...s,
      confidence: Math.min(100, s.confidence + Math.random() * 5),
      impact: Math.max(50, s.impact + (Math.random() - 0.5) * 10)
    }));
    
    setSuggestions(newSuggestions);
    setOptimizationRunning(false);
  };

  const applySuggestion = (suggestionId: string) => {
    setSuggestions(suggestions.filter(s => s.id !== suggestionId));
  };

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
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text">Smart Portfolio Optimizer</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-6">
            AI-powered portfolio analysis with advanced risk metrics, efficient frontier optimization, and personalized rebalancing recommendations
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Portfolio Value</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-blue-400 mb-2">{weightedReturn.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Expected Annual Return</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">{riskMetrics.sharpeRatio.toFixed(2)}</div>
              <div className="text-sm text-gray-400">Sharpe Ratio</div>
            </div>
            <div className="card text-center p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">{weightedRisk.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Portfolio Volatility</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risk Tolerance & Optimization Controls */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold gradient-text mb-4">AI Optimization Settings</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="font-semibold text-gray-300">Risk Tolerance</label>
                    <span className="text-xl font-bold text-purple-400">{riskTolerance}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={riskTolerance}
                    onChange={(e) => setRiskTolerance(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    aria-label="Risk Tolerance Slider"
                    title="Adjust your risk tolerance from conservative to aggressive"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                onClick={runOptimization}
                disabled={optimizationRunning}
                className="flex items-center gap-2 px-6 py-3"
              >
                {optimizationRunning ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                {optimizationRunning ? 'Optimizing...' : 'Run AI Optimization'}
              </Button>
              
              <Button
                variant="secondary"
                onClick={() => setShowOptimization(!showOptimization)}
                className="flex items-center gap-2 px-6 py-3"
              >
                {showOptimization ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                {showOptimization ? 'Hide Details' : 'Show Analysis'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Current Portfolio Allocation */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="text-xl font-bold gradient-text mb-6">Current Allocation</h3>
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={portfolios}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="allocation"
                    label={({ name, allocation }) => `${name}: ${allocation}%`}
                  >
                    {portfolios.map((entry, index) => (
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
            
            <div className="space-y-3">
              {portfolios.map((portfolio) => (
                <div key={portfolio.id} className="flex items-center justify-between p-3 glass rounded-xl">
                  <div className="flex items-center gap-3">
                                          <div
                        className="w-4 h-4 rounded-full bg-blue-500"
                        data-color={portfolio.color}
                      />
                    <div>
                      <div className="font-semibold">{portfolio.name}</div>
                      <div className="text-sm text-gray-400">${portfolio.value.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{portfolio.allocation}%</div>
                    <div className={`text-sm ${portfolio.performance > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {portfolio.performance > 0 ? '+' : ''}{portfolio.performance}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Risk Metrics Radar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-xl font-bold gradient-text mb-6">Risk Analysis</h3>
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { metric: 'Return', current: weightedReturn * 5, optimal: 65 },
                  { metric: 'Stability', current: (100 - weightedRisk) * 0.8, optimal: 75 },
                  { metric: 'Diversification', current: 78, optimal: 85 },
                  { metric: 'Liquidity', current: 85, optimal: 80 },
                  { metric: 'Tax Efficiency', current: 72, optimal: 90 },
                  { metric: 'Cost Efficiency', current: 88, optimal: 95 }
                ]}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={0} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Optimal"
                    dataKey="optimal"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 glass rounded-xl">
                <div className="text-lg font-bold text-blue-400">{riskMetrics.sharpeRatio}</div>
                <div className="text-sm text-gray-400">Sharpe Ratio</div>
              </div>
              <div className="text-center p-3 glass rounded-xl">
                <div className="text-lg font-bold text-red-400">{riskMetrics.maxDrawdown}%</div>
                <div className="text-sm text-gray-400">Max Drawdown</div>
              </div>
              <div className="text-center p-3 glass rounded-xl">
                <div className="text-lg font-bold text-purple-400">{riskMetrics.beta}</div>
                <div className="text-sm text-gray-400">Beta</div>
              </div>
              <div className="text-center p-3 glass rounded-xl">
                <div className="text-lg font-bold text-green-400">{riskMetrics.alpha}%</div>
                <div className="text-sm text-gray-400">Alpha</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Optimization Suggestions */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold gradient-text">AI Optimization Recommendations</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Powered by Machine Learning</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 glass rounded-xl hover:bg-white/10 transition-all border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    suggestion.type === 'rebalance' ? 'bg-blue-500/20 text-blue-400' :
                    suggestion.type === 'diversify' ? 'bg-green-500/20 text-green-400' :
                    suggestion.type === 'reduce' ? 'bg-red-500/20 text-red-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {suggestion.type === 'rebalance' && <ArrowUpDown className="w-5 h-5" />}
                    {suggestion.type === 'diversify' && <Target className="w-5 h-5" />}
                    {suggestion.type === 'reduce' && <Shield className="w-5 h-5" />}
                    {suggestion.type === 'add' && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold">{suggestion.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{suggestion.confidence}% confidence</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        suggestion.impact > 80 ? 'bg-green-500/20 text-green-400' :
                        suggestion.impact > 60 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {suggestion.impact > 80 ? 'High Impact' : suggestion.impact > 60 ? 'Medium Impact' : 'Low Impact'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed">{suggestion.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Expected Gain:</span>
                    <span className="text-green-400 font-semibold">+{suggestion.expectedGain}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Risk Reduction:</span>
                    <span className="text-blue-400 font-semibold">-{suggestion.riskReduction}%</span>
                  </div>
                  {suggestion.amount && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-purple-400 font-semibold">${suggestion.amount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSuggestions(suggestions.filter(s => s.id !== suggestion.id))}
                    className="flex-1"
                  >
                    Dismiss
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => applySuggestion(suggestion.id)}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Apply
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Analysis (Expandable) */}
      <AnimatePresence>
        {showOptimization && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="container"
          >
            <div className="space-y-8">
              {/* Efficient Frontier */}
              <div className="card">
                <h3 className="text-xl font-bold gradient-text mb-6">Efficient Frontier Analysis</h3>
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={efficientFrontier}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="risk" 
                        stroke="#9ca3af"
                        label={{ value: 'Risk (%)', position: 'insideBottom', offset: -10 }}
                      />
                      <YAxis 
                        dataKey="return" 
                        stroke="#9ca3af"
                        label={{ value: 'Return (%)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(17, 24, 39, 0.8)',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Scatter 
                        name="Efficient Frontier" 
                        dataKey="return" 
                        fill="#6366f1"
                      />
                      <Scatter 
                        name="Current Portfolio" 
                        data={[{ risk: weightedRisk, return: weightedReturn }]}
                        fill="#ef4444"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-gray-400 text-sm">
                  Your current portfolio (red dot) compared to the efficient frontier. Move closer to the blue line for optimal risk-return balance.
                </p>
              </div>

              {/* Performance Comparison */}
              <div className="card">
                <h3 className="text-xl font-bold gradient-text mb-6">Performance vs Optimal Portfolio</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
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
                        dataKey="optimal"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                        name="Optimal Portfolio"
                      />
                      <Area
                        type="monotone"
                        dataKey="current"
                        stackId="2"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.3}
                        name="Current Portfolio"
                      />
                      <Line
                        type="monotone"
                        dataKey="benchmark"
                        stroke="#f59e0b"
                        strokeDasharray="5 5"
                        name="S&P 500 Benchmark"
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Asset Correlation Matrix */}
              <div className="card">
                <h3 className="text-xl font-bold gradient-text mb-6">Asset Correlation Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-3 text-gray-400">Asset</th>
                        <th className="text-center p-3 text-gray-400">Stocks</th>
                        <th className="text-center p-3 text-gray-400">Bonds</th>
                        <th className="text-center p-3 text-gray-400">Crypto</th>
                        <th className="text-center p-3 text-gray-400">REITs</th>
                        <th className="text-center p-3 text-gray-400">Commodities</th>
                      </tr>
                    </thead>
                    <tbody>
                      {correlationData.map((row, index) => (
                        <tr key={index} className="border-t border-gray-700">
                          <td className="p-3 font-semibold">{row.asset}</td>
                          <td className={`text-center p-3 font-mono ${
                            Math.abs(row.stocks) > 0.7 ? 'text-red-400' :
                            Math.abs(row.stocks) > 0.3 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {row.stocks.toFixed(2)}
                          </td>
                          <td className={`text-center p-3 font-mono ${
                            Math.abs(row.bonds) > 0.7 ? 'text-red-400' :
                            Math.abs(row.bonds) > 0.3 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {row.bonds.toFixed(2)}
                          </td>
                          <td className={`text-center p-3 font-mono ${
                            Math.abs(row.crypto) > 0.7 ? 'text-red-400' :
                            Math.abs(row.crypto) > 0.3 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {row.crypto.toFixed(2)}
                          </td>
                          <td className={`text-center p-3 font-mono ${
                            Math.abs(row.reits) > 0.7 ? 'text-red-400' :
                            Math.abs(row.reits) > 0.3 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {row.reits.toFixed(2)}
                          </td>
                          <td className={`text-center p-3 font-mono ${
                            Math.abs(row.commodities) > 0.7 ? 'text-red-400' :
                            Math.abs(row.commodities) > 0.3 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {row.commodities.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  <span className="text-green-400">Green</span>: Low correlation (good diversification) | 
                  <span className="text-yellow-400 ml-2">Yellow</span>: Moderate correlation | 
                  <span className="text-red-400 ml-2">Red</span>: High correlation (concentration risk)
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
