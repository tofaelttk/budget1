'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Plus, 
  Edit3, 
  Trash2, 
  Target, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Calendar,
  PieChart,
  BarChart3,
  Save,
  X,
  Calculator,
  Lightbulb
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  remaining: number;
  percentage: number;
  color: string;
  isEssential: boolean;
}

interface BudgetRule {
  id: string;
  name: string;
  description: string;
  percentage: number;
  category: string;
  isActive: boolean;
}

export default function BudgetPlanner() {
  const [monthlyIncome, setMonthlyIncome] = useState(5200);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([
    { id: '1', name: 'Housing', allocated: 1560, spent: 1200, remaining: 360, percentage: 30, color: '#6366f1', isEssential: true },
    { id: '2', name: 'Food', allocated: 520, spent: 385, remaining: 135, percentage: 10, color: '#10b981', isEssential: true },
    { id: '3', name: 'Transportation', allocated: 416, spent: 245, remaining: 171, percentage: 8, color: '#f59e0b', isEssential: true },
    { id: '4', name: 'Savings', allocated: 1040, spent: 800, remaining: 240, percentage: 20, color: '#8b5cf6', isEssential: false },
    { id: '5', name: 'Entertainment', allocated: 260, spent: 150, remaining: 110, percentage: 5, color: '#ef4444', isEssential: false },
    { id: '6', name: 'Shopping', allocated: 312, spent: 280, remaining: 32, percentage: 6, color: '#06b6d4', isEssential: false },
    { id: '7', name: 'Healthcare', allocated: 208, spent: 120, remaining: 88, percentage: 4, color: '#ec4899', isEssential: true },
    { id: '8', name: 'Emergency Fund', allocated: 520, spent: 400, remaining: 120, percentage: 10, color: '#84cc16', isEssential: false },
    { id: '9', name: 'Debt Payments', allocated: 364, spent: 350, remaining: 14, percentage: 7, color: '#f97316', isEssential: true }
  ]);

  const [budgetRules, setBudgetRules] = useState<BudgetRule[]>([
    { id: '1', name: '50/30/20 Rule', description: '50% needs, 30% wants, 20% savings', percentage: 100, category: 'balanced', isActive: true },
    { id: '2', name: 'Zero-Based Budget', description: 'Every dollar has a purpose', percentage: 100, category: 'detailed', isActive: false },
    { id: '3', name: 'Envelope Method', description: 'Cash allocation by category', percentage: 100, category: 'cash', isActive: false },
    { id: '4', name: 'Pay Yourself First', description: 'Save before spending', percentage: 100, category: 'savings', isActive: false }
  ]);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<BudgetCategory>>({});
  const [selectedRule, setSelectedRule] = useState('1');
  const [viewMode, setViewMode] = useState<'percentage' | 'dollar'>('percentage');

  const [newCategory, setNewCategory] = useState<Partial<BudgetCategory>>({
    name: '',
    allocated: undefined,
    percentage: undefined,
    color: '#6366f1',
    isEssential: false
  });

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = monthlyIncome - totalAllocated;
  const spendingEfficiency = ((totalSpent / totalAllocated) * 100).toFixed(1);

  const addCategory = () => {
    if (newCategory.name && (newCategory.allocated || newCategory.percentage)) {
      const allocated = newCategory.allocated || ((newCategory.percentage || 0) / 100) * monthlyIncome;
      const percentage = newCategory.percentage || ((newCategory.allocated || 0) / monthlyIncome) * 100;
      
      const category: BudgetCategory = {
        id: Date.now().toString(),
        name: newCategory.name,
        allocated,
        spent: 0,
        remaining: allocated,
        percentage,
        color: newCategory.color || '#6366f1',
        isEssential: newCategory.isEssential || false
      };
      
      setBudgetCategories([...budgetCategories, category]);
      setNewCategory({
        name: '',
        allocated: undefined,
        percentage: undefined,
        color: '#6366f1',
        isEssential: false
      });
      setShowAddCategory(false);
    }
  };

  const updateCategory = (id: string, updates: Partial<BudgetCategory>) => {
    setBudgetCategories(budgetCategories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
    setEditingCategory(null);
    setEditFormData({});
  };

  const saveEditedCategory = () => {
    if (editingCategory && editFormData.name && (editFormData.allocated || editFormData.percentage)) {
      const allocated = editFormData.allocated || ((editFormData.percentage || 0) / 100) * monthlyIncome;
      const percentage = editFormData.percentage || ((editFormData.allocated || 0) / monthlyIncome) * 100;
      
      updateCategory(editingCategory, {
        ...editFormData,
        allocated,
        percentage,
        remaining: allocated - (editFormData.spent || 0)
      });
    }
  };

  const deleteCategory = (id: string) => {
    setBudgetCategories(budgetCategories.filter(cat => cat.id !== id));
  };

  const applyBudgetRule = (ruleId: string) => {
    setBudgetRules(budgetRules.map(rule => ({
      ...rule,
      isActive: rule.id === ruleId
    })));
    
    // Apply the selected rule logic
    const rule = budgetRules.find(r => r.id === ruleId);
    if (rule?.name === '50/30/20 Rule') {
      const needs = monthlyIncome * 0.5;
      const wants = monthlyIncome * 0.3;
      const savings = monthlyIncome * 0.2;
      
      // Update categories based on rule
      setBudgetCategories(prev => prev.map(cat => {
        if (cat.isEssential) {
          const newAllocated = needs * (cat.percentage / 100);
          return {
            ...cat,
            allocated: newAllocated,
            remaining: newAllocated - cat.spent,
            percentage: (newAllocated / monthlyIncome) * 100
          };
        }
        return cat;
      }));
    }
  };

  const chartData = budgetCategories.map(cat => ({
    name: cat.name,
    value: cat.allocated,
    spent: cat.spent,
    remaining: cat.remaining,
    color: cat.color
  }));

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
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">Budget Planner</h2>
            <p className="text-gray-400 text-lg">Smart budget allocation with proven financial strategies</p>
          </div>
          <div className="flex items-center gap-4 mx-auto lg:mx-0">
            <Button
              variant={viewMode === 'percentage' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('percentage')}
            >
              <Target className="w-4 h-4" />
              Percentage
            </Button>
            <Button
              variant={viewMode === 'dollar' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('dollar')}
            >
              <DollarSign className="w-4 h-4" />
              Dollar Amount
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

      {/* Income & Budget Summary */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card hover-lift text-center"
          >
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Monthly Income</h3>
            <div className="text-3xl font-bold text-green-400 mb-2">${monthlyIncome.toLocaleString()}</div>
            <Button variant="ghost" size="sm">
              <Edit3 className="w-4 h-4" />
              Edit
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card hover-lift text-center"
          >
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Allocated</h3>
            <div className="text-3xl font-bold text-blue-400 mb-2">${totalAllocated.toLocaleString()}</div>
            <div className="text-sm text-gray-400">{((totalAllocated / monthlyIncome) * 100).toFixed(1)}% of income</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card hover-lift text-center"
          >
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Total Spent</h3>
            <div className="text-3xl font-bold text-orange-400 mb-2">${totalSpent.toLocaleString()}</div>
            <div className="text-sm text-gray-400">{spendingEfficiency}% efficiency</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card hover-lift text-center"
          >
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Unallocated</h3>
            <div className={`text-3xl font-bold mb-2 ${totalRemaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${Math.abs(totalRemaining).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">
              {totalRemaining >= 0 ? 'Available' : 'Over budget'}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Budget Rules */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card hover-lift mb-8"
        >
          <h3 className="text-xl font-bold gradient-text mb-4">Budget Strategy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {budgetRules.map((rule) => (
              <motion.button
                key={rule.id}
                onClick={() => applyBudgetRule(rule.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  rule.isActive
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-600 glass hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-purple-400" />
                  <h4 className="font-semibold">{rule.name}</h4>
                </div>
                <p className="text-sm text-gray-400">{rule.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Budget Categories */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {budgetCategories.map((category, index) => {
                  const utilizationPercentage = (category.spent / category.allocated) * 100;
                  const isOverBudget = category.spent > category.allocated;
                  
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="card hover-lift group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-lg mb-1">{category.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              category.isEssential 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : 'bg-purple-500/20 text-purple-400'
                            }`}>
                              {category.isEssential ? 'Essential' : 'Flexible'}
                            </span>
                            <span className="text-sm text-gray-400">{category.percentage}%</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingCategory(category.id);
                              setEditFormData(category);
                            }}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteCategory(category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Allocated</span>
                          <span className="font-semibold">${category.allocated.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Spent</span>
                          <span className="font-semibold">${category.spent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Remaining</span>
                          <span className={`font-semibold ${category.remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${Math.abs(category.remaining).toLocaleString()}
                          </span>
                        </div>

                        <div className="progress-bar">
                          <motion.div
                            className="progress-fill"
                            style={{ 
                              backgroundColor: isOverBudget ? '#ef4444' : category.color,
                              width: `${Math.min(utilizationPercentage, 100)}%`
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </div>

                        <div className="flex justify-between text-xs">
                          <span className={`font-semibold ${
                            isOverBudget ? 'text-red-400' : 
                            utilizationPercentage > 80 ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {utilizationPercentage.toFixed(1)}% used
                          </span>
                          <span className="text-gray-400">
                            {isOverBudget ? 'Over budget' : 'On track'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Budget Visualization */}
          <div className="space-y-6">
            <div className="card hover-lift">
              <h3 className="text-xl font-bold gradient-text mb-4">Budget Allocation</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
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

            <div className="card hover-lift">
              <h3 className="text-xl font-bold gradient-text mb-4">Budget Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 glass rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="font-semibold">Essential Categories</span>
                  </div>
                  <span className="text-green-400 font-bold">
                    {budgetCategories.filter(cat => cat.isEssential).length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 glass rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Calculator className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="font-semibold">Spending Efficiency</span>
                  </div>
                  <span className="text-blue-400 font-bold">{spendingEfficiency}%</span>
                </div>

                <div className="flex items-center justify-between p-3 glass rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      totalRemaining >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {totalRemaining >= 0 ? 
                        <TrendingUp className="w-4 h-4 text-green-400" /> : 
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      }
                    </div>
                    <span className="font-semibold">Budget Status</span>
                  </div>
                  <span className={`font-bold ${totalRemaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalRemaining >= 0 ? 'Under Budget' : 'Over Budget'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        title="Add Budget Category"
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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Allocated Amount ($)"
              type="number"
              placeholder="Enter dollar amount"
              value={newCategory.allocated}
              onChange={(e) => {
                const amount = parseFloat(e.target.value) || undefined;
                const percentage = amount ? (amount / monthlyIncome) * 100 : undefined;
                setNewCategory({ ...newCategory, allocated: amount, percentage });
              }}
            />
            <Input
              label="Percentage (%)"
              type="number"
              placeholder="Enter percentage"
              value={newCategory.percentage}
              onChange={(e) => {
                const percentage = parseFloat(e.target.value) || undefined;
                const amount = percentage ? (percentage / 100) * monthlyIncome : undefined;
                setNewCategory({ ...newCategory, percentage, allocated: amount });
              }}
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isEssential"
              checked={newCategory.isEssential}
              onChange={(e) => setNewCategory({ ...newCategory, isEssential: e.target.checked })}
              className="w-5 h-5 text-purple-500 bg-transparent border-2 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="isEssential" className="text-sm font-semibold">
              Essential Category (needs vs wants)
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

      {/* Edit Category Modal */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => {
          setEditingCategory(null);
          setEditFormData({});
        }}
        title="Edit Budget Category"
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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Allocated Amount ($)"
              type="number"
              placeholder="Enter dollar amount"
              value={editFormData.allocated}
              onChange={(e) => {
                const amount = parseFloat(e.target.value) || undefined;
                const percentage = amount ? (amount / monthlyIncome) * 100 : undefined;
                setEditFormData({ ...editFormData, allocated: amount, percentage });
              }}
            />
            <Input
              label="Percentage (%)"
              type="number"
              placeholder="Enter percentage"
              value={editFormData.percentage}
              onChange={(e) => {
                const percentage = parseFloat(e.target.value) || undefined;
                const amount = percentage ? (percentage / 100) * monthlyIncome : undefined;
                setEditFormData({ ...editFormData, percentage, allocated: amount });
              }}
            />
          </div>

          <Input
            label="Amount Spent"
            type="number"
            placeholder="Enter spent amount"
            value={editFormData.spent}
            onChange={(e) => setEditFormData({ ...editFormData, spent: parseFloat(e.target.value) || undefined })}
          />

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="editIsEssential"
              checked={editFormData.isEssential || false}
              onChange={(e) => setEditFormData({ ...editFormData, isEssential: e.target.checked })}
              className="w-5 h-5 text-purple-500 bg-transparent border-2 border-gray-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="editIsEssential" className="text-sm font-semibold">
              Essential Category (needs vs wants)
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
