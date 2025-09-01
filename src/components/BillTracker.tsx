'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Repeat,
  Bell,
  CreditCard,
  Wifi,
  Smartphone,
  Zap,
  Home,
  Car,
  Save,
  X
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: 'utilities' | 'subscription' | 'insurance' | 'loan' | 'rent' | 'other';
  isRecurring: boolean;
  frequency: 'monthly' | 'quarterly' | 'yearly';
  isPaid: boolean;
  paidDate?: string;
  isAutoPay: boolean;
  color: string;
  icon: React.ComponentType<any>;
  notes?: string;
}

export default function BillTracker() {
  const [bills, setBills] = useState<Bill[]>([
    {
      id: '1',
      name: 'Rent',
      amount: 1200,
      dueDate: '2024-02-01',
      category: 'rent',
      isRecurring: true,
      frequency: 'monthly',
      isPaid: true,
      paidDate: '2024-01-28',
      isAutoPay: true,
      color: '#6366f1',
      icon: Home,
      notes: 'Monthly rent payment'
    },
    {
      id: '2',
      name: 'Electric Bill',
      amount: 120,
      dueDate: '2024-02-15',
      category: 'utilities',
      isRecurring: true,
      frequency: 'monthly',
      isPaid: false,
      isAutoPay: false,
      color: '#f59e0b',
      icon: Zap,
      notes: 'Electricity and gas'
    },
    {
      id: '3',
      name: 'Netflix',
      amount: 15.99,
      dueDate: '2024-02-05',
      category: 'subscription',
      isRecurring: true,
      frequency: 'monthly',
      isPaid: true,
      paidDate: '2024-02-05',
      isAutoPay: true,
      color: '#ef4444',
      icon: Smartphone,
      notes: 'Streaming subscription'
    },
    {
      id: '4',
      name: 'Internet',
      amount: 80,
      dueDate: '2024-02-20',
      category: 'utilities',
      isRecurring: true,
      frequency: 'monthly',
      isPaid: false,
      isAutoPay: true,
      color: '#10b981',
      icon: Wifi,
      notes: 'High-speed internet'
    },
    {
      id: '5',
      name: 'Car Insurance',
      amount: 150,
      dueDate: '2024-02-25',
      category: 'insurance',
      isRecurring: true,
      frequency: 'monthly',
      isPaid: false,
      isAutoPay: true,
      color: '#8b5cf6',
      icon: Car,
      notes: 'Auto insurance premium'
    }
  ]);

  const [showAddBill, setShowAddBill] = useState(false);
  const [editingBill, setEditingBill] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Bill>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'upcoming' | 'all' | 'overdue'>('upcoming');

  const [newBill, setNewBill] = useState<Partial<Bill>>({
    name: '',
    amount: undefined,
    dueDate: '',
    category: 'utilities',
    isRecurring: true,
    frequency: 'monthly',
    isPaid: false,
    isAutoPay: false,
    color: '#6366f1',
    icon: DollarSign,
    notes: ''
  });

  const billCategories = [
    { value: 'utilities', label: 'Utilities', icon: Zap, color: '#f59e0b' },
    { value: 'subscription', label: 'Subscriptions', icon: Smartphone, color: '#ef4444' },
    { value: 'insurance', label: 'Insurance', icon: Car, color: '#8b5cf6' },
    { value: 'loan', label: 'Loans', icon: CreditCard, color: '#06b6d4' },
    { value: 'rent', label: 'Rent/Mortgage', icon: Home, color: '#6366f1' },
    { value: 'other', label: 'Other', icon: DollarSign, color: '#84cc16' }
  ];

  const addBill = () => {
    if (newBill.name && newBill.amount && newBill.dueDate) {
      const categoryInfo = billCategories.find(cat => cat.value === newBill.category);
      const bill: Bill = {
        id: Date.now().toString(),
        name: newBill.name,
        amount: newBill.amount,
        dueDate: newBill.dueDate,
        category: newBill.category as any || 'other',
        isRecurring: newBill.isRecurring || false,
        frequency: newBill.frequency || 'monthly',
        isPaid: false,
        isAutoPay: newBill.isAutoPay || false,
        color: categoryInfo?.color || '#84cc16',
        icon: categoryInfo?.icon || DollarSign,
        notes: newBill.notes || ''
      };
      
      setBills([...bills, bill]);
      setNewBill({
        name: '',
        amount: undefined,
        dueDate: '',
        category: 'utilities',
        isRecurring: true,
        frequency: 'monthly',
        isPaid: false,
        isAutoPay: false,
        color: '#6366f1',
        icon: DollarSign,
        notes: ''
      });
      setShowAddBill(false);
    }
  };

  const updateBill = (id: string, updates: Partial<Bill>) => {
    setBills(bills.map(bill => 
      bill.id === id ? { ...bill, ...updates } : bill
    ));
    setEditingBill(null);
    setEditFormData({});
  };

  const saveEditedBill = () => {
    if (editingBill && editFormData.name && editFormData.amount && editFormData.dueDate) {
      const categoryInfo = billCategories.find(cat => cat.value === editFormData.category);
      updateBill(editingBill, {
        ...editFormData,
        color: categoryInfo?.color || editFormData.color,
        icon: categoryInfo?.icon || editFormData.icon
      });
    }
  };

  const deleteBill = (id: string) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  const markAsPaid = (id: string) => {
    updateBill(id, { 
      isPaid: true, 
      paidDate: new Date().toISOString().split('T')[0] 
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredBills = bills.filter(bill => {
    if (selectedCategory !== 'all' && bill.category !== selectedCategory) return false;
    
    const daysUntilDue = getDaysUntilDue(bill.dueDate);
    
    switch (viewMode) {
      case 'upcoming':
        return !bill.isPaid && daysUntilDue >= 0 && daysUntilDue <= 30;
      case 'overdue':
        return !bill.isPaid && daysUntilDue < 0;
      case 'all':
      default:
        return true;
    }
  });

  const totalMonthlyBills = bills.filter(bill => bill.isRecurring).reduce((sum, bill) => sum + bill.amount, 0);
  const paidThisMonth = bills.filter(bill => bill.isPaid).reduce((sum, bill) => sum + bill.amount, 0);
  const upcomingBills = bills.filter(bill => !bill.isPaid && getDaysUntilDue(bill.dueDate) <= 7).length;
  const overdueBills = bills.filter(bill => !bill.isPaid && getDaysUntilDue(bill.dueDate) < 0).length;

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
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">Bill Tracker</h2>
            <p className="text-gray-400 text-lg">Never miss a payment with smart reminders and automation</p>
          </div>
          <div className="flex items-center gap-4 mx-auto lg:mx-0">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'upcoming' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('upcoming')}
              >
                <Clock className="w-4 h-4" />
                Upcoming
              </Button>
              <Button
                variant={viewMode === 'overdue' ? 'danger' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('overdue')}
              >
                <AlertTriangle className="w-4 h-4" />
                Overdue
              </Button>
              <Button
                variant={viewMode === 'all' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('all')}
              >
                All Bills
              </Button>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowAddBill(true)}
            >
              <Plus className="w-4 h-4" />
              Add Bill
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Summary Stats */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl w-12 h-12 mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Monthly Bills</h3>
            <div className="text-2xl font-bold">${totalMonthlyBills.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl w-12 h-12 mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Paid This Month</h3>
            <div className="text-2xl font-bold text-green-400">${paidThisMonth.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl w-12 h-12 mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Due This Week</h3>
            <div className="text-2xl font-bold text-yellow-400">{upcomingBills}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card hover-lift text-center"
          >
            <div className="p-3 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl w-12 h-12 mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-2">Overdue</h3>
            <div className="text-2xl font-bold text-red-400">{overdueBills}</div>
          </motion.div>
        </div>
      </div>

      {/* Bills List */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBills.map((bill, index) => {
              const Icon = bill.icon;
              const daysUntilDue = getDaysUntilDue(bill.dueDate);
              const isOverdue = daysUntilDue < 0;
              const isUpcoming = daysUntilDue <= 7 && daysUntilDue >= 0;
              
              return (
                <motion.div
                  key={bill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`card hover-lift group relative ${
                    bill.isPaid ? 'ring-2 ring-green-500/50' : 
                    isOverdue ? 'ring-2 ring-red-500/50' : 
                    isUpcoming ? 'ring-2 ring-yellow-500/50' : ''
                  }`}
                >
                  {/* Bill Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${bill.color}20`, color: bill.color }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{bill.name}</h3>
                        <p className="text-sm text-gray-400">{bill.notes}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingBill(bill.id);
                          setEditFormData(bill);
                        }}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteBill(bill.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Amount and Due Date */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Amount</span>
                      <span className="text-2xl font-bold">${bill.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Due Date</span>
                      <span className="font-semibold">{new Date(bill.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Frequency</span>
                      <span className="font-semibold capitalize">{bill.frequency}</span>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bill.isPaid ? 'bg-green-500/20 text-green-400' :
                      isOverdue ? 'bg-red-500/20 text-red-400' :
                      isUpcoming ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {bill.isPaid ? 'Paid' :
                       isOverdue ? 'Overdue' :
                       isUpcoming ? `Due in ${daysUntilDue} days` :
                       `Due in ${daysUntilDue} days`}
                    </span>
                    
                    {bill.isAutoPay && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                        Auto Pay
                      </span>
                    )}
                    
                    {bill.isRecurring && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                        <Repeat className="w-3 h-3 inline mr-1" />
                        Recurring
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  {!bill.isPaid && (
                    <Button
                      variant="primary"
                      onClick={() => markAsPaid(bill.id)}
                      className="w-full"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Paid
                    </Button>
                  )}

                  {bill.isPaid && bill.paidDate && (
                    <div className="text-center text-sm text-green-400">
                      ✓ Paid on {new Date(bill.paidDate).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Bill Modal */}
      <Modal
        isOpen={showAddBill}
        onClose={() => setShowAddBill(false)}
        title="Add New Bill"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <Input
            label="Bill Name"
            placeholder="e.g., Electric Bill"
            value={newBill.name}
            onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount"
              type="number"
              placeholder="Enter amount"
              value={newBill.amount}
              onChange={(e) => setNewBill({ ...newBill, amount: parseFloat(e.target.value) || undefined })}
              required
            />
            <Input
              label="Due Date"
              type="date"
              value={newBill.dueDate}
              onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
              required
            />
          </div>

          <Select
            label="Category"
            value={newBill.category || ''}
            onChange={(e) => setNewBill({ ...newBill, category: e.target.value as any })}
            options={billCategories.map(cat => ({ value: cat.value, label: cat.label }))}
            required
          />

          <Select
            label="Frequency"
            value={newBill.frequency || ''}
            onChange={(e) => setNewBill({ ...newBill, frequency: e.target.value as any })}
            options={[
              { value: 'monthly', label: 'Monthly' },
              { value: 'quarterly', label: 'Quarterly' },
              { value: 'yearly', label: 'Yearly' }
            ]}
            required
          />

          <Input
            label="Notes (Optional)"
            placeholder="Additional notes about this bill"
            value={newBill.notes}
            onChange={(e) => setNewBill({ ...newBill, notes: e.target.value })}
          />

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isRecurring"
                checked={newBill.isRecurring}
                onChange={(e) => setNewBill({ ...newBill, isRecurring: e.target.checked })}
                className="w-5 h-5 text-purple-500 bg-transparent border-2 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="isRecurring" className="text-sm font-semibold">
                Recurring Bill
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isAutoPay"
                checked={newBill.isAutoPay}
                onChange={(e) => setNewBill({ ...newBill, isAutoPay: e.target.checked })}
                className="w-5 h-5 text-purple-500 bg-transparent border-2 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="isAutoPay" className="text-sm font-semibold">
                Auto Pay Enabled
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="ghost"
            onClick={() => setShowAddBill(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={addBill}
            className="flex-1"
          >
            <Save className="w-4 h-4" />
            Add Bill
          </Button>
        </div>
      </Modal>

      {/* Edit Bill Modal */}
      <Modal
        isOpen={!!editingBill}
        onClose={() => {
          setEditingBill(null);
          setEditFormData({});
        }}
        title="Edit Bill"
        maxWidth="lg"
      >
        <div className="space-y-6">
          <Input
            label="Bill Name"
            placeholder="e.g., Electric Bill"
            value={editFormData.name || ''}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount"
              type="number"
              placeholder="Enter amount"
              value={editFormData.amount}
              onChange={(e) => setEditFormData({ ...editFormData, amount: parseFloat(e.target.value) || undefined })}
              required
            />
            <Input
              label="Due Date"
              type="date"
              value={editFormData.dueDate}
              onChange={(e) => setEditFormData({ ...editFormData, dueDate: e.target.value })}
              required
            />
          </div>

          <Select
            label="Category"
            value={editFormData.category || ''}
            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value as any })}
            options={billCategories.map(cat => ({ value: cat.value, label: cat.label }))}
            required
          />

          <Input
            label="Notes (Optional)"
            placeholder="Additional notes about this bill"
            value={editFormData.notes}
            onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
          />

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="editIsRecurring"
                checked={editFormData.isRecurring || false}
                onChange={(e) => setEditFormData({ ...editFormData, isRecurring: e.target.checked })}
                className="w-5 h-5 text-purple-500 bg-transparent border-2 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="editIsRecurring" className="text-sm font-semibold">
                Recurring Bill
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="editIsAutoPay"
                checked={editFormData.isAutoPay || false}
                onChange={(e) => setEditFormData({ ...editFormData, isAutoPay: e.target.checked })}
                className="w-5 h-5 text-purple-500 bg-transparent border-2 border-gray-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="editIsAutoPay" className="text-sm font-semibold">
                Auto Pay Enabled
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Button
            variant="ghost"
            onClick={() => {
              setEditingBill(null);
              setEditFormData({});
            }}
            className="flex-1"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={saveEditedBill}
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
