'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  TrendingDown, 
  Clock, 
  Target,
  PiggyBank,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface DebtCalculation {
  monthsToPayoff: number;
  totalInterest: number;
  totalAmount: number;
  monthlyPayment: number;
  paymentSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

interface DebtComparison {
  scenario: string;
  monthsToPayoff: number;
  totalInterest: number;
  monthlySavings: number;
}

export default function DebtCalculator() {
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [interestRate, setInterestRate] = useState<number | undefined>(undefined);
  const [monthlyPayment, setMonthlyPayment] = useState<number | undefined>(undefined);
  const [calculationType, setCalculationType] = useState<'payoff' | 'payment' | 'comparison'>('payoff');
  const [result, setResult] = useState<DebtCalculation | null>(null);
  const [comparisons, setComparisons] = useState<DebtComparison[]>([]);

  const calculateDebtPayoff = () => {
    if (!balance || !interestRate || !monthlyPayment) return;

    const monthlyRate = interestRate / 100 / 12;
    let currentBalance = balance;
    const schedule = [];
    let month = 1;
    let totalInterest = 0;

    if (monthlyPayment <= currentBalance * monthlyRate) {
      // Payment too low to cover interest
      setResult({
        monthsToPayoff: Infinity,
        totalInterest: Infinity,
        totalAmount: Infinity,
        monthlyPayment,
        paymentSchedule: []
      });
      return;
    }

    while (currentBalance > 0 && month <= 600) { // Max 50 years
      const interestPayment = currentBalance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment;
      
      if (principalPayment > currentBalance) {
        principalPayment = currentBalance;
      }
      
      currentBalance -= principalPayment;
      totalInterest += interestPayment;
      
      schedule.push({
        month,
        payment: interestPayment + principalPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, currentBalance)
      });
      
      month++;
      
      if (currentBalance <= 0) break;
    }

    setResult({
      monthsToPayoff: month - 1,
      totalInterest,
      totalAmount: balance + totalInterest,
      monthlyPayment,
      paymentSchedule: schedule
    });
  };

  const calculateMinimumPayment = () => {
    if (!balance || !interestRate) return;

    const monthlyRate = interestRate / 100 / 12;
    const minimumPayment = balance * monthlyRate + (balance * 0.01); // 1% of balance + interest
    
    setMonthlyPayment(minimumPayment);
  };

  const compareStrategies = () => {
    if (!balance || !interestRate) return;

    const strategies = [
      { name: 'Minimum Only', payment: balance * 0.02 }, // 2% minimum
      { name: 'Minimum + $50', payment: (balance * 0.02) + 50 },
      { name: 'Minimum + $100', payment: (balance * 0.02) + 100 },
      { name: 'Minimum + $200', payment: (balance * 0.02) + 200 }
    ];

    const comparisons: DebtComparison[] = strategies.map(strategy => {
      const monthlyRate = interestRate / 100 / 12;
      let currentBalance = balance;
      let months = 0;
      let totalInterest = 0;

      while (currentBalance > 0 && months < 600) {
        const interestPayment = currentBalance * monthlyRate;
        const principalPayment = strategy.payment - interestPayment;
        
        if (principalPayment <= 0) break;
        
        currentBalance -= principalPayment;
        totalInterest += interestPayment;
        months++;
      }

      return {
        scenario: strategy.name,
        monthsToPayoff: months,
        totalInterest,
        monthlySavings: strategy.payment
      };
    });

    setComparisons(comparisons);
  };

  const chartData = result?.paymentSchedule.slice(0, 24).map(item => ({
    month: `Month ${item.month}`,
    principal: item.principal,
    interest: item.interest,
    balance: item.balance
  })) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="container section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">Debt Calculator</h2>
          <p className="text-gray-400 text-lg">Smart debt payoff strategies and payment planning</p>
        </motion.div>
      </div>

      {/* Calculator Type Selection */}
      <div className="container">
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={calculationType === 'payoff' ? 'primary' : 'ghost'}
            onClick={() => setCalculationType('payoff')}
          >
            <Clock className="w-4 h-4" />
            Payoff Calculator
          </Button>
          <Button
            variant={calculationType === 'payment' ? 'primary' : 'ghost'}
            onClick={() => setCalculationType('payment')}
          >
            <DollarSign className="w-4 h-4" />
            Payment Calculator
          </Button>
          <Button
            variant={calculationType === 'comparison' ? 'primary' : 'ghost'}
            onClick={() => setCalculationType('comparison')}
          >
            <BarChart3 className="w-4 h-4" />
            Strategy Comparison
          </Button>
        </div>
      </div>

      {/* Calculator Inputs */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card hover-lift">
            <h3 className="text-xl font-bold gradient-text mb-6">Debt Information</h3>
            <div className="space-y-6">
              <Input
                label="Current Balance"
                type="number"
                placeholder="Enter your debt balance"
                value={balance}
                onChange={(e) => setBalance(parseFloat(e.target.value) || undefined)}
                required
              />

              <Input
                label="Annual Interest Rate (%)"
                type="number"
                placeholder="e.g., 18.99"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || undefined)}
                required
              />

              {calculationType !== 'payment' && (
                <Input
                  label="Monthly Payment"
                  type="number"
                  placeholder="Enter your monthly payment"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(parseFloat(e.target.value) || undefined)}
                  required
                />
              )}

              <div className="flex gap-3">
                {calculationType === 'payment' && (
                  <Button
                    variant="secondary"
                    onClick={calculateMinimumPayment}
                    className="flex-1"
                  >
                    <Calculator className="w-4 h-4" />
                    Calculate Minimum
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={calculationType === 'comparison' ? compareStrategies : calculateDebtPayoff}
                  className="flex-1"
                >
                  <Zap className="w-4 h-4" />
                  Calculate
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="card hover-lift">
            <h3 className="text-xl font-bold gradient-text mb-6">Results</h3>
            
            {result && calculationType !== 'comparison' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 glass rounded-xl">
                    <div className="text-2xl font-bold text-blue-400 mb-1">
                      {result.monthsToPayoff === Infinity ? '∞' : result.monthsToPayoff}
                    </div>
                    <div className="text-sm text-gray-400">
                      {result.monthsToPayoff === Infinity ? 'Never' : 'Months to Payoff'}
                    </div>
                  </div>
                  <div className="text-center p-4 glass rounded-xl">
                    <div className="text-2xl font-bold text-red-400 mb-1">
                      ${result.totalInterest === Infinity ? '∞' : result.totalInterest.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Total Interest</div>
                  </div>
                </div>

                <div className="text-center p-4 glass rounded-xl">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    ${result.totalAmount === Infinity ? '∞' : result.totalAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Amount Paid</div>
                </div>

                {result.monthsToPayoff !== Infinity && (
                  <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-full">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Debt-free by {new Date(Date.now() + result.monthsToPayoff * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            )}

            {comparisons.length > 0 && calculationType === 'comparison' && (
              <div className="space-y-4">
                {comparisons.map((comparison, index) => (
                  <motion.div
                    key={comparison.scenario}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 glass rounded-xl"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{comparison.scenario}</h4>
                      <span className="text-sm text-gray-400">${comparison.monthlySavings.toFixed(0)}/month</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Payoff Time: </span>
                        <span className="font-semibold">{comparison.monthsToPayoff} months</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Total Interest: </span>
                        <span className="font-semibold">${comparison.totalInterest.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!result && comparisons.length === 0 && (
              <div className="text-center py-8">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Enter your debt information and click Calculate to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Schedule Chart */}
      {result && result.paymentSchedule.length > 0 && (
        <div className="container">
          <div className="card hover-lift">
            <h3 className="text-xl font-bold gradient-text mb-6">Payment Schedule (First 24 Months)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
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
                  <Bar dataKey="principal" stackId="a" fill="#10b981" name="Principal" />
                  <Bar dataKey="interest" stackId="a" fill="#ef4444" name="Interest" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Balance Reduction Chart */}
      {result && result.paymentSchedule.length > 0 && (
        <div className="container">
          <div className="card hover-lift">
            <h3 className="text-xl font-bold gradient-text mb-6">Balance Reduction Over Time</h3>
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
                    dataKey="balance" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card hover-lift"
        >
          <h3 className="text-xl font-bold gradient-text mb-6">Debt Payoff Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 glass rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingDown className="w-6 h-6 text-red-400" />
                <h4 className="font-semibold">Debt Avalanche</h4>
              </div>
              <p className="text-sm text-gray-400">
                Pay minimums on all debts, then put extra money toward the highest interest rate debt first.
              </p>
            </div>

            <div className="p-4 glass rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <Target className="w-6 h-6 text-blue-400" />
                <h4 className="font-semibold">Debt Snowball</h4>
              </div>
              <p className="text-sm text-gray-400">
                Pay minimums on all debts, then put extra money toward the smallest balance first for psychological wins.
              </p>
            </div>

            <div className="p-4 glass rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <PiggyBank className="w-6 h-6 text-green-400" />
                <h4 className="font-semibold">Extra Payments</h4>
              </div>
              <p className="text-sm text-gray-400">
                Even an extra $50 per month can save thousands in interest and years of payments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
