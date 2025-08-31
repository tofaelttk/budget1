'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  DollarSign,
  Target,
  Calendar,
  Zap,
  Brain,
  X,
  ChevronRight,
  Star,
  Award,
  Shield,
  PiggyBank
} from 'lucide-react';

interface Suggestion {
  id: string;
  type: 'debt_payoff' | 'budget_optimization' | 'income_boost' | 'emergency_alert' | 'goal_acceleration' | 'tax_optimization';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  action: string;
  potentialSavings?: number;
  timeframe: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: React.ComponentType<any>;
  color: string;
  isImplemented: boolean;
}

export default function SmartSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'debt_payoff',
      title: 'Switch to Debt Avalanche Strategy',
      description: 'Pay off your American Express Gold card first (21.99% APR) to save $1,200 in interest over 2 years.',
      impact: 'high',
      category: 'Debt Management',
      action: 'Allocate extra payments to highest interest card',
      potentialSavings: 1200,
      timeframe: '2 years',
      difficulty: 'easy',
      icon: TrendingDown,
      color: '#ef4444',
      isImplemented: false
    },
    {
      id: '2',
      type: 'budget_optimization',
      title: 'Reduce Entertainment Spending',
      description: 'You\'ve spent 75% of your entertainment budget. Consider cutting back on streaming services or dining out.',
      impact: 'medium',
      category: 'Budget Control',
      action: 'Cancel unused subscriptions, cook more at home',
      potentialSavings: 150,
      timeframe: '1 month',
      difficulty: 'easy',
      icon: DollarSign,
      color: '#f59e0b',
      isImplemented: false
    },
    {
      id: '3',
      type: 'emergency_alert',
      title: 'Build Emergency Fund First',
      description: 'Your emergency fund covers only 2.5 months of expenses. Prioritize this before other goals.',
      impact: 'high',
      category: 'Financial Security',
      action: 'Increase emergency fund contribution to $600/month',
      timeframe: '6 months',
      difficulty: 'medium',
      icon: Shield,
      color: '#10b981',
      isImplemented: false
    },
    {
      id: '4',
      type: 'goal_acceleration',
      title: 'Accelerate Vacation Savings',
      description: 'You\'re behind on your vacation goal. Consider a side hustle or selling unused items.',
      impact: 'medium',
      category: 'Goal Achievement',
      action: 'Increase monthly contribution by $200',
      potentialSavings: 0,
      timeframe: '3 months',
      difficulty: 'medium',
      icon: Target,
      color: '#6366f1',
      isImplemented: false
    },
    {
      id: '5',
      type: 'income_boost',
      title: 'Optimize Freelance Rates',
      description: 'Your freelance income is 15% below market rate. Consider raising your prices.',
      impact: 'high',
      category: 'Income Growth',
      action: 'Research market rates and update pricing',
      potentialSavings: 2400,
      timeframe: '1 month',
      difficulty: 'medium',
      icon: TrendingUp,
      color: '#8b5cf6',
      isImplemented: false
    },
    {
      id: '6',
      type: 'tax_optimization',
      title: 'Maximize 401(k) Contributions',
      description: 'You\'re not maximizing employer match. Missing out on free money!',
      impact: 'high',
      category: 'Tax Strategy',
      action: 'Increase 401(k) contribution to get full match',
      potentialSavings: 1800,
      timeframe: 'Immediate',
      difficulty: 'easy',
      icon: PiggyBank,
      color: '#06b6d4',
      isImplemented: false
    }
  ]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [implementedCount, setImplementedCount] = useState(0);

  const implementSuggestion = (id: string) => {
    setSuggestions(suggestions.map(suggestion => 
      suggestion.id === id 
        ? { ...suggestion, isImplemented: true }
        : suggestion
    ));
    setImplementedCount(prev => prev + 1);
  };

  const dismissSuggestion = (id: string) => {
    setSuggestions(suggestions.filter(suggestion => suggestion.id !== id));
  };

  const activeSuggestions = suggestions.filter(s => !s.isImplemented);
  const totalPotentialSavings = activeSuggestions.reduce((sum, s) => sum + (s.potentialSavings || 0), 0);

  const getSuggestionsByImpact = (impact: 'high' | 'medium' | 'low') => {
    return activeSuggestions.filter(s => s.impact === impact);
  };

  const highImpactSuggestions = getSuggestionsByImpact('high');
  const mediumImpactSuggestions = getSuggestionsByImpact('medium');
  const lowImpactSuggestions = getSuggestionsByImpact('low');

  return (
    <>
      {/* Floating Suggestions Panel */}
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ 
          x: isExpanded ? 0 : 320, 
          opacity: 1 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 z-40"
      >
        <div className="glass rounded-2xl p-1 shadow-2xl border border-purple-500/30">
          {/* Toggle Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-10 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-l-xl flex items-center justify-center star-border"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.div>
          </motion.button>

          {/* Panel Header */}
          <div className="p-4 border-b border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold gradient-text">Smart Insights</h3>
                  <p className="text-xs text-gray-400">AI-powered suggestions</p>
                </div>
              </div>
              {!isExpanded && (
                <div className="text-right">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{activeSuggestions.length}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panel Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="w-80 max-h-96 overflow-y-auto"
              >
                {/* Summary Stats */}
                <div className="p-4 border-b border-gray-600">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-400">${totalPotentialSavings.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Potential Savings</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">{implementedCount}</p>
                      <p className="text-xs text-gray-400">Implemented</p>
                    </div>
                  </div>
                </div>

                {/* High Impact Suggestions */}
                {highImpactSuggestions.length > 0 && (
                  <div className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-semibold text-red-400">High Impact</span>
                    </div>
                    <div className="space-y-2">
                      {highImpactSuggestions.map((suggestion, index) => {
                        const Icon = suggestion.icon;
                        return (
                          <motion.div
                            key={suggestion.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-3 glass rounded-xl hover:bg-white/10 transition-all group cursor-pointer"
                            onClick={() => setSelectedSuggestion(suggestion.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-2 flex-1">
                                <div 
                                  className="p-1 rounded-lg mt-0.5"
                                  style={{ backgroundColor: `${suggestion.color}20`, color: suggestion.color }}
                                >
                                  <Icon className="w-3 h-3" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-semibold mb-1">{suggestion.title}</h4>
                                  <p className="text-xs text-gray-400 mb-2">{suggestion.description.replace("'", "&apos;")}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-green-400 font-semibold">
                                      {suggestion.potentialSavings ? `Save $${suggestion.potentialSavings}` : suggestion.action}
                                    </span>
                                    <span className="text-xs text-gray-500">{suggestion.timeframe}</span>
                                  </div>
                                </div>
                              </div>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissSuggestion(suggestion.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="w-3 h-3 text-red-400" />
                              </motion.button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Medium Impact Suggestions */}
                {mediumImpactSuggestions.length > 0 && (
                  <div className="p-4 border-t border-gray-600">
                    <div className="flex items-center space-x-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-semibold text-yellow-400">Medium Impact</span>
                    </div>
                    <div className="space-y-2">
                      {mediumImpactSuggestions.slice(0, 3).map((suggestion, index) => {
                        const Icon = suggestion.icon;
                        return (
                          <motion.div
                            key={suggestion.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-2 glass rounded-lg hover:bg-white/10 transition-all group cursor-pointer"
                            onClick={() => setSelectedSuggestion(suggestion.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="p-1 rounded"
                                  style={{ backgroundColor: `${suggestion.color}20`, color: suggestion.color }}
                                >
                                  <Icon className="w-3 h-3" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-semibold">{suggestion.title}</h4>
                                  <p className="text-xs text-gray-500">{suggestion.timeframe}</p>
                                </div>
                              </div>
                              <motion.button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissSuggestion(suggestion.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <X className="w-3 h-3 text-red-400" />
                              </motion.button>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="p-4 border-t border-gray-600">
                  <motion.button
                    onClick={() => {
                      // Implement all high-impact suggestions
                      highImpactSuggestions.forEach(suggestion => {
                        implementSuggestion(suggestion.id);
                      });
                    }}
                    className="w-full btn-primary text-sm py-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={highImpactSuggestions.length === 0}
                  >
                    {highImpactSuggestions.length > 0 
                      ? `Implement ${highImpactSuggestions.length} High Impact` 
                      : 'All Caught Up! 🎉'
                    }
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Detailed Suggestion Modal */}
      <AnimatePresence>
        {selectedSuggestion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSuggestion(null)}
          >
            {(() => {
              const suggestion = suggestions.find(s => s.id === selectedSuggestion);
              if (!suggestion) return null;
              
              const Icon = suggestion.icon;
              
              return (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="card max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${suggestion.color}20`, color: suggestion.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{suggestion.title}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          suggestion.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                          suggestion.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {suggestion.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setSelectedSuggestion(null)}
                      className="p-2 hover:bg-gray-500/20 rounded-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-gray-400 text-sm">{suggestion.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Category</h4>
                        <p className="text-gray-400 text-sm">{suggestion.category}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Timeframe</h4>
                        <p className="text-gray-400 text-sm">{suggestion.timeframe}</p>
                      </div>
                    </div>

                    {suggestion.potentialSavings && (
                      <div>
                        <h4 className="font-semibold mb-2">Potential Savings</h4>
                        <p className="text-green-400 text-xl font-bold">
                          ${suggestion.potentialSavings.toLocaleString()}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold mb-2">Recommended Action</h4>
                      <p className="text-gray-400 text-sm">{suggestion.action}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Difficulty Level</h4>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={`w-8 h-2 rounded-full ${
                              (suggestion.difficulty === 'easy' && level <= 1) ||
                              (suggestion.difficulty === 'medium' && level <= 2) ||
                              (suggestion.difficulty === 'hard' && level <= 3)
                                ? 'bg-purple-500'
                                : 'bg-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-400 ml-2">
                          {suggestion.difficulty.charAt(0).toUpperCase() + suggestion.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <motion.button
                      onClick={() => {
                        dismissSuggestion(suggestion.id);
                        setSelectedSuggestion(null);
                      }}
                      className="flex-1 p-3 glass rounded-xl hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Dismiss
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        implementSuggestion(suggestion.id);
                        setSelectedSuggestion(null);
                      }}
                      className="flex-1 btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Implement
                    </motion.button>
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Notification */}
      <AnimatePresence>
        {implementedCount > 0 && implementedCount % 3 === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-8 card max-w-sm z-50"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-yellow-400">Achievement Unlocked!</h4>
                <p className="text-sm text-gray-400">
                  You've implemented {implementedCount} suggestions! Keep it up! 🚀
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
