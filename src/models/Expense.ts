import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IExpenseCategory extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  budget: number;
  spent: number;
  isFixed: boolean;
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  amount: number;
  description: string;
  date: Date;
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'yearly';
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseCategorySchema: Schema<IExpenseCategory> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  spent: {
    type: Number,
    default: 0,
    min: 0
  },
  isFixed: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'ShoppingCart'
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const ExpenseSchema: Schema<IExpense> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'ExpenseCategory',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly']
  }
}, {
  timestamps: true
});

// Create indexes
ExpenseCategorySchema.index({ userId: 1, isActive: 1 });
ExpenseCategorySchema.index({ userId: 1, name: 1 });

ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ categoryId: 1, date: -1 });
ExpenseSchema.index({ userId: 1, isRecurring: 1 });

export const ExpenseCategory = (mongoose.models.ExpenseCategory as Model<IExpenseCategory>) || mongoose.model<IExpenseCategory>('ExpenseCategory', ExpenseCategorySchema);
export const Expense = (mongoose.models.Expense as Model<IExpense>) || mongoose.model<IExpense>('Expense', ExpenseSchema);
