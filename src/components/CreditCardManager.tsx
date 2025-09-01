'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar, 
  DollarSign, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Calculator,
  PiggyBank,
  Save,
  X
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface CreditCardData {
  id: string;
  name: string;
  balance: number;
  creditLimit: number;
  minimumPayment: number;
  dueDate: string;
  interestRate: number;
  color: string;
  lastPayment?: number;
  lastPaymentDate?: string;
}

interface PaymentStrategy {
  type: 'minimum' | 'avalanche' | 'snowball' | 'custom';
  extraPayment: number;
}

export default function CreditCardManager() {
  const [cards, setCards] = useState<CreditCardData[]>([
    {
      id: '1',
      name: 'Chase Sapphire',
      balance: 2450.75,
      creditLimit: 5000,
      minimumPayment: 75.00,
      dueDate: '2024-02-15',
      interestRate: 18.99,
      color: 'from-blue-500 to-cyan-600',
      lastPayment: 150.00,
      lastPaymentDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Capital One Venture',
      balance: 1850.25,
      creditLimit: 8000,
      minimumPayment: 55.00,
      dueDate: '2024-02-20',
      interestRate: 16.99,
      color: 'from-purple-500 to-pink-600',
      lastPayment: 100.00,
      lastPaymentDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'American Express Gold',
      balance: 3200.50,
      creditLimit: 10000,
      minimumPayment: 95.00,
      dueDate: '2024-02-25',
      interestRate: 21.99,
      color: 'from-yellow-500 to-orange-600'
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<CreditCardData>>({});
  const [paymentStrategy, setPaymentStrategy] = useState<PaymentStrategy>({
    type: 'minimum',
    extraPayment: 0
  });
  const [showCalculator, setShowCalculator] = useState(false);

  const [newCard, setNewCard] = useState<Partial<CreditCardData>>({
    name: '',
    balance: undefined,
    creditLimit: undefined,
    minimumPayment: undefined,
    dueDate: '',
    interestRate: undefined,
    color: 'from-blue-500 to-cyan-600'
  });

  const cardColors = [
    'from-blue-500 to-cyan-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-yellow-500 to-orange-600',
    'from-red-500 to-rose-600',
    'from-indigo-500 to-blue-600'
  ];

  const addCard = () => {
    if (newCard.name && newCard.creditLimit && newCard.dueDate) {
      const card: CreditCardData = {
        id: Date.now().toString(),
        name: newCard.name,
        balance: newCard.balance || 0,
        creditLimit: newCard.creditLimit,
        minimumPayment: newCard.minimumPayment || 0,
        dueDate: newCard.dueDate,
        interestRate: newCard.interestRate || 0,
        color: newCard.color || cardColors[cards.length % cardColors.length]
      };
      setCards([...cards, card]);
      setNewCard({
        name: '',
        balance: 0,
        creditLimit: 0,
        minimumPayment: 0,
        dueDate: '',
        interestRate: 0,
        color: 'from-blue-500 to-cyan-600'
      });
      setShowAddCard(false);
    }
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const updateCard = (id: string, updates: Partial<CreditCardData>) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, ...updates } : card
    ));
    setEditingCard(null);
    setEditFormData({});
  };

  const saveEditedCard = () => {
    if (editingCard && editFormData.name && editFormData.creditLimit && editFormData.dueDate) {
      updateCard(editingCard, editFormData);
    }
  };

  const calculateUtilization = (balance: number, limit: number) => {
    return (balance / limit) * 100;
  };

  const calculatePayoffTime = (balance: number, payment: number, interestRate: number) => {
    if (payment <= (balance * (interestRate / 100) / 12)) {
      return 'Never (payment too low)';
    }
    
    const monthlyRate = interestRate / 100 / 12;
    const months = Math.ceil(
      -Math.log(1 - (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate)
    );
    
    if (months <= 12) {
      return `${months} months`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years}y ${remainingMonths}m`;
    }
  };

  const calculateTotalInterest = (balance: number, payment: number, interestRate: number) => {
    const monthlyRate = interestRate / 100 / 12;
    let currentBalance = balance;
    let totalInterest = 0;
    let months = 0;
    
    while (currentBalance > 0 && months < 600) { // Max 50 years to prevent infinite loop
      const interestPayment = currentBalance * monthlyRate;
      const principalPayment = payment - interestPayment;
      
      if (principalPayment <= 0) break;
      
      totalInterest += interestPayment;
      currentBalance -= principalPayment;
      months++;
    }
    
    return totalInterest;
  };

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalMinimumPayment = cards.reduce((sum, card) => sum + card.minimumPayment, 0);
  const averageUtilization = cards.reduce((sum, card) => sum + calculateUtilization(card.balance, card.creditLimit), 0) / cards.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Credit Card Manager</h2>
          <p className="text-gray-400">Smart debt management and payoff strategies</p>
        </div>
        <motion.button
          onClick={() => setShowAddCard(true)}
          className="btn-primary star-border flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          <span>Add Card</span>
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Debt</p>
              <p className="text-2xl font-bold">${totalBalance.toLocaleString()}</p>
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
            <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Min Payment</p>
              <p className="text-2xl font-bold">${totalMinimumPayment.toLocaleString()}</p>
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
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Avg Utilization</p>
              <p className="text-2xl font-bold">{averageUtilization.toFixed(1)}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Credit Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {cards.map((card, index) => {
            const utilization = calculateUtilization(card.balance, card.creditLimit);
            const payoffTime = calculatePayoffTime(card.balance, card.minimumPayment, card.interestRate);
            const daysUntilDue = Math.ceil((new Date(card.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover-lift group relative overflow-hidden"
                style={{ minHeight: '320px' }}
              >
                {/* Card Header */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${card.color}`}></div>
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{card.name}</h3>
                    <p className="text-sm text-gray-400">
                      Due: {new Date(card.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      onClick={() => {
                        setEditingCard(card.id);
                        setEditFormData(card);
                      }}
                      className="p-3 glass rounded-xl hover:bg-blue-500/20 border border-blue-500/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit3 className="w-4 h-4 text-blue-400" />
                    </motion.button>
                    <motion.button
                      onClick={() => deleteCard(card.id)}
                      className="p-3 glass rounded-xl hover:bg-red-500/20 border border-red-500/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Balance and Limit */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Balance</span>
                    <span className="text-2xl font-bold">${card.balance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                    <span>Limit: ${card.creditLimit.toLocaleString()}</span>
                    <span>Available: ${(card.creditLimit - card.balance).toLocaleString()}</span>
                  </div>
                  
                  {/* Utilization Progress */}
                  <div className="progress-bar mb-2">
                    <motion.div
                      className={`progress-fill ${
                        utilization > 80 ? 'bg-red-500' : 
                        utilization > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${utilization}%` }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Utilization: {utilization.toFixed(1)}%</span>
                    <span className={
                      utilization > 80 ? 'text-red-400' : 
                      utilization > 50 ? 'text-yellow-400' : 'text-green-400'
                    }>
                      {utilization > 80 ? 'High Risk' : 
                       utilization > 50 ? 'Moderate' : 'Good'}
                    </span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Minimum Payment</span>
                    <span className="font-semibold">${card.minimumPayment}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Interest Rate</span>
                    <span className="font-semibold">{card.interestRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Payoff Time</span>
                    <span className="font-semibold">{payoffTime}</span>
                  </div>
                </div>

                {/* Due Date Alert */}
                <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
                  daysUntilDue <= 3 ? 'bg-red-500/20 text-red-400' : 
                  daysUntilDue <= 7 ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-green-500/20 text-green-400'
                }`}>
                  {daysUntilDue <= 3 ? <AlertTriangle className="w-4 h-4" /> : 
                   daysUntilDue <= 7 ? <Calendar className="w-4 h-4" /> : 
                   <CheckCircle className="w-4 h-4" />}
                  <span className="text-sm font-semibold">
                    {daysUntilDue <= 0 ? 'Payment Overdue!' : 
                     daysUntilDue === 1 ? 'Due Tomorrow' : 
                     `${daysUntilDue} days until due`}
                  </span>
                </div>

                {/* Last Payment */}
                {card.lastPayment && (
                  <div className="mt-3 text-xs text-gray-400">
                    Last payment: ${card.lastPayment} on {card.lastPaymentDate}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Payment Strategy Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card hover-lift"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold gradient-text">Payment Strategy</h3>
          <motion.button
            onClick={() => setShowCalculator(true)}
            className="btn-primary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calculator className="w-4 h-4" />
            <span>Payoff Calculator</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { type: 'minimum', title: 'Minimum Only', icon: DollarSign, desc: 'Pay minimum on all cards' },
            { type: 'avalanche', title: 'Debt Avalanche', icon: TrendingDown, desc: 'Highest interest first' },
            { type: 'snowball', title: 'Debt Snowball', icon: Target, desc: 'Smallest balance first' },
            { type: 'custom', title: 'Custom Strategy', icon: Zap, desc: 'Your own approach' }
          ].map((strategy) => {
            const Icon = strategy.icon;
            return (
              <motion.button
                key={strategy.type}
                onClick={() => setPaymentStrategy({ ...paymentStrategy, type: strategy.type as any })}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  paymentStrategy.type === strategy.type
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-600 glass hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-6 h-6 mb-2 text-purple-400" />
                <h4 className="font-semibold mb-1">{strategy.title}</h4>
                <p className="text-sm text-gray-400">{strategy.desc}</p>
              </motion.button>
            );
          })}
        </div>

        {/* Extra Payment Slider */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <label className="font-semibold">Extra Monthly Payment</label>
            <span className="text-xl font-bold">${paymentStrategy.extraPayment}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="25"
            value={paymentStrategy.extraPayment}
            onChange={(e) => setPaymentStrategy({ ...paymentStrategy, extraPayment: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${paymentStrategy.extraPayment / 10}%, #374151 ${paymentStrategy.extraPayment / 10}%, #374151 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>$0</span>
            <span>$1000</span>
          </div>
        </div>
      </motion.div>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddCard(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 gradient-text">Add New Credit Card</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Card Name</label>
                  <input
                    type="text"
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                    placeholder="e.g., Chase Sapphire"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Current Balance</label>
                    <input
                      type="number"
                      value={newCard.balance}
                      onChange={(e) => setNewCard({ ...newCard, balance: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Credit Limit</label>
                    <input
                      type="number"
                      value={newCard.creditLimit}
                      onChange={(e) => setNewCard({ ...newCard, creditLimit: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="5000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Minimum Payment</label>
                    <input
                      type="number"
                      value={newCard.minimumPayment}
                      onChange={(e) => setNewCard({ ...newCard, minimumPayment: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="50.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newCard.interestRate}
                      onChange={(e) => setNewCard({ ...newCard, interestRate: parseFloat(e.target.value) || 0 })}
                      className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                      placeholder="18.99"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newCard.dueDate}
                    onChange={(e) => setNewCard({ ...newCard, dueDate: e.target.value })}
                    className="w-full p-3 glass rounded-xl border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Card Color</label>
                  <div className="flex space-x-2">
                    {cardColors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setNewCard({ ...newCard, color })}
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${color} border-2 ${
                          newCard.color === color ? 'border-white' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <motion.button
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 p-3 glass rounded-xl hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={addCard}
                  className="flex-1 btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Card
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Card Modal */}
      <Modal
        isOpen={!!editingCard}
        onClose={() => {
          setEditingCard(null);
          setEditFormData({});
        }}
        title="Edit Credit Card"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <Input
            label="Card Name"
            placeholder="e.g., Chase Sapphire"
            value={editFormData.name || ''}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Current Balance"
              type="number"
              placeholder="Enter current balance"
              value={editFormData.balance}
              onChange={(e) => setEditFormData({ ...editFormData, balance: parseFloat(e.target.value) || undefined })}
            />
            <Input
              label="Credit Limit"
              type="number"
              placeholder="Enter credit limit"
              value={editFormData.creditLimit}
              onChange={(e) => setEditFormData({ ...editFormData, creditLimit: parseFloat(e.target.value) || undefined })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum Payment"
              type="number"
              placeholder="Enter minimum payment"
              value={editFormData.minimumPayment}
              onChange={(e) => setEditFormData({ ...editFormData, minimumPayment: parseFloat(e.target.value) || undefined })}
            />
            <Input
              label="Interest Rate (%)"
              type="number"
              placeholder="e.g., 18.99"
              value={editFormData.interestRate}
              onChange={(e) => setEditFormData({ ...editFormData, interestRate: parseFloat(e.target.value) || undefined })}
            />
          </div>

          <Input
            label="Due Date"
            type="date"
            value={editFormData.dueDate || ''}
            onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
            required
          />

          <div className="field">
            <label className="form-label">Card Color Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {cardColors.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setEditFormData({ ...editFormData, color })}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 bg-gradient-to-r ${color} ${
                    editFormData.color === color ? 'border-white' : 'border-transparent'
                  }`}
                >
                  <div className="text-white text-xs font-semibold">Sample Card</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="ghost"
            onClick={() => {
              setEditingCard(null);
              setEditFormData({});
            }}
            className="flex-1"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={saveEditedCard}
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
