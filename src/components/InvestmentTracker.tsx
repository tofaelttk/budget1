'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart as LineChartIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  PieChart,
  BarChart3,
  Zap,
  Shield,
  Award,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Eye,
  Wallet,
  Save,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, ComposedChart, Bar } from 'recharts';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';

interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'etf' | 'mutual_fund' | 'crypto' | 'real_estate' | 'other';
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercentage: number;
  dividendYield?: number;
  lastUpdated: string;
  color: string;
}

interface Portfolio {
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercentage: number;
  diversificationScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function InvestmentTracker() {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: '1',
      name: 'Apple Inc.',
      type: 'stocks',
      symbol: 'AAPL',
      shares: 25,
      avgCost: 150.00,
      currentPrice: 175.50,
      totalValue: 4387.50,
      gainLoss: 637.50,
      gainLossPercentage: 17.0,
      dividendYield: 0.5,
      lastUpdated: '2024-01-31',
      color: '#10b981'
    },
    {
      id: '2',
      name: 'S&P 500 ETF',
      type: 'etf',
      symbol: 'SPY',
      shares: 15,
      avgCost: 420.00,
      currentPrice: 445.25,
      totalValue: 6678.75,
      gainLoss: 378.75,
      gainLossPercentage: 6.0,
      dividendYield: 1.3,
      lastUpdated: '2024-01-31',
      color: '#6366f1'
    },
    {
      id: '3',
      name: 'Bitcoin',
      type: 'crypto',
      symbol: 'BTC',
      shares: 0.5,
      avgCost: 35000.00,
      currentPrice: 42500.00,
      totalValue: 21250.00,
      gainLoss: 3750.00,
      gainLossPercentage: 21.4,
      lastUpdated: '2024-01-31',
      color: '#f59e0b'
    },
    {
      id: '4',
      name: 'Vanguard Total Bond',
      type: 'bonds',
      symbol: 'BND',
      shares: 50,
      avgCost: 85.00,
      currentPrice: 82.75,
      totalValue: 4137.50,
      gainLoss: -112.50,
      gainLossPercentage: -2.6,
      dividendYield: 2.8,
      lastUpdated: '2024-01-31',
      color: '#ef4444'
    }
  ]);

  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Investment>>({});
  const [viewMode, setViewMode] = useState<'portfolio' | 'performance' | 'analysis'>('portfolio');

  const [newInvestment, setNewInvestment] = useState<Partial<Investment>>({
    name: '',
    type: 'stocks',
    symbol: '',
    shares: undefined,
    avgCost: undefined,
    currentPrice: undefined,
    dividendYield: undefined,
    color: '#10b981'
  });

  const investmentTypes = [
    { value: 'stocks', label: 'Individual Stocks', color: '#10b981' },
    { value: 'etf', label: 'ETFs', color: '#6366f1' },
    { value: 'mutual_fund', label: 'Mutual Funds', color: '#8b5cf6' },
    { value: 'bonds', label: 'Bonds', color: '#ef4444' },
    { value: 'crypto', label: 'Cryptocurrency', color: '#f59e0b' },
    { value: 'real_estate', label: 'Real Estate', color: '#06b6d4' },
    { value: 'other', label: 'Other', color: '#84cc16' }
  ];

  const colors = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

  // Calculate portfolio metrics
  const portfolio: Portfolio = {
    totalValue: investments.reduce((sum, inv) => sum + inv.totalValue, 0),
    totalGainLoss: investments.reduce((sum, inv) => sum + inv.gainLoss, 0),
    totalGainLossPercentage: 0,
    diversificationScore: 85,
    riskLevel: 'medium'
  };
  portfolio.totalGainLossPercentage = (portfolio.totalGainLoss / (portfolio.totalValue - portfolio.totalGainLoss)) * 100;

  const addInvestment = () => {
    if (newInvestment.name && newInvestment.symbol && newInvestment.shares && newInvestment.avgCost && newInvestment.currentPrice) {
      const totalValue = newInvestment.shares * newInvestment.currentPrice;
      const totalCost = newInvestment.shares * newInvestment.avgCost;
      const gainLoss = totalValue - totalCost;
      const gainLossPercentage = (gainLoss / totalCost) * 100;

      const investment: Investment = {
        id: Date.now().toString(),
        name: newInvestment.name,
        type: newInvestment.type || 'stocks',
        symbol: newInvestment.symbol.toUpperCase(),
        shares: newInvestment.shares,
        avgCost: newInvestment.avgCost,
        currentPrice: newInvestment.currentPrice,
        totalValue,
        gainLoss,
        gainLossPercentage,
        dividendYield: newInvestment.dividendYield,
        lastUpdated: new Date().toISOString().split('T')[0],
        color: colors[investments.length % colors.length]
      };
      
      setInvestments([...investments, investment]);
      setNewInvestment({
        name: '',
        type: 'stocks',
        symbol: '',
        shares: undefined,
        avgCost: undefined,
        currentPrice: undefined,
        dividendYield: undefined,
        color: '#10b981'
      });
      setShowAddInvestment(false);
    }
  };

  const updateInvestment = (id: string, updates: Partial<Investment>) => {
    setInvestments(investments.map(inv => 
      inv.id === id ? { ...inv, ...updates } : inv
    ));
    setEditingInvestment(null);
    setEditFormData({});
  };

  const saveEditedInvestment = () => {
    if (editingInvestment && editFormData.name && editFormData.shares && editFormData.avgCost && editFormData.currentPrice) {
      const totalValue = editFormData.shares * editFormData.currentPrice;
      const totalCost = editFormData.shares * editFormData.avgCost;
      const gainLoss = totalValue - totalCost;
      const gainLossPercentage = (gainLoss / totalCost) * 100;

      updateInvestment(editingInvestment, {
        ...editFormData,
        totalValue,
        gainLoss,
        gainLossPercentage,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }
  };

  const deleteInvestment = (id: string) => {
    setInvestments(investments.filter(inv => inv.id !== id));
  };

  // Mock performance data
  const performanceData = [
    { month: 'Aug', value: 28500, benchmark: 28000 },
    { month: 'Sep', value: 30200, benchmark: 29500 },
    { month: 'Oct', value: 29800, benchmark: 30100 },
    { month: 'Nov', value: 32100, benchmark: 31200 },
    { month: 'Dec', value: 34500, benchmark: 32800 },
    { month: 'Jan', value: portfolio.totalValue, benchmark: 35200 }
  ];

  const allocationData = investmentTypes.map(type => {
    const typeInvestments = investments.filter(inv => inv.type === type.value);
    const totalValue = typeInvestments.reduce((sum, inv) => sum + inv.totalValue, 0);
    const percentage = (totalValue / portfolio.totalValue) * 100;
    
    return {
      name: type.label,
      value: totalValue,
      percentage: percentage.toFixed(1),
      color: type.color
    };
  }).filter(item => item.value > 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="container section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">Investment Tracker</h2>
            <p className="text-gray-400 text-lg">Track your portfolio performance with real-time insights</p>
          </div>
          <div className="flex items-center gap-4 mx-auto lg:mx-0">
            <div className="btn-group">
              <Button
                variant={viewMode === 'portfolio' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('portfolio')}
              >
                <Wallet className="w-4 h-4" />
                Portfolio
              </Button>
              <Button
                variant={viewMode === 'performance' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('performance')}
              >
                <BarChart3 className="w-4 h-4" />
                Performance
              </Button>
              <Button
                variant={viewMode === 'analysis' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('analysis')}
              >
                <Eye className="w-4 h-4" />
                Analysis
              </Button>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowAddInvestment(true)}
            >
              <Plus className="w-4 h-4" />
              Add Investment
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Portfolio Summary */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl w-12 h-12 mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Portfolio Value</h3>
            <div className="text-3xl font-bold text-green-400">${portfolio.totalValue.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card hover-lift text-center"
          >
            <div className={`p-3 rounded-xl w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${
              portfolio.totalGainLoss >= 0 ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600'
            }`}>
              {portfolio.totalGainLoss >= 0 ? 
                <TrendingUp className="w-6 h-6 text-white" /> : 
                <TrendingDown className="w-6 h-6 text-white" />
              }
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Gain/Loss</h3>
            <div className={`text-3xl font-bold ${portfolio.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolio.totalGainLoss >= 0 ? '+' : ''}${portfolio.totalGainLoss.toLocaleString()}
            </div>
            <div className={`text-sm ${portfolio.totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {portfolio.totalGainLoss >= 0 ? '+' : ''}{portfolio.totalGainLossPercentage.toFixed(2)}%
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl w-12 h-12 mx-auto mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Diversification</h3>
            <div className="text-3xl font-bold text-purple-400">{portfolio.diversificationScore}/100</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card hover-lift text-center"
          >
            <div className={`p-3 rounded-xl w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${
              portfolio.riskLevel === 'low' ? 'from-green-500 to-emerald-600' :
              portfolio.riskLevel === 'medium' ? 'from-yellow-500 to-orange-600' :
              'from-red-500 to-rose-600'
            }`}>
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Risk Level</h3>
            <div className={`text-2xl font-bold ${
              portfolio.riskLevel === 'low' ? 'text-green-400' :
              portfolio.riskLevel === 'medium' ? 'text-yellow-400' :
              'text-red-400'
            }`}>
              {portfolio.riskLevel.toUpperCase()}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dynamic Content Based on View Mode */}
      <div className="container">
        <AnimatePresence mode="wait">
          {viewMode === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Holdings List */}
                <div className="lg:col-span-2 space-y-6">
                  <h3 className="text-2xl font-bold gradient-text">Current Holdings</h3>
                  <div className="space-y-4">
                    {investments.map((investment, index) => (
                      <motion.div
                        key={investment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card hover-lift group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white"
                              style={{ backgroundColor: investment.color }}
                            >
                              {investment.symbol.slice(0, 3)}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{investment.name}</h4>
                              <div className="flex items-center gap-3 text-sm text-gray-400">
                                <span>{investment.symbol}</span>
                                <span>•</span>
                                <span>{investment.shares} shares</span>
                                <span>•</span>
                                <span className="capitalize">{investment.type.replace('_', ' ')}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold">${investment.totalValue.toLocaleString()}</div>
                            <div className={`text-sm font-semibold ${
                              investment.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {investment.gainLoss >= 0 ? '+' : ''}${investment.gainLoss.toLocaleString()}
                              ({investment.gainLoss >= 0 ? '+' : ''}{investment.gainLossPercentage.toFixed(2)}%)
                            </div>
                            {investment.dividendYield && (
                              <div className="text-xs text-blue-400">
                                {investment.dividendYield}% dividend yield
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingInvestment(investment.id);
                                setEditFormData(investment);
                              }}
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deleteInvestment(investment.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Portfolio Allocation */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold gradient-text">Asset Allocation</h3>
                  <div className="card hover-lift">
                    <div className="h-64 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={allocationData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                          >
                            {allocationData.map((entry, index) => (
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
                      {allocationData.map((allocation) => (
                        <div key={allocation.name} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: allocation.color }}
                            />
                            <span className="text-sm">{allocation.name}</span>
                          </div>
                          <span className="text-sm font-semibold">{allocation.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="card hover-lift">
                <h3 className="text-2xl font-bold gradient-text mb-6">Portfolio Performance vs Benchmark</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={performanceData}>
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
                        dataKey="value" 
                        stroke="#6366f1" 
                        fill="url(#portfolioGradient)" 
                        strokeWidth={3}
                        name="Your Portfolio"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="S&P 500 Benchmark"
                      />
                      <defs>
                        <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card hover-lift">
                  <h3 className="text-xl font-bold gradient-text mb-4">Risk Analysis</h3>
                  <div className="space-y-4">
                    <div className="p-4 glass rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="font-semibold">Low Risk Assets</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400">
                        {((investments.filter(i => i.type === 'bonds').reduce((sum, i) => sum + i.totalValue, 0) / portfolio.totalValue) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-4 glass rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="w-5 h-5 text-yellow-400" />
                        <span className="font-semibold">Medium Risk Assets</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-400">
                        {((investments.filter(i => ['stocks', 'etf', 'mutual_fund'].includes(i.type)).reduce((sum, i) => sum + i.totalValue, 0) / portfolio.totalValue) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-4 glass rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="w-5 h-5 text-red-400" />
                        <span className="font-semibold">High Risk Assets</span>
                      </div>
                      <div className="text-2xl font-bold text-red-400">
                        {((investments.filter(i => i.type === 'crypto').reduce((sum, i) => sum + i.totalValue, 0) / portfolio.totalValue) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card hover-lift">
                  <h3 className="text-xl font-bold gradient-text mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 glass rounded-xl">
                      <span className="text-gray-400">Best Performer</span>
                      <div className="text-right">
                        <div className="font-semibold text-green-400">
                          {investments.sort((a, b) => b.gainLossPercentage - a.gainLossPercentage)[0]?.symbol}
                        </div>
                        <div className="text-sm text-green-400">
                          +{investments.sort((a, b) => b.gainLossPercentage - a.gainLossPercentage)[0]?.gainLossPercentage.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 glass rounded-xl">
                      <span className="text-gray-400">Worst Performer</span>
                      <div className="text-right">
                        <div className="font-semibold text-red-400">
                          {investments.sort((a, b) => a.gainLossPercentage - b.gainLossPercentage)[0]?.symbol}
                        </div>
                        <div className="text-sm text-red-400">
                          {investments.sort((a, b) => a.gainLossPercentage - b.gainLossPercentage)[0]?.gainLossPercentage.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 glass rounded-xl">
                      <span className="text-gray-400">Average Return</span>
                      <div className="text-right">
                        <div className="font-semibold text-blue-400">
                          {(investments.reduce((sum, i) => sum + i.gainLossPercentage, 0) / investments.length).toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Investment Modal */}
      <Modal
        isOpen={showAddInvestment}
        onClose={() => setShowAddInvestment(false)}
        title="Add New Investment"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Investment Name"
              placeholder="e.g., Apple Inc."
              value={newInvestment.name}
              onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
              required
            />
            <Input
              label="Symbol/Ticker"
              placeholder="e.g., AAPL"
              value={newInvestment.symbol}
              onChange={(e) => setNewInvestment({ ...newInvestment, symbol: e.target.value.toUpperCase() })}
              required
            />
          </div>

          <Select
            label="Investment Type"
            value={newInvestment.type || ''}
            onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value as any })}
            options={investmentTypes.map(type => ({ value: type.value, label: type.label }))}
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Shares/Units"
              type="number"
              placeholder="Enter quantity"
              value={newInvestment.shares}
              onChange={(e) => setNewInvestment({ ...newInvestment, shares: parseFloat(e.target.value) || undefined })}
              required
            />
            <Input
              label="Average Cost"
              type="number"
              placeholder="Cost per share"
              value={newInvestment.avgCost}
              onChange={(e) => setNewInvestment({ ...newInvestment, avgCost: parseFloat(e.target.value) || undefined })}
              required
            />
            <Input
              label="Current Price"
              type="number"
              placeholder="Current value"
              value={newInvestment.currentPrice}
              onChange={(e) => setNewInvestment({ ...newInvestment, currentPrice: parseFloat(e.target.value) || undefined })}
              required
            />
          </div>

          <Input
            label="Dividend Yield (%) - Optional"
            type="number"
            placeholder="e.g., 2.5"
            value={newInvestment.dividendYield}
            onChange={(e) => setNewInvestment({ ...newInvestment, dividendYield: parseFloat(e.target.value) || undefined })}
          />
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="ghost"
            onClick={() => setShowAddInvestment(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={addInvestment}
            className="flex-1"
          >
            <Save className="w-4 h-4" />
            Add Investment
          </Button>
        </div>
      </Modal>

      {/* Edit Investment Modal */}
      <Modal
        isOpen={!!editingInvestment}
        onClose={() => {
          setEditingInvestment(null);
          setEditFormData({});
        }}
        title="Edit Investment"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Investment Name"
              placeholder="e.g., Apple Inc."
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              required
            />
            <Input
              label="Symbol/Ticker"
              placeholder="e.g., AAPL"
              value={editFormData.symbol}
              onChange={(e) => setEditFormData({ ...editFormData, symbol: e.target.value.toUpperCase() })}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Shares/Units"
              type="number"
              placeholder="Enter quantity"
              value={editFormData.shares}
              onChange={(e) => setEditFormData({ ...editFormData, shares: parseFloat(e.target.value) || undefined })}
              required
            />
            <Input
              label="Average Cost"
              type="number"
              placeholder="Cost per share"
              value={editFormData.avgCost}
              onChange={(e) => setEditFormData({ ...editFormData, avgCost: parseFloat(e.target.value) || undefined })}
              required
            />
            <Input
              label="Current Price"
              type="number"
              placeholder="Current value"
              value={editFormData.currentPrice}
              onChange={(e) => setEditFormData({ ...editFormData, currentPrice: parseFloat(e.target.value) || undefined })}
              required
            />
          </div>

          <Input
            label="Dividend Yield (%) - Optional"
            type="number"
            placeholder="e.g., 2.5"
            value={editFormData.dividendYield}
            onChange={(e) => setEditFormData({ ...editFormData, dividendYield: parseFloat(e.target.value) || undefined })}
          />
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="ghost"
            onClick={() => {
              setEditingInvestment(null);
              setEditFormData({});
            }}
            className="flex-1"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={saveEditedInvestment}
            className="flex-1"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </Modal>
    </div>
  );
}
