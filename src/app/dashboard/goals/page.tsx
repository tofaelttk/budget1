'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Plus, 
  TrendingUp, 
  Calendar,
  PiggyBank,
  Home,
  Car,
  GraduationCap,
  Plane,
  Heart,
  Trophy,
  Star,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { formatCurrency } from '@/lib/utils';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadialBarChart,
  RadialBar,
  LineChart,
  Line
} from 'recharts';

const mockGoalsData = {
  goals: [
    {
      id: '1',
      title: 'Emergency Fund',
      description: '6 months of expenses saved for emergencies',
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: '2024-12-31',
      category: 'emergency',
      priority: 'high',
      icon: PiggyBank,
      color: '#10b981',
      isCompleted: false,
    },
    {
      id: '2',
      title: 'House Down Payment',
      description: '20% down payment for dream home',
      targetAmount: 80000,
      currentAmount: 25000,
      targetDate: '2025-06-30',
      category: 'housing',
      priority: 'high',
      icon: Home,
      color: '#3b82f6',
      isCompleted: false,
    },
    {
      id: '3',
      title: 'New Car Fund',
      description: 'Save for reliable transportation',
      targetAmount: 25000,
      currentAmount: 12000,
      targetDate: '2024-08-15',
      category: 'transportation',
      priority: 'medium',
      icon: Car,
      color: '#f59e0b',
      isCompleted: false,
    },
    {
      id: '4',
      title: 'Education Fund',
      description: 'Masters degree tuition',
      targetAmount: 40000,
      currentAmount: 40000,
      targetDate: '2024-01-15',
      category: 'education',
      priority: 'high',
      icon: GraduationCap,
      color: '#8b5cf6',
      isCompleted: true,
    },
    {
      id: '5',
      title: 'Dream Vacation',
      description: 'European adventure trip',
      targetAmount: 8000,
      currentAmount: 3200,
      targetDate: '2024-07-01',
      category: 'travel',
      priority: 'low',
      icon: Plane,
      color: '#ec4899',
      isCompleted: false,
    },
  ],
  progressData: [
    { month: 'Jul', emergency: 6500, house: 18000, car: 8000, education: 35000 },
    { month: 'Aug', emergency: 7000, house: 20000, car: 9000, education: 37000 },
    { month: 'Sep', emergency: 7500, house: 22000, car: 10000, education: 39000 },
    { month: 'Oct', emergency: 8000, house: 23000, car: 11000, education: 40000 },
    { month: 'Nov', emergency: 8200, house: 24000, car: 11500, education: 40000 },
    { month: 'Dec', emergency: 8500, house: 25000, car: 12000, education: 40000 },
  ],
};

const priorityColors = {
  high: 'from-red-500 to-red-600',
  medium: 'from-orange-500 to-orange-600',
  low: 'from-green-500 to-green-600',
};

const categoryGradients = {
  emergency: 'from-green-500 to-emerald-600',
  housing: 'from-blue-500 to-cyan-600',
  transportation: 'from-orange-500 to-amber-600',
  education: 'from-purple-500 to-violet-600',
  travel: 'from-pink-500 to-rose-600',
  investment: 'from-indigo-500 to-blue-600',
};

export default function GoalsPage() {
  const [data, setData] = useState(mockGoalsData);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'goals' | 'progress' | 'achievements'>('goals');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const completedGoals = data.goals.filter(goal => goal.isCompleted).length;
  const totalGoalValue = data.goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = data.goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = (totalSaved / totalGoalValue) * 100;

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your financial goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-gradient-primary mb-4">
          Financial Goals
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Set, track, and achieve your financial milestones with smart goal management
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center mt-6">
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 flex space-x-2">
            {[
              { key: 'goals', label: 'Goals', icon: Target },
              { key: 'progress', label: 'Progress', icon: TrendingUp },
              { key: 'achievements', label: 'Achievements', icon: Trophy },
            ].map((view) => (
              <motion.button
                key={view.key}
                onClick={() => setActiveView(view.key as 'goals' | 'progress' | 'achievements')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeView === view.key
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <view.icon className="w-4 h-4 mr-2 inline" />
                {view.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          {
            title: 'Total Goals',
            value: data.goals.length.toString(),
            icon: Target,
            gradient: 'from-blue-500 to-cyan-600',
            description: 'Active goals'
          },
          {
            title: 'Completed',
            value: completedGoals.toString(),
            icon: CheckCircle,
            gradient: 'from-green-500 to-emerald-600',
            description: 'Goals achieved'
          },
          {
            title: 'Total Saved',
            value: formatCurrency(totalSaved),
            icon: PiggyBank,
            gradient: 'from-purple-500 to-violet-600',
            description: 'Across all goals'
          },
          {
            title: 'Overall Progress',
            value: `${overallProgress.toFixed(1)}%`,
            icon: TrendingUp,
            gradient: 'from-orange-500 to-amber-600',
            description: 'Average completion'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-premium hover-lift relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`}></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg animate-breathe`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <motion.p 
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeView === 'goals' && (
          <motion.div
            key="goals"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Add Goal Button */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button className="btn-primary px-8 py-4 text-lg hover-scale">
                <Plus className="w-5 h-5 mr-2" />
                Create New Goal
              </Button>
            </motion.div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.goals.map((goal, index) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const IconComponent = goal.icon;
                const gradient = categoryGradients[goal.category as keyof typeof categoryGradients] || 'from-gray-500 to-gray-700';
                const priorityGradient = priorityColors[goal.priority as keyof typeof priorityColors];
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, rotateX: 5, scale: 1.02 }}
                    className="group"
                    style={{ perspective: '1000px' }}
                  >
                    <Card className={`card-premium h-full relative overflow-hidden ${
                      goal.isCompleted ? 'ring-2 ring-green-400 shadow-glow-green' : ''
                    }`}>
                      {goal.isCompleted && (
                        <div className="absolute top-4 right-4 z-20">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500 }}
                            className="p-2 bg-green-500 rounded-full shadow-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-white" />
                          </motion.div>
                        </div>
                      )}

                      <div className={`bg-gradient-to-br ${gradient} text-white p-6 relative`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${priorityGradient} text-white`}>
                              {goal.priority} priority
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
                          <p className="text-sm opacity-90 mb-4">{goal.description}</p>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm opacity-80">Target</span>
                            <motion.span 
                              className="text-2xl font-bold"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                            >
                              {formatCurrency(goal.targetAmount)}
                            </motion.span>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        {/* Progress */}
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-gray-900 dark:text-white">Progress</span>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                              {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
                            </span>
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                              <motion.div
                                className={`h-4 rounded-full relative overflow-hidden ${
                                  goal.isCompleted 
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                                    : `bg-gradient-to-r ${gradient.replace('from-', 'from-').replace('to-', 'to-')}`
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 1.5, ease: 'easeOut' }}
                              >
                                <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                              </motion.div>
                            </div>
                            <motion.span 
                              className="absolute right-0 -top-6 text-sm font-bold text-gray-600 dark:text-gray-400"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 1.5 + index * 0.1 }}
                            >
                              {progress.toFixed(1)}%
                            </motion.span>
                          </div>
                        </div>

                        {/* Time Remaining */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm font-medium">Target Date</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {goal.targetDate}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                            disabled={goal.isCompleted}
                          >
                            {goal.isCompleted ? 'Completed!' : 'Add Funds'}
                          </Button>
                          <Button size="sm" variant="outline" className="hover-scale">
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeView === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Progress Chart */}
            <Card className="card-premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Goals Progress Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(Number(value)), 'Saved']}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none', 
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="emergency" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 6 }} />
                      <Line type="monotone" dataKey="house" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 6 }} />
                      <Line type="monotone" dataKey="car" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 6 }} />
                      <Line type="monotone" dataKey="education" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeView === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Achievement Celebration */}
            <Card className="card-premium bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
                <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  🎉 Congratulations!
                </h2>
                <p className="text-yellow-700 dark:text-yellow-300 mb-6">
                  You've completed {completedGoals} out of {data.goals.length} goals. Keep up the excellent work!
                </p>
                <div className="flex justify-center space-x-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + i * 0.1 }}
                    >
                      <Star className={`w-6 h-6 ${i < completedGoals ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Completed Goals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.goals.filter(goal => goal.isCompleted).map((goal, index) => {
                const IconComponent = goal.icon;
                const gradient = categoryGradients[goal.category as keyof typeof categoryGradients];
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="card-premium relative overflow-hidden">
                      <div className={`bg-gradient-to-br ${gradient} text-white p-6 relative`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-white/20 rounded-lg">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                              className="p-2 bg-green-500 rounded-full"
                            >
                              <CheckCircle className="w-5 h-5 text-white" />
                            </motion.div>
                          </div>
                          
                          <h3 className="text-lg font-bold mb-2">{goal.title}</h3>
                          <p className="text-sm opacity-90 mb-4">{goal.description}</p>
                          <p className="text-2xl font-bold">
                            {formatCurrency(goal.targetAmount)}
                          </p>
                          <p className="text-sm opacity-80">
                            Completed on {goal.targetDate}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
