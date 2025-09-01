'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Zap,
  Star,
  Shield,
  PiggyBank,
  CreditCard,
  DollarSign,
  Calendar,
  BarChart3,
  Eye,
  Sparkles,
  Cpu,
  Award,
  ArrowRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Button from '@/components/ui/Button';

interface AIInsight {
  id: string;
  type: 'prediction' | 'recommendation' | 'alert' | 'achievement' | 'trend';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionable: boolean;
  icon: React.ComponentType<any>;
  color: string;
  data?: any[];
  timeframe: string;
}

interface FinancialPrediction {
  month: string;
  predictedIncome: number;
  predictedExpenses: number;
  predictedSavings: number;
  confidence: number;
}

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'prediction',
      title: 'Income Growth Forecast',
      description: 'Based on your current trends, your income is likely to increase by 12% over the next 6 months due to consistent freelance growth.',
      confidence: 87,
      impact: 'high',
      category: 'Income',
      actionable: true,
      icon: TrendingUp,
      color: '#10b981',
      timeframe: '6 months'
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'Optimize Credit Card Strategy',
      description: 'Switch to debt avalanche method and pay off American Express first. This could save you $1,247 in interest over 18 months.',
      confidence: 94,
      impact: 'high',
      category: 'Debt Management',
      actionable: true,
      icon: CreditCard,
      color: '#ef4444',
      timeframe: '18 months'
    },
    {
      id: '3',
      type: 'alert',
      title: 'Emergency Fund Below Target',
      description: 'Your emergency fund covers only 2.8 months of expenses. Experts recommend 6 months. Consider increasing monthly contributions.',
      confidence: 100,
      impact: 'high',
      category: 'Emergency Planning',
      actionable: true,
      icon: Shield,
      color: '#f59e0b',
      timeframe: 'Immediate'
    },
    {
      id: '4',
      type: 'trend',
      title: 'Spending Pattern Analysis',
      description: 'Your entertainment spending increases by 23% during weekends. Consider setting weekend-specific budgets.',
      confidence: 82,
      impact: 'medium',
      category: 'Spending Behavior',
      actionable: true,
      icon: BarChart3,
      color: '#6366f1',
      timeframe: 'Ongoing'
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Savings Rate Milestone',
      description: 'Congratulations! You\'ve maintained a 20%+ savings rate for 3 consecutive months. You\'re in the top 15% of savers.',
      confidence: 100,
      impact: 'medium',
      category: 'Achievement',
      actionable: false,
      icon: Award,
      color: '#8b5cf6',
      timeframe: 'Current'
    },
    {
      id: '6',
      type: 'prediction',
      title: 'Goal Achievement Forecast',
      description: 'At your current savings rate, you\'ll reach your vacation goal 2 months ahead of schedule. Consider allocating excess to emergency fund.',
      confidence: 91,
      impact: 'medium',
      category: 'Goal Planning',
      actionable: true,
      icon: Target,
      color: '#06b6d4',
      timeframe: '4 months'
    }
  ]);

  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);
  const [showPredictions, setShowPredictions] = useState(false);

  // Mock prediction data
  const predictions: FinancialPrediction[] = [
    { month: 'Feb', predictedIncome: 5400, predictedExpenses: 4200, predictedSavings: 1200, confidence: 87 },
    { month: 'Mar', predictedIncome: 5600, predictedExpenses: 4300, predictedSavings: 1300, confidence: 84 },
    { month: 'Apr', predictedIncome: 5800, predictedExpenses: 4400, predictedSavings: 1400, confidence: 81 },
    { month: 'May', predictedIncome: 6000, predictedExpenses: 4500, predictedSavings: 1500, confidence: 78 },
    { month: 'Jun', predictedIncome: 6200, predictedExpenses: 4600, predictedSavings: 1600, confidence: 75 },
    { month: 'Jul', predictedIncome: 6400, predictedExpenses: 4700, predictedSavings: 1700, confidence: 72 }
  ];

  const financialHealthMetrics = [
    { metric: 'Spending Control', value: 85, fullMark: 100 },
    { metric: 'Savings Rate', value: 92, fullMark: 100 },
    { metric: 'Debt Management', value: 78, fullMark: 100 },
    { metric: 'Emergency Fund', value: 65, fullMark: 100 },
    { metric: 'Investment Growth', value: 70, fullMark: 100 },
    { metric: 'Goal Progress', value: 88, fullMark: 100 }
  ];

  const implementInsight = (id: string) => {
    setInsights(insights.map(insight => 
      insight.id === id ? { ...insight, actionable: false } : insight
    ));
  };

  const dismissInsight = (id: string) => {
    setInsights(insights.filter(insight => insight.id !== id));
  };

  const highImpactInsights = insights.filter(i => i.impact === 'high' && i.actionable);
  const averageConfidence = insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="container section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text">AI Financial Insights</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Powered by advanced machine learning to provide personalized financial guidance
          </p>
        </motion.div>
      </div>

      {/* AI Summary Stats */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl w-12 h-12 mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Active Insights</h3>
            <div className="text-3xl font-bold text-blue-400">{insights.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl w-12 h-12 mx-auto mb-4">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">AI Confidence</h3>
            <div className="text-3xl font-bold text-purple-400">{averageConfidence.toFixed(0)}%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl w-12 h-12 mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">High Priority</h3>
            <div className="text-3xl font-bold text-red-400">{highImpactInsights.length}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl w-12 h-12 mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Implemented</h3>
            <div className="text-3xl font-bold text-green-400">
              {insights.filter(i => !i.actionable).length}
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Insights Grid */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Insights List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text mb-6">Personalized Insights</h3>
            <AnimatePresence>
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="card hover-lift group cursor-pointer"
                    onClick={() => setSelectedInsight(insight.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="p-3 rounded-xl flex-shrink-0"
                        style={{ backgroundColor: `${insight.color}20`, color: insight.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg">{insight.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            insight.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                            insight.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {insight.impact.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                            {insight.confidence}% confident
                          </span>
                        </div>
                        <p className="text-gray-400 mb-4">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{insight.timeframe}</span>
                          </div>
                          {insight.actionable && (
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissInsight(insight.id);
                                }}
                              >
                                Dismiss
                              </Button>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  implementInsight(insight.id);
                                }}
                              >
                                <Zap className="w-4 h-4" />
                                Implement
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Financial Health Radar */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold gradient-text mb-6">AI Financial Health Analysis</h3>
            <div className="card hover-lift">
              <div className="h-80">
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
                      name="Current Score"
                      dataKey="value"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.3}
                      strokeWidth={3}
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
              <div className="text-center mt-4">
                <div className="text-3xl font-bold gradient-text mb-2">
                  Overall Score: {Math.round(financialHealthMetrics.reduce((sum, m) => sum + m.value, 0) / financialHealthMetrics.length)}/100
                </div>
                <p className="text-gray-400">AI-powered financial wellness assessment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Predictions */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card hover-lift"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold gradient-text">6-Month Financial Predictions</h3>
            <Button
              variant={showPredictions ? 'primary' : 'secondary'}
              onClick={() => setShowPredictions(!showPredictions)}
            >
              <Eye className="w-4 h-4" />
              {showPredictions ? 'Hide Details' : 'Show Predictions'}
            </Button>
          </div>

          <AnimatePresence>
            {showPredictions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={predictions}>
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
                        dataKey="predictedIncome" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Predicted Income"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predictedExpenses" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Predicted Expenses"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predictedSavings" 
                        stroke="#6366f1" 
                        strokeWidth={4}
                        name="Predicted Savings"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {predictions.slice(0, 3).map((prediction, index) => (
                    <div key={prediction.month} className="p-4 glass rounded-xl">
                      <h4 className="font-semibold mb-2">{prediction.month} 2024 Forecast</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Income:</span>
                          <span className="text-green-400 font-semibold">${prediction.predictedIncome.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Expenses:</span>
                          <span className="text-red-400 font-semibold">${prediction.predictedExpenses.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Savings:</span>
                          <span className="text-blue-400 font-semibold">${prediction.predictedSavings.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Confidence:</span>
                          <span className="text-purple-400 font-semibold">{prediction.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Smart Recommendations */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card hover-lift"
        >
          <h3 className="text-2xl font-bold gradient-text mb-6">Smart Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 glass rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <PiggyBank className="w-6 h-6 text-green-400" />
                <h4 className="font-semibold">Savings Optimization</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Increase your savings rate by 3% by reducing entertainment spending on weekdays.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <ArrowRight className="w-4 h-4" />
                <span>Potential savings: $156/month</span>
              </div>
            </div>

            <div className="p-6 glass rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-orange-400" />
                <h4 className="font-semibold">Debt Acceleration</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Pay an extra $100/month on your highest interest card to save $2,400 in interest.
              </p>
              <div className="flex items-center gap-2 text-sm text-orange-400">
                <ArrowRight className="w-4 h-4" />
                <span>Payoff 14 months sooner</span>
              </div>
            </div>

            <div className="p-6 glass rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-400" />
                <h4 className="font-semibold">Goal Optimization</h4>
              </div>
              <p className="text-gray-400 mb-4">
                Adjust your vacation fund timeline to prioritize emergency fund completion first.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <ArrowRight className="w-4 h-4" />
                <span>Better financial security</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Insight Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInsight(null)}
          >
            {(() => {
              const insight = insights.find(i => i.id === selectedInsight);
              if (!insight) return null;
              
              const Icon = insight.icon;
              
              return (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="card max-w-2xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: `${insight.color}20`, color: insight.color }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{insight.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          insight.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                          insight.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {insight.impact.toUpperCase()} IMPACT
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                          {insight.confidence}% CONFIDENCE
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">AI Analysis</h4>
                      <p className="text-gray-400 leading-relaxed">{insight.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Category</h4>
                        <p className="text-gray-400">{insight.category}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Timeline</h4>
                        <p className="text-gray-400">{insight.timeframe}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        <h4 className="font-semibold text-yellow-400">AI Recommendation</h4>
                      </div>
                      <p className="text-gray-300">
                        Our AI suggests implementing this insight to improve your financial health score by an estimated 8-12 points.
                      </p>
                    </div>
                  </div>

                  {insight.actionable && (
                    <div className="flex gap-3 mt-8">
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedInsight(null)}
                        className="flex-1"
                      >
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          implementInsight(insight.id);
                          setSelectedInsight(null);
                        }}
                        className="flex-1"
                      >
                        <Sparkles className="w-4 h-4" />
                        Implement Now
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
