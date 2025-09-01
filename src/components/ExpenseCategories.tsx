'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Home, 
  Car, 
  Utensils, 
  Film, 
  Heart, 
  GraduationCap,
  Plane,
  Plus, 
  Edit3, 
  Trash2, 
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  PieChart,
  BarChart3,
  Save,
  X
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface ExpenseCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  budget: number;
  spent: number;
  isFixed: boolean;
  description?: string;
}

interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'yearly';
}

export default function ExpenseCategories() {
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    {
      id: '1',
      name: 'College Tuition',
      icon: GraduationCap,
      color: '#6366f1',
      budget: 2500,
      spent: 2500,
      isFixed: true,
      description: 'Semester tuition and fees'
    },
    {
      id: '2',
      name: 'Family Support',
      icon: Heart,
      color: '#ec4899',
      budget: 600,
      spent: 520,
      isFixed: true,
      description: 'Weekly family assistance'
    },
    {
      id: '3',
      name: 'Housing',
      icon: Home,
      color: '#10b981',
      budget: 1200,
      spent: 1200,
      isFixed: true,
      description: 'Rent and utilities'
    },
    {
      id: '4',
      name: 'Food & Dining',
      icon: Utensils,
      color: '#f59e0b',
      budget: 400,
      spent: 385,
      isFixed: false,
      description: 'Groceries and restaurants'
    },
    {
      id: '5',
      name: 'Transportation',
      icon: Car,
      color: '#ef4444',
      budget: 300,
      spent: 245,
      isFixed: false,
      description: 'Gas, public transit, car maintenance'
    },
    {
      id: '6',
      name: 'Entertainment',
      icon: Film,
      color: '#8b5cf6',
      budget: 200,
      spent: 150,
      isFixed: false,
      description: 'Movies, subscriptions, hobbies'
    },
    {
      id: '7',
      name: 'Shopping',
      icon: ShoppingCart,
      color: '#06b6d4',
      budget: 300,
      spent: 280,
      isFixed: false,
      description: 'Clothing, electronics, miscellaneous'
    }
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', categoryId: '1', amount: 2500, description: 'Fall Semester Tuition', date: '2024-01-15', isRecurring: true, recurringFrequency: 'monthly' },
    { id: '2', categoryId: '2', amount: 130, description: 'Weekly Family Support', date: '2024-01-20', isRecurring: true, recurringFrequency: 'weekly' },
    { id: '3', categoryId: '3', amount: 1200, description: 'Monthly Rent', date: '2024-01-01', isRecurring: true, recurringFrequency: 'monthly' },
    { id: '4', categoryId: '4', amount: 85, description: 'Grocery Shopping', date: '2024-01-18', isRecurring: false },
    { id: '5', categoryId: '5', amount: 45, description: 'Gas Fill-up', date: '2024-01-17', isRecurring: false },
    { id: '6', categoryId: '6', amount: 15.99, description: 'Netflix Subscription', date: '2024-01-15', isRecurring: true, recurringFrequency: 'monthly' },
  ]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<ExpenseCategory>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'chart'>('grid');

  const [newCategory, setNewCategory] = useState<Partial<ExpenseCategory>>({
    name: '',
    icon: ShoppingCart,
    color: '#6366f1',
    budget: undefined,
    spent: 0,
    isFixed: false,
    description: ''
  });

  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    categoryId: '',
    amount: undefined,
    description: '',
    date: new Date().toISOString().split('T')[0],
    isRecurring: false,
    recurringFrequency: 'monthly'
  });

  const categoryIcons = [
    { icon: ShoppingCart, name: 'Shopping' },
    { icon: Home, name: 'Home' },
    { icon: Car, name: 'Transport' },
    { icon: Utensils, name: 'Food' },
    { icon: Film, name: 'Entertainment' },
    { icon: Heart, name: 'Health' },
    { icon: GraduationCap, name: 'Education' },
    { icon: Plane, name: 'Travel' }
  ];

  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

  const addCategory = () => {
    if (newCategory.name && newCategory.budget) {
      const category: ExpenseCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        icon: newCategory.icon || ShoppingCart,
        color: newCategory.color || colors[categories.length % colors.length],
        budget: newCategory.budget,
        spent: 0,
        isFixed: newCategory.isFixed || false,
        description: newCategory.description || ''
      };
      setCategories([...categories, category]);
      setNewCategory({
        name: '',
        icon: ShoppingCart,
        color: '#6366f1',
        budget: 0,
        spent: 0,
        isFixed: false,
        description: ''
      });
      setShowAddCategory(false);
    }
  };

  const updateCategory = (id: string, updates: Partial<ExpenseCategory>) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
    setEditingCategory(null);
    setEditFormData({});
  };

  const saveEditedCategory = () => {
    if (editingCategory && editFormData.name && editFormData.budget) {
      updateCategory(editingCategory, editFormData);
    }
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    setExpenses(expenses.filter(exp => exp.categoryId !== id));
  };

  const addExpense = () => {
    if (newExpense.categoryId && newExpense.amount && newExpense.description) {
      const expense: Expense = {
        id: Date.now().toString(),
        categoryId: newExpense.categoryId,
        amount: newExpense.amount,
        description: newExpense.description,
        date: newExpense.date || new Date().toISOString().split('T')[0],
        isRecurring: newExpense.isRecurring || false,
        recurringFrequency: newExpense.recurringFrequency || 'monthly'
      };
      
      setExpenses([...expenses, expense]);
      
      // Update category spent amount
      const category = categories.find(cat => cat.id === expense.categoryId);
      if (category) {
        updateCategory(category.id, { spent: category.spent + expense.amount });
      }
      
      setNewExpense({
        categoryId: '',
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0],
        isRecurring: false,
        recurringFrequency: 'monthly'
      });
      setShowAddExpense(false);
    }
  };

  const deleteExpense = (expenseId: string) => {
    const expense = expenses.find(exp => exp.id === expenseId);
    if (expense) {
      const category = categories.find(cat => cat.id === expense.categoryId);
      if (category) {
        updateCategory(category.id, { spent: Math.max(0, category.spent - expense.amount) });
      }
      setExpenses(expenses.filter(exp => exp.id !== expenseId));
    }
  };

  // Calculate totals
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudget - totalSpent;

  // Prepare chart data
  const chartData = categories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
    budget: cat.budget,
    percentage: ((cat.spent / cat.budget) * 100).toFixed(1)
  }));

  const monthlyTrendData = [
    { month: 'Aug', amount: 4200 },
    { month: 'Sep', amount: 4450 },
    { month: 'Oct', amount: 4100 },
    { month: 'Nov', amount: 4600 },
    { month: 'Dec', amount: 4300 },
    { month: 'Jan', amount: totalSpent }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="container section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">Expense Categories</h2>
            <p className="text-gray-400 text-lg">Track and manage your spending by category with detailed analytics</p>
          </div>
          <div className="flex items-center gap-4 mx-auto lg:mx-0">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <BarChart3 className="w-4 h-4" />
                Grid
              </Button>
              <Button
                variant={viewMode === 'chart' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('chart')}
              >
                <PieChart className="w-4 h-4" />
                Charts
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowAddExpense(true)}
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowAddCategory(true)}
            >
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <p className="text-sm text-gray-400">Total Budget</p>
              <p className="text-2xl font-bold">${totalBudget.toLocaleString()}</p>
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
            <div className="p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
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
            <div className={`p-3 rounded-xl bg-gradient-to-r ${
              remaining >= 0 ? 'from-green-500 to-emerald-600' : 'from-red-500 to-rose-600'
            }`}>
              {remaining >= 0 ? <CheckCircle className="w-6 h-6 text-white" /> : <AlertTriangle className="w-6 h-6 text-white" />}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Remaining</p>
              <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${Math.abs(remaining).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5 }}
          >
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  const percentage = (category.spent / category.budget) * 100;
                  const isOverBudget = category.spent > category.budget;
                  
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="card hover-lift group relative overflow-hidden"
                    >
                      {/* Category Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="p-3 rounded-xl"
                            style={{ backgroundColor: `${category.color}20`, color: category.color }}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{category.name}</h3>
                            <p className="text-xs text-gray-400">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            onClick={() => {
                              setEditingCategory(category.id);
                              setEditFormData(category);
                            }}
                            className="p-3 glass rounded-xl hover:bg-blue-500/20 border border-blue-500/30"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Edit3 className="w-4 h-4 text-blue-400" />
                          </motion.button>
                          <motion.button
                            onClick={() => deleteCategory(category.id)}
                            className="p-3 glass rounded-xl hover:bg-red-500/20 border border-red-500/30"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Budget vs Spent */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Spent</span>
                          <span className="font-bold">${category.spent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-400">Budget</span>
                          <span className="text-sm text-gray-400">${category.budget.toLocaleString()}</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="progress-bar mb-2">
                          <motion.div
                            className="progress-fill"
                            style={{ 
                              backgroundColor: isOverBudget ? '#ef4444' : category.color,
                              width: `${Math.min(percentage, 100)}%`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(percentage, 100)}%` }}
                            transition={{ duration: 1.5, delay: index * 0.2 }}
                          />
                        </div>
                        
                        <div className="flex justify-between text-xs">
                          <span className={`font-semibold ${
                            isOverBudget ? 'text-red-400' : 
                            percentage > 80 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {percentage.toFixed(1)}%
                          </span>
                          <span className="text-gray-400">
                            ${(category.budget - category.spent).toLocaleString()} left
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        isOverBudget ? 'bg-red-500/20 text-red-400' :
                        percentage > 80 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {isOverBudget ? (
                          <>
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Over Budget
                          </>
                        ) : percentage > 80 ? (
                          <>
                            <Calendar className="w-3 h-3 mr-1" />
                            Almost Full
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            On Track
                          </>
                        )}
                      </div>

                      {/* Fixed/Variable Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          category.isFixed 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {category.isFixed ? 'Fixed' : 'Variable'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chart"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Pie Chart */}
            <div className="card hover-lift">
              <h3 className="text-xl font-bold gradient-text mb-4">Spending Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {chartData.map((entry, index) => (
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

            {/* Monthly Trend */}
            <div className="card hover-lift">
              <h3 className="text-xl font-bold gradient-text mb-4">Monthly Spending Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrendData}>
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
                    <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Expenses */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card hover-lift"
      >
        <h3 className="text-xl font-bold gradient-text mb-4">Recent Expenses</h3>
        <div className="space-y-3">
          {expenses.slice(-8).reverse().map((expense, index) => {
            const category = categories.find(cat => cat.id === expense.categoryId);
            const Icon = category?.icon || DollarSign;
            
            return (
              <motion.div
                key={expense.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${category?.color}20`, color: category?.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{expense.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>{category?.name}</span>
                      <span>•</span>
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                      {expense.isRecurring && (
                        <>
                          <span>•</span>
                          <span className="text-blue-400">Recurring</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-red-400 font-bold">
                    -${expense.amount.toLocaleString()}
                  </div>
                  <motion.button
                    onClick={() => deleteExpense(expense.id)}
                    className="p-1 opacity-0 group-hover:opacity-100 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        title="Add New Category"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <Input
            label="Category Name"
            placeholder="e.g., Gym Membership"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            required
          />
          
          <Input
            label="Description"
            placeholder="Brief description of this category"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
          
          <Input
            label="Monthly Budget"
            type="number"
            placeholder="Enter budget amount"
            value={newCategory.budget}
            onChange={(e) => setNewCategory({ ...newCategory, budget: parseFloat(e.target.value) || undefined })}
            required
          />

          <div className="field">
            <label className="form-label">Icon</label>
            <div className="grid grid-cols-4 gap-3">
              {categoryIcons.map((iconOption, index) => {
                const IconComponent = iconOption.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setNewCategory({ ...newCategory, icon: iconOption.icon })}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      newCategory.icon === iconOption.icon
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 glass hover:border-gray-500'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-xs block">{iconOption.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="field">
            <label className="form-label">Color Theme</label>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setNewCategory({ ...newCategory, color })}
                  className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
                    newCategory.color === color ? 'border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isFixed"
              checked={newCategory.isFixed}
              onChange={(e) => setNewCategory({ ...newCategory, isFixed: e.target.checked })}
              className="w-5 h-5 text-purple-500 bg-transparent border-2 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="isFixed" className="text-sm font-semibold">
              Fixed Expense (same amount each month)
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="ghost"
            onClick={() => setShowAddCategory(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={addCategory}
            className="flex-1"
          >
            <Save className="w-4 h-4" />
            Add Category
          </Button>
        </div>
      </Modal>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {showAddExpense && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddExpense(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">Add New Expense</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={newExpense.categoryId}
                    onChange={(e) => setNewExpense({ ...newExpense, categoryId: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="50.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date</label>
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="e.g., Grocery shopping at Walmart"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={newExpense.isRecurring}
                    onChange={(e) => setNewExpense({ ...newExpense, isRecurring: e.target.checked })}
                    className="w-4 h-4 text-purple-500 bg-transparent border-gray-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="isRecurring" className="text-sm font-semibold">
                    Recurring Expense
                  </label>
                </div>
                {newExpense.isRecurring && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">Frequency</label>
                    <select
                      value={newExpense.recurringFrequency}
                      onChange={(e) => setNewExpense({ ...newExpense, recurringFrequency: e.target.value as any })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="flex space-x-3 mt-6">
                <motion.button
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 p-3 glass rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={addExpense}
                  className="flex-1 btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Expense
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Category Modal */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => {
          setEditingCategory(null);
          setEditFormData({});
        }}
        title="Edit Category"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <Input
            label="Category Name"
            placeholder="e.g., Gym Membership"
            value={editFormData.name || ''}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            required
          />
          
          <Input
            label="Description"
            placeholder="Brief description of this category"
            value={editFormData.description || ''}
            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
          />
          
          <Input
            label="Monthly Budget"
            type="number"
            placeholder="Enter budget amount"
            value={editFormData.budget}
            onChange={(e) => setEditFormData({ ...editFormData, budget: parseFloat(e.target.value) || undefined })}
            required
          />

          <div className="field">
            <label className="form-label">Icon</label>
            <div className="grid grid-cols-4 gap-3">
              {categoryIcons.map((iconOption, index) => {
                const IconComponent = iconOption.icon;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setEditFormData({ ...editFormData, icon: iconOption.icon })}
                    className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      editFormData.icon === iconOption.icon
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-gray-600 glass hover:border-gray-500'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-xs block">{iconOption.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="field">
            <label className="form-label">Color Theme</label>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setEditFormData({ ...editFormData, color })}
                  className={`w-10 h-10 rounded-full border-4 transition-all hover:scale-110 ${
                    editFormData.color === color ? 'border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="editIsFixed"
              checked={editFormData.isFixed || false}
              onChange={(e) => setEditFormData({ ...editFormData, isFixed: e.target.checked })}
              className="w-5 h-5 text-purple-500 bg-transparent border-2 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="editIsFixed" className="text-sm font-semibold">
              Fixed Expense (same amount each month)
            </label>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="ghost"
            onClick={() => {
              setEditingCategory(null);
              setEditFormData({});
            }}
            className="flex-1"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={saveEditedCategory}
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
