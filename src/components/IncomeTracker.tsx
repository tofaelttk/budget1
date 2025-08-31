'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  DollarSign,
  Briefcase,
  PiggyBank,
  Target,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import CountUp from 'react-countup';

interface IncomeSource {
  id: string;
  name: string;
  type: 'salary' | 'freelance' | 'investment' | 'business' | 'other';
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  nextPayment: string;
  isActive: boolean;
  color: string;
}

interface IncomeRecord {
  id: string;
  sourceId: string;
  amount: number;
  date: string;
  description?: string;
}

export default function IncomeTracker() {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([
    {
      id: '1',
      name: 'Primary Job',
      type: 'salary',
      amount: 2600,
      frequency: 'biweekly',
      nextPayment: '2024-02-02',
      isActive: true,
      color: '#10b981'
    },
    {
      id: '2',
      name: 'Freelance Projects',
      type: 'freelance',
      amount: 800,
      frequency: 'monthly',
      nextPayment: '2024-02-05',
      isActive: true,
      color: '#f59e0b'
    },
    {
      id: '3',
      name: 'Investment Returns',
      type: 'investment',
      amount: 150,
      frequency: 'monthly',
      nextPayment: '2024-02-01',
      isActive: true,
      color: '#6366f1'
    }
  ]);

  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([
    { id: '1', sourceId: '1', amount: 2600, date: '2024-01-19', description: 'Biweekly salary' },
    { id: '2', sourceId: '2', amount: 450, date: '2024-01-15', description: 'Website project' },
    { id: '3', sourceId: '1', amount: 2600, date: '2024-01-05', description: 'Biweekly salary' },
    { id: '4', sourceId: '3', amount: 150, date: '2024-01-01', description: 'Dividend payment' },
  ]);

  const [showAddSource, setShowAddSource] = useState(false);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const [newSource, setNewSource] = useState<Partial<IncomeSource>>({
    name: '',
    type: 'salary',
    amount: 0,
    frequency: 'monthly',
    nextPayment: '',
    isActive: true,
    color: '#10b981'
  });

  const [newRecord, setNewRecord] = useState<Partial<IncomeRecord>>({
    sourceId: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const incomeTypes = [
    { value: 'salary', label: 'Salary', icon: Briefcase, color: '#10b981' },
    { value: 'freelance', label: 'Freelance', icon: PiggyBank, color: '#f59e0b' },
    { value: 'investment', label: 'Investment', icon: TrendingUp, color: '#6366f1' },
    { value: 'business', label: 'Business', icon: Target, color: '#ef4444' },
    { value: 'other', label: 'Other', icon: DollarSign, color: '#8b5cf6' }
  ];

  const colors = ['#10b981', '#f59e0b', '#6366f1', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Calculate monthly income from all sources
  const calculateMonthlyIncome = () => {
    return incomeSources.reduce((total, source) => {
      if (!source.isActive) return total;
      
      switch (source.frequency) {
        case 'weekly':
          return total + (source.amount * 4.33);
        case 'biweekly':
          return total + (source.amount * 2.17);
        case 'monthly':
          return total + source.amount;
        case 'yearly':
          return total + (source.amount / 12);
        default:
          return total;
      }
    }, 0);
  };

  // Generate chart data for the last 6 months
  const generateChartData = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      // Calculate income for this month (mock data for demo)
      const baseIncome = calculateMonthlyIncome();
      const variance = (Math.random() - 0.5) * 0.3; // ±15% variance
      const monthlyIncome = baseIncome * (1 + variance);
      
      months.push({
        month: monthName,
        income: Math.round(monthlyIncome),
        target: baseIncome
      });
    }
    
    return months;
  };

  const addIncomeSource = () => {
    if (newSource.name && newSource.amount && newSource.nextPayment) {
      const source: IncomeSource = {
        id: Date.now().toString(),
        name: newSource.name,
        type: newSource.type || 'other',
        amount: newSource.amount,
        frequency: newSource.frequency || 'monthly',
        nextPayment: newSource.nextPayment,
        isActive: true,
        color: colors[incomeSources.length % colors.length]
      };
      setIncomeSources([...incomeSources, source]);
      setNewSource({
        name: '',
        type: 'salary',
        amount: 0,
        frequency: 'monthly',
        nextPayment: '',
        isActive: true,
        color: '#10b981'
      });
      setShowAddSource(false);
    }
  };

  const addIncomeRecord = () => {
    if (newRecord.sourceId && newRecord.amount && newRecord.date) {
      const record: IncomeRecord = {
        id: Date.now().toString(),
        sourceId: newRecord.sourceId,
        amount: newRecord.amount,
        date: newRecord.date,
        description: newRecord.description || ''
      };
      setIncomeRecords([...incomeRecords, record]);
      setNewRecord({
        sourceId: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setShowAddRecord(false);
    }
  };

  const deleteSource = (id: string) => {
    setIncomeSources(incomeSources.filter(source => source.id !== id));
    setIncomeRecords(incomeRecords.filter(record => record.sourceId !== id));
  };

  const toggleSourceStatus = (id: string) => {
    setIncomeSources(incomeSources.map(source => 
      source.id === id ? { ...source, isActive: !source.isActive } : source
    ));
  };

  const monthlyIncome = calculateMonthlyIncome();
  const yearlyIncome = monthlyIncome * 12;
  const chartData = generateChartData();
  
  // Calculate this month's actual income
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthIncome = incomeRecords
    .filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    })
    .reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Income Tracker</h2>
          <p className="text-gray-400">Track and manage all your income sources</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            onClick={() => setShowAddRecord(true)}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Income</span>
          </motion.button>
          <motion.button
            onClick={() => setShowAddSource(true)}
            className="btn-primary star-border flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Source</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Income Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-gray-400 text-sm mb-2">This Month</h3>
          <div className="text-2xl font-bold">
            $<CountUp end={thisMonthIncome} duration={2} separator="," />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-gray-400 text-sm mb-2">Monthly Average</h3>
          <div className="text-2xl font-bold">
            $<CountUp end={monthlyIncome} duration={2} separator="," />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-gray-400 text-sm mb-2">Yearly Projection</h3>
          <div className="text-2xl font-bold">
            $<CountUp end={yearlyIncome} duration={2} separator="," />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <CheckCircle className="w-5 h-5 text-orange-400" />
          </div>
          <h3 className="text-gray-400 text-sm mb-2">Active Sources</h3>
          <div className="text-2xl font-bold">
            {incomeSources.filter(source => source.isActive).length}
          </div>
        </motion.div>
      </div>

      {/* Income Chart */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card hover-lift"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold gradient-text">Income Trends</h3>
          <div className="flex space-x-2">
            {['month', 'quarter', 'year'].map((period) => (
              <motion.button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#6366f1" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Income Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources List */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card hover-lift"
        >
          <h3 className="text-xl font-bold gradient-text mb-4">Income Sources</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {incomeSources.map((source, index) => {
                const typeInfo = incomeTypes.find(t => t.value === source.type);
                const Icon = typeInfo?.icon || DollarSign;
                const daysUntilNext = Math.ceil((new Date(source.nextPayment).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 glass rounded-xl hover:bg-white/10 transition-all ${
                      source.isActive ? '' : 'opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${source.color}20`, color: source.color }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{source.name}</h4>
                          <p className="text-sm text-gray-400">
                            ${source.amount} • {source.frequency}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => toggleSourceStatus(source.id)}
                          className={`p-2 rounded-lg transition-all ${
                            source.isActive 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={() => deleteSource(source.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                    {source.isActive && (
                      <div className="mt-3 text-sm text-gray-400">
                        Next payment: {daysUntilNext > 0 ? `${daysUntilNext} days` : 'Overdue'}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Recent Income Records */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card hover-lift"
        >
          <h3 className="text-xl font-bold gradient-text mb-4">Recent Income</h3>
          <div className="space-y-3">
            {incomeRecords.slice(0, 6).map((record, index) => {
              const source = incomeSources.find(s => s.id === record.sourceId);
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: source?.color || '#6b7280' }}
                    />
                    <div>
                      <p className="font-semibold">{source?.name || 'Unknown Source'}</p>
                      <p className="text-sm text-gray-400">
                        {record.description} • {new Date(record.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-green-400 font-bold">
                    +${record.amount.toLocaleString()}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Add Source Modal */}
      <AnimatePresence>
        {showAddSource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddSource(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">Add Income Source</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Source Name</label>
                  <input
                    type="text"
                    value={newSource.name}
                    onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="e.g., Primary Job"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Type</label>
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource({ ...newSource, type: e.target.value as any })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    {incomeTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Amount</label>
                    <input
                      type="number"
                      value={newSource.amount}
                      onChange={(e) => setNewSource({ ...newSource, amount: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Frequency</label>
                    <select
                      value={newSource.frequency}
                      onChange={(e) => setNewSource({ ...newSource, frequency: e.target.value as any })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Biweekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Next Payment Date</label>
                  <input
                    type="date"
                    value={newSource.nextPayment}
                    onChange={(e) => setNewSource({ ...newSource, nextPayment: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <motion.button
                  onClick={() => setShowAddSource(false)}
                  className="flex-1 p-3 glass rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={addIncomeSource}
                  className="flex-1 btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Source
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Record Modal */}
      <AnimatePresence>
        {showAddRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddRecord(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">Add Income Record</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Income Source</label>
                  <select
                    value={newRecord.sourceId}
                    onChange={(e) => setNewRecord({ ...newRecord, sourceId: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Select a source</option>
                    {incomeSources.filter(source => source.isActive).map(source => (
                      <option key={source.id} value={source.id}>{source.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Amount</label>
                    <input
                      type="number"
                      value={newRecord.amount}
                      onChange={(e) => setNewRecord({ ...newRecord, amount: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date</label>
                    <input
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description (Optional)</label>
                  <input
                    type="text"
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="e.g., Biweekly salary"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <motion.button
                  onClick={() => setShowAddRecord(false)}
                  className="flex-1 p-3 glass rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={addIncomeRecord}
                  className="flex-1 btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Income
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
