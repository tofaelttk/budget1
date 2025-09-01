'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Target,
  PieChart,
  BarChart3,
  Eye,
  Mail,
  Share2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

interface ReportData {
  period: string;
  income: number;
  expenses: number;
  savings: number;
  netWorth: number;
  creditUtilization: number;
  goalProgress: number;
}

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('financial-summary');
  const [dateRange, setDateRange] = useState({
    start: '2024-01-01',
    end: '2024-01-31'
  });

  // Mock report data
  const reportData: ReportData[] = [
    { period: 'Jan 2024', income: 5200, expenses: 4180, savings: 1020, netWorth: 20870, creditUtilization: 32, goalProgress: 65 },
    { period: 'Dec 2023', income: 5800, expenses: 4500, savings: 1300, netWorth: 19850, creditUtilization: 35, goalProgress: 60 },
    { period: 'Nov 2023', income: 5600, expenses: 4200, savings: 1400, netWorth: 18550, creditUtilization: 28, goalProgress: 55 },
    { period: 'Oct 2023', income: 5100, expenses: 4300, savings: 800, netWorth: 17150, creditUtilization: 31, goalProgress: 50 },
    { period: 'Sep 2023', income: 5400, expenses: 4250, savings: 1150, netWorth: 16350, creditUtilization: 29, goalProgress: 45 },
    { period: 'Aug 2023', income: 5200, expenses: 4100, savings: 1100, netWorth: 15200, creditUtilization: 33, goalProgress: 40 }
  ];

  const expenseBreakdown = [
    { name: 'Housing', value: 1200, color: '#6366f1', percentage: 28.7 },
    { name: 'Food', value: 800, color: '#10b981', percentage: 19.1 },
    { name: 'Transportation', value: 450, color: '#f59e0b', percentage: 10.8 },
    { name: 'Entertainment', value: 350, color: '#ef4444', percentage: 8.4 },
    { name: 'Other', value: 1380, color: '#8b5cf6', percentage: 33.0 }
  ];

  const reportTypes = [
    { value: 'financial-summary', label: 'Financial Summary' },
    { value: 'income-report', label: 'Income Report' },
    { value: 'expense-report', label: 'Expense Report' },
    { value: 'debt-report', label: 'Debt Analysis' },
    { value: 'goal-progress', label: 'Goal Progress' },
    { value: 'net-worth', label: 'Net Worth Report' }
  ];

  const periodOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const generateReport = () => {
    // Simulate report generation
    console.log('Generating report:', selectedReport, selectedPeriod);
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Simulate export
    const data = {
      reportType: selectedReport,
      period: selectedPeriod,
      dateRange,
      data: reportData,
      generatedAt: new Date().toISOString()
    };
    
    const filename = `financial-report-${selectedReport}-${new Date().toISOString().split('T')[0]}.${format}`;
    console.log('Exporting report:', filename, data);
  };

  const emailReport = () => {
    console.log('Emailing report to user');
  };

  const currentReport = reportData[0];
  const previousReport = reportData[1];
  const incomeChange = ((currentReport.income - previousReport.income) / previousReport.income) * 100;
  const expenseChange = ((currentReport.expenses - previousReport.expenses) / previousReport.expenses) * 100;
  const savingsChange = ((currentReport.savings - previousReport.savings) / previousReport.savings) * 100;

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
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">Financial Reports</h2>
            <p className="text-gray-400 text-lg">Comprehensive financial analysis and insights</p>
          </div>
          <div className="flex items-center gap-4 mx-auto lg:mx-0">
            <Button
              variant="secondary"
              onClick={() => emailReport()}
            >
              <Mail className="w-4 h-4" />
              Email Report
            </Button>
            <Button
              variant="primary"
              onClick={generateReport}
            >
              <FileText className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Report Controls */}
      <div className="container">
        <div className="card hover-lift mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select
              label="Report Type"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              options={reportTypes}
            />

            <Select
              label="Time Period"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              options={periodOptions}
            />

            <div className="field">
              <label className="form-label">Export Options</label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => exportReport('pdf')}
                >
                  <Download className="w-4 h-4" />
                  PDF
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => exportReport('excel')}
                >
                  <Download className="w-4 h-4" />
                  Excel
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => exportReport('csv')}
                >
                  <Download className="w-4 h-4" />
                  CSV
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card hover-lift text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-lg font-semibold">Income Growth</h3>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-2">
              {incomeChange > 0 ? '+' : ''}{incomeChange.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-400">vs previous month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card hover-lift text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <TrendingDown className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold">Expense Change</h3>
            </div>
            <div className={`text-3xl font-bold mb-2 ${expenseChange > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {expenseChange > 0 ? '+' : ''}{expenseChange.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-400">vs previous month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card hover-lift text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-3">
              <PieChart className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-semibold">Savings Rate</h3>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {((currentReport.savings / currentReport.income) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-400">of total income</p>
          </motion.div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Financial Trend */}
          <div className="card hover-lift">
            <h3 className="text-xl font-bold gradient-text mb-4">6-Month Financial Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportData.reverse()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="period" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                  <Line type="monotone" dataKey="savings" stroke="#6366f1" strokeWidth={3} name="Savings" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="card hover-lift">
            <h3 className="text-xl font-bold gradient-text mb-4">Current Month Expenses</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
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
          </div>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card hover-lift"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold gradient-text">Monthly Performance Report</h3>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
                View Details
              </Button>
              <Button variant="secondary" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4 font-semibold">Period</th>
                  <th className="text-left py-3 px-4 font-semibold">Income</th>
                  <th className="text-left py-3 px-4 font-semibold">Expenses</th>
                  <th className="text-left py-3 px-4 font-semibold">Savings</th>
                  <th className="text-left py-3 px-4 font-semibold">Net Worth</th>
                  <th className="text-left py-3 px-4 font-semibold">Credit Util.</th>
                  <th className="text-left py-3 px-4 font-semibold">Goal Progress</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, index) => (
                  <motion.tr
                    key={row.period}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-700 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{row.period}</td>
                    <td className="py-4 px-4 text-green-400 font-semibold">${row.income.toLocaleString()}</td>
                    <td className="py-4 px-4 text-red-400 font-semibold">${row.expenses.toLocaleString()}</td>
                    <td className="py-4 px-4 text-blue-400 font-semibold">${row.savings.toLocaleString()}</td>
                    <td className="py-4 px-4 text-purple-400 font-semibold">${row.netWorth.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`font-semibold ${
                        row.creditUtilization > 70 ? 'text-red-400' : 
                        row.creditUtilization > 50 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {row.creditUtilization}%
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-700 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${row.goalProgress}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold">{row.goalProgress}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Report Insights */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card hover-lift"
        >
          <h3 className="text-xl font-bold gradient-text mb-6">Key Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 glass rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h4 className="font-semibold text-green-400">Positive Trends</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Income increased by {incomeChange.toFixed(1)}% this month</li>
                  <li>• Savings rate improved to {((currentReport.savings / currentReport.income) * 100).toFixed(1)}%</li>
                  <li>• Credit utilization decreased to {currentReport.creditUtilization}%</li>
                  <li>• Goal progress increased by {(currentReport.goalProgress - previousReport.goalProgress)}%</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 glass rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Target className="w-5 h-5 text-yellow-400" />
                  <h4 className="font-semibold text-yellow-400">Areas for Improvement</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Consider increasing emergency fund contributions</li>
                  <li>• Entertainment spending is above recommended 5%</li>
                  <li>• Debt payoff could be accelerated with extra payments</li>
                  <li>• Investment allocation is below target percentage</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <Eye className="w-5 h-5 text-purple-400" />
              <h4 className="font-semibold text-purple-400">Overall Financial Health</h4>
            </div>
            <p className="text-gray-300">
              Your financial health score is <span className="font-bold text-green-400">78/100</span>. 
              You're doing well with consistent savings and controlled spending. Focus on building your emergency fund 
              and consider increasing your investment contributions to reach the next level.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
