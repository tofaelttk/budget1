import mongoose, { Document, Schema } from 'mongoose';

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  category: 'tuition' | 'family-support' | 'subscription' | 'personal' | 'emergency' | 'other';
  subcategory?: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'monthly' | 'semester' | 'yearly' | 'one-time';
  dueDate?: Date;
  isRecurring: boolean;
  isFixed: boolean; // true for fixed expenses, false for variable
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['tuition', 'family-support', 'subscription', 'personal', 'emergency', 'other'],
    required: [true, 'Expense category is required'],
  },
  subcategory: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Expense name is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Expense amount is required'],
    min: [0, 'Expense amount cannot be negative'],
  },
  frequency: {
    type: String,
    enum: ['weekly', 'monthly', 'semester', 'yearly', 'one-time'],
    required: [true, 'Expense frequency is required'],
  },
  dueDate: {
    type: Date,
  },
  isRecurring: {
    type: Boolean,
    default: true,
  },
  isFixed: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Virtual for monthly equivalent
ExpenseSchema.virtual('monthlyEquivalent').get(function(this: IExpense) {
  switch (this.frequency) {
    case 'weekly':
      return this.amount * 4.33; // Average weeks per month
    case 'monthly':
      return this.amount;
    case 'semester':
      return this.amount / 4; // Assuming 4 months per semester
    case 'yearly':
      return this.amount / 12;
    case 'one-time':
      return 0;
    default:
      return 0;
  }
});

export default mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);
