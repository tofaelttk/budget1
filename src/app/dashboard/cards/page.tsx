'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingDown, 
  Calendar,
  DollarSign,
  Percent,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Progress } from '@/components/ui/Progress';
import { formatCurrency, calculatePayoffTime, formatPercentage } from '@/lib/utils';

interface CreditCardData {
  _id: string;
  name: string;
  currentBalance: number;
  creditLimit: number;
  interestRate: number;
  minimumPayment: number;
  dueDate: number;
  paymentStrategy: 'minimum' | 'percentage';
  extraPaymentPercentage: number;
}

const cardColors = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-red-500 to-red-600',
  'from-indigo-500 to-indigo-600',
  'from-pink-500 to-pink-600',
];

export default function CreditCardsPage() {
  const [cards, setCards] = useState<CreditCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCard, setEditingCard] = useState<CreditCardData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    currentBalance: '',
    creditLimit: '',
    interestRate: '',
    minimumPayment: '',
    dueDate: '',
    paymentStrategy: 'minimum' as 'minimum' | 'percentage',
    extraPaymentPercentage: '0',
  });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('/api/cards', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCards(data);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem('auth-token');
    const url = editingCard ? `/api/cards/${editingCard._id}` : '/api/cards';
    const method = editingCard ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          currentBalance: parseFloat(formData.currentBalance),
          creditLimit: parseFloat(formData.creditLimit),
          interestRate: parseFloat(formData.interestRate) / 100, // Convert to decimal
          minimumPayment: parseFloat(formData.minimumPayment),
          dueDate: parseInt(formData.dueDate),
          extraPaymentPercentage: parseFloat(formData.extraPaymentPercentage) / 100,
        }),
      });

      if (response.ok) {
        await fetchCards();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const handleDelete = async (cardId: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return;

    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`/api/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchCards();
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      currentBalance: '',
      creditLimit: '',
      interestRate: '',
      minimumPayment: '',
      dueDate: '',
      paymentStrategy: 'minimum',
      extraPaymentPercentage: '0',
    });
    setShowAddForm(false);
    setEditingCard(null);
  };

  const startEdit = (card: CreditCardData) => {
    setFormData({
      name: card.name,
      currentBalance: card.currentBalance.toString(),
      creditLimit: card.creditLimit.toString(),
      interestRate: (card.interestRate * 100).toString(),
      minimumPayment: card.minimumPayment.toString(),
      dueDate: card.dueDate.toString(),
      paymentStrategy: card.paymentStrategy,
      extraPaymentPercentage: (card.extraPaymentPercentage * 100).toString(),
    });
    setEditingCard(card);
    setShowAddForm(true);
  };

  const calculateActualPayment = (card: CreditCardData) => {
    const basePayment = card.paymentStrategy === 'minimum' 
      ? card.minimumPayment 
      : card.currentBalance;
    return basePayment * (1 + card.extraPaymentPercentage);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Credit Cards</h1>
          <Button disabled>
            <Plus className="w-4 h-4 mr-2" />
            Add Card
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse h-64">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Credit Cards
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your credit cards and payment strategies
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>

      {/* Summary Stats */}
      {cards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Debt</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(cards.reduce((sum, card) => sum + card.currentBalance, 0))}
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available Credit</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(cards.reduce((sum, card) => sum + (card.creditLimit - card.currentBalance), 0))}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Utilization</p>
                  <p className="text-2xl font-bold">
                    {formatPercentage(cards.reduce((sum, card) => sum + (card.currentBalance / card.creditLimit), 0) / cards.length)}
                  </p>
                </div>
                <Percent className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {cards.map((card, index) => {
            const utilization = (card.currentBalance / card.creditLimit) * 100;
            const actualPayment = calculateActualPayment(card);
            const payoffInfo = calculatePayoffTime(card.currentBalance, card.interestRate, actualPayment);
            const colorClass = cardColors[index % cardColors.length];

            return (
              <motion.div
                key={card._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Card Header with Gradient */}
                  <div className={`bg-gradient-to-r ${colorClass} text-white p-6`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{card.name}</h3>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={() => startEdit(card)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                          onClick={() => handleDelete(card._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-90">Balance</span>
                        <span className="text-xl font-bold">
                          {formatCurrency(card.currentBalance)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm opacity-90">Limit</span>
                        <span className="text-sm">
                          {formatCurrency(card.creditLimit)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Utilization */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Utilization</span>
                        <span className="text-sm text-gray-600">
                          {utilization.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={utilization} 
                        className={`h-2 ${utilization > 70 ? 'bg-red-100' : utilization > 30 ? 'bg-yellow-100' : 'bg-green-100'}`}
                      />
                      {utilization > 70 && (
                        <div className="flex items-center mt-2 text-red-600 text-xs">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          High utilization may hurt credit score
                        </div>
                      )}
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Min Payment</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(card.minimumPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Actual Payment</span>
                        <span className="text-sm font-medium text-green-600">
                          {formatCurrency(actualPayment)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">APR</span>
                        <span className="text-sm font-medium">
                          {formatPercentage(card.interestRate)}
                        </span>
                      </div>
                    </div>

                    {/* Payoff Timeline */}
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <TrendingDown className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm font-medium">Payoff Time</span>
                        </div>
                        <span className="text-sm">
                          {payoffInfo.months === Infinity 
                            ? 'Never' 
                            : `${Math.ceil(payoffInfo.months)} months`
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-600">Total Interest</span>
                        <span className="text-xs text-red-600">
                          {payoffInfo.totalInterest === Infinity 
                            ? '∞' 
                            : formatCurrency(payoffInfo.totalInterest)
                          }
                        </span>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm">Due Date</span>
                      </div>
                      <span className="text-sm font-medium">
                        {card.dueDate}{card.dueDate === 1 ? 'st' : card.dueDate === 2 ? 'nd' : card.dueDate === 3 ? 'rd' : 'th'} of each month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {cards.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No credit cards yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add your first credit card to start tracking your debt and payments.
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Card
          </Button>
        </motion.div>
      )}

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) resetForm();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">
                  {editingCard ? 'Edit Credit Card' : 'Add Credit Card'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Chase Freedom"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Current Balance
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.currentBalance}
                        onChange={(e) => setFormData({ ...formData, currentBalance: e.target.value })}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Credit Limit
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.creditLimit}
                        onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        APR (%)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.interestRate}
                        onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                        placeholder="18.99"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Min Payment
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.minimumPayment}
                        onChange={(e) => setFormData({ ...formData, minimumPayment: e.target.value })}
                        placeholder="25.00"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Due Date (Day of Month)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="31"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      placeholder="15"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Payment Strategy
                    </label>
                    <select
                      value={formData.paymentStrategy}
                      onChange={(e) => setFormData({ ...formData, paymentStrategy: e.target.value as 'minimum' | 'percentage' })}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="minimum">Minimum Payment</option>
                      <option value="percentage">Percentage of Balance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Extra Payment (%)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.extraPaymentPercentage}
                      onChange={(e) => setFormData({ ...formData, extraPaymentPercentage: e.target.value })}
                      placeholder="10"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Additional percentage above your base payment
                    </p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingCard ? 'Update Card' : 'Add Card'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
