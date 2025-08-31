'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  DollarSign,
  PiggyBank,
  Home,
  Car,
  Plane,
  GraduationCap,
  Heart,
  Trophy,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Zap,
  Star
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import CountUp from 'react-countup';
import confetti from 'canvas-confetti';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'emergency' | 'vacation' | 'house' | 'car' | 'education' | 'debt' | 'investment' | 'other';
  priority: 'high' | 'medium' | 'low';
  color: string;
  icon: React.ComponentType<any>;
  isCompleted: boolean;
  completedDate?: string;
  monthlyContribution: number;
}

interface Contribution {
  id: string;
  goalId: string;
  amount: number;
  date: string;
  description?: string;
}

export default function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      description: '6 months of expenses for financial security',
      targetAmount: 15000,
      currentAmount: 8500,
      targetDate: '2024-12-31',
      category: 'emergency',
      priority: 'high',
      color: '#10b981',
      icon: PiggyBank,
      isCompleted: false,
      monthlyContribution: 500
    },
    {
      id: '2',
      title: 'Dream Vacation',
      description: 'Two weeks in Europe with family',
      targetAmount: 8000,
      currentAmount: 3200,
      targetDate: '2024-08-15',
      category: 'vacation',
      priority: 'medium',
      color: '#f59e0b',
      icon: Plane,
      isCompleted: false,
      monthlyContribution: 400
    },
    {
      id: '3',
      title: 'New Car Down Payment',
      description: 'Save for reliable transportation',
      targetAmount: 5000,
      currentAmount: 2800,
      targetDate: '2024-06-30',
      category: 'car',
      priority: 'medium',
      color: '#ef4444',
      icon: Car,
      isCompleted: false,
      monthlyContribution: 300
    },
    {
      id: '4',
      title: 'Master\'s Degree',
      description: 'Graduate school tuition and expenses',
      targetAmount: 25000,
      currentAmount: 5000,
      targetDate: '2025-09-01',
      category: 'education',
      priority: 'high',
      color: '#6366f1',
      icon: GraduationCap,
      isCompleted: false,
      monthlyContribution: 800
    }
  ]);

  const [contributions, setContributions] = useState<Contribution[]>([
    { id: '1', goalId: '1', amount: 500, date: '2024-01-15', description: 'Monthly emergency fund contribution' },
    { id: '2', goalId: '2', amount: 400, date: '2024-01-15', description: 'Vacation savings' },
    { id: '3', goalId: '1', amount: 200, date: '2024-01-10', description: 'Bonus allocation' },
    { id: '4', goalId: '3', amount: 300, date: '2024-01-05', description: 'Car fund monthly' },
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddContribution, setShowAddContribution] = useState(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'progress' | 'deadline'>('priority');

  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    targetAmount: 0,
    currentAmount: 0,
    targetDate: '',
    category: 'other',
    priority: 'medium',
    monthlyContribution: 0
  });

  const [newContribution, setNewContribution] = useState<Partial<Contribution>>({
    goalId: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const goalCategories = [
    { value: 'emergency', label: 'Emergency Fund', icon: PiggyBank, color: '#10b981' },
    { value: 'vacation', label: 'Vacation', icon: Plane, color: '#f59e0b' },
    { value: 'house', label: 'House', icon: Home, color: '#8b5cf6' },
    { value: 'car', label: 'Car', icon: Car, color: '#ef4444' },
    { value: 'education', label: 'Education', icon: GraduationCap, color: '#6366f1' },
    { value: 'debt', label: 'Debt Payoff', icon: Target, color: '#ec4899' },
    { value: 'investment', label: 'Investment', icon: TrendingUp, color: '#06b6d4' },
    { value: 'other', label: 'Other', icon: Star, color: '#84cc16' }
  ];

  const addGoal = () => {
    if (newGoal.title && newGoal.targetAmount && newGoal.targetDate) {
      const categoryInfo = goalCategories.find(cat => cat.value === newGoal.category);
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description || '',
        targetAmount: newGoal.targetAmount,
        currentAmount: newGoal.currentAmount || 0,
        targetDate: newGoal.targetDate,
        category: newGoal.category as any || 'other',
        priority: newGoal.priority || 'medium',
        color: categoryInfo?.color || '#84cc16',
        icon: categoryInfo?.icon || Star,
        isCompleted: false,
        monthlyContribution: newGoal.monthlyContribution || 0
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        description: '',
        targetAmount: 0,
        currentAmount: 0,
        targetDate: '',
        category: 'other',
        priority: 'medium',
        monthlyContribution: 0
      });
      setShowAddGoal(false);
    }
  };

  const addContribution = () => {
    if (newContribution.goalId && newContribution.amount) {
      const contribution: Contribution = {
        id: Date.now().toString(),
        goalId: newContribution.goalId,
        amount: newContribution.amount,
        date: newContribution.date || new Date().toISOString().split('T')[0],
        description: newContribution.description || ''
      };
      
      setContributions([...contributions, contribution]);
      
      // Update goal current amount
      setGoals(goals.map(goal => {
        if (goal.id === contribution.goalId) {
          const newCurrentAmount = goal.currentAmount + contribution.amount;
          const isNowCompleted = newCurrentAmount >= goal.targetAmount && !goal.isCompleted;
          
          if (isNowCompleted) {
            // Trigger celebration
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
          
          return {
            ...goal,
            currentAmount: newCurrentAmount,
            isCompleted: isNowCompleted || goal.isCompleted,
            completedDate: isNowCompleted ? new Date().toISOString().split('T')[0] : goal.completedDate
          };
        }
        return goal;
      }));
      
      setNewContribution({
        goalId: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setShowAddContribution(false);
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    setContributions(contributions.filter(contrib => contrib.goalId !== id));
  };

  const calculateDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateMonthsToGoal = (currentAmount: number, targetAmount: number, monthlyContribution: number) => {
    if (monthlyContribution <= 0) return Infinity;
    const remaining = targetAmount - currentAmount;
    return Math.ceil(remaining / monthlyContribution);
  };

  const sortedAndFilteredGoals = goals
    .filter(goal => filterCategory === 'all' || goal.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'progress':
          const progressA = (a.currentAmount / a.targetAmount) * 100;
          const progressB = (b.currentAmount / b.targetAmount) * 100;
          return progressB - progressA;
        case 'deadline':
          return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
        default:
          return 0;
      }
    });

  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const completedGoals = goals.filter(goal => goal.isCompleted).length;
  const totalProgress = (totalSaved / totalGoalAmount) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Goal Tracker</h2>
          <p className="text-gray-400">Track your financial goals and celebrate achievements</p>
        </div>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={() => setShowAddContribution(true)}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Contribution</span>
          </motion.button>
          <motion.button
            onClick={() => setShowAddGoal(true)}
            className="btn-primary star-border flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Goal</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Goals</p>
              <p className="text-2xl font-bold">${totalGoalAmount.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <PiggyBank className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Saved</p>
              <p className="text-2xl font-bold">
                $<CountUp end={totalSaved} duration={2} separator="," />
              </p>
            </div>
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
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold">{completedGoals} / {goals.length}</p>
            </div>
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
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Overall Progress</p>
              <p className="text-2xl font-bold">{totalProgress.toFixed(1)}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Sorting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Filter by Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {goalCategories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-2 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="priority">Priority</option>
              <option value="progress">Progress</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {sortedAndFilteredGoals.map((goal, index) => {
            const Icon = goal.icon;
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysRemaining = calculateDaysRemaining(goal.targetDate);
            const monthsToGoal = calculateMonthsToGoal(goal.currentAmount, goal.targetAmount, goal.monthlyContribution);
            const isOverdue = daysRemaining < 0;
            const isUrgent = daysRemaining <= 30 && daysRemaining > 0;
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`card hover-lift group relative overflow-hidden ${
                  goal.isCompleted ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {/* Priority Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    goal.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {goal.priority.toUpperCase()}
                  </span>
                </div>

                {/* Goal Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: `${goal.color}20`, color: goal.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{goal.title}</h3>
                      <p className="text-sm text-gray-400">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      onClick={() => setEditingGoal(goal.id)}
                      className="p-2 glass rounded-lg hover:bg-white/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-2 glass rounded-lg hover:bg-red-500/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-20 h-20">
                    <CircularProgressbar
                      value={Math.min(progress, 100)}
                      text={goal.isCompleted ? '✓' : `${progress.toFixed(0)}%`}
                      styles={buildStyles({
                        textSize: goal.isCompleted ? '32px' : '16px',
                        pathColor: goal.isCompleted ? '#10b981' : goal.color,
                        textColor: goal.isCompleted ? '#10b981' : '#ffffff',
                        trailColor: 'rgba(255, 255, 255, 0.1)',
                        pathTransitionDuration: 1.5,
                      })}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${goal.currentAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">of ${goal.targetAmount.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">
                      ${(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
                    </p>
                  </div>
                </div>

                {/* Timeline Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Target Date</span>
                    <span className="font-semibold">{new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monthly Contribution</span>
                    <span className="font-semibold">${goal.monthlyContribution}</span>
                  </div>
                  {!goal.isCompleted && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Est. Completion</span>
                      <span className="font-semibold">
                        {monthsToGoal === Infinity ? 'Never' : `${monthsToGoal} months`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  goal.isCompleted ? 'bg-green-500/20 text-green-400' :
                  isOverdue ? 'bg-red-500/20 text-red-400' :
                  isUrgent ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {goal.isCompleted ? (
                    <>
                      <Trophy className="w-3 h-3 mr-1" />
                      Completed!
                    </>
                  ) : isOverdue ? (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Overdue
                    </>
                  ) : isUrgent ? (
                    <>
                      <Clock className="w-3 h-3 mr-1" />
                      Due Soon
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      On Track
                    </>
                  )}
                </div>

                {goal.isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-green-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
                  >
                    <div className="text-center">
                      <Trophy className="w-12 h-12 text-green-400 mx-auto mb-2" />
                      <p className="text-green-400 font-bold">Goal Achieved!</p>
                      {goal.completedDate && (
                        <p className="text-sm text-gray-400">
                          Completed on {new Date(goal.completedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Recent Contributions */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card hover-lift"
      >
        <h3 className="text-xl font-bold gradient-text mb-4">Recent Contributions</h3>
        <div className="space-y-3">
          {contributions.slice(-6).reverse().map((contribution, index) => {
            const goal = goals.find(g => g.id === contribution.goalId);
            const Icon = goal?.icon || DollarSign;
            
            return (
              <motion.div
                key={contribution.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${goal?.color}20`, color: goal?.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{goal?.title || 'Unknown Goal'}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{contribution.description}</span>
                      <span>•</span>
                      <span>{new Date(contribution.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-green-400 font-bold">
                  +${contribution.amount.toLocaleString()}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showAddGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddGoal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">Add New Goal</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Goal Title</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="e.g., Emergency Fund"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none h-20 resize-none"
                    placeholder="Brief description of your goal"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Target Amount</label>
                    <input
                      type="number"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="10000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Current Amount</label>
                    <input
                      type="number"
                      value={newGoal.currentAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, currentAmount: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Target Date</label>
                    <input
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Monthly Contribution</label>
                    <input
                      type="number"
                      value={newGoal.monthlyContribution}
                      onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    {goalCategories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as any })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <motion.button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 p-3 glass rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={addGoal}
                  className="flex-1 btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Goal
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Contribution Modal */}
      <AnimatePresence>
        {showAddContribution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddContribution(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">Add Contribution</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Goal</label>
                  <select
                    value={newContribution.goalId}
                    onChange={(e) => setNewContribution({ ...newContribution, goalId: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Choose a goal</option>
                    {goals.filter(goal => !goal.isCompleted).map(goal => (
                      <option key={goal.id} value={goal.id}>{goal.title}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newContribution.amount}
                      onChange={(e) => setNewContribution({ ...newContribution, amount: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="500.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date</label>
                    <input
                      type="date"
                      value={newContribution.date}
                      onChange={(e) => setNewContribution({ ...newContribution, date: e.target.value })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description (Optional)</label>
                  <input
                    type="text"
                    value={newContribution.description}
                    onChange={(e) => setNewContribution({ ...newContribution, description: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="e.g., Monthly savings contribution"
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <motion.button
                  onClick={() => setShowAddContribution(false)}
                  className="flex-1 p-3 glass rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={addContribution}
                  className="flex-1 btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Contribution
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
