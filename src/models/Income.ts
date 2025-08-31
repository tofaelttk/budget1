import mongoose, { Document, Schema } from 'mongoose';

export interface IIncome extends Document {
  userId: mongoose.Types.ObjectId;
  source: string;
  amount: number;
  frequency: 'weekly' | 'monthly' | 'yearly' | 'one-time';
  dayOfWeek?: number; // 0-6 for weekly income (0 = Sunday)
  dayOfMonth?: number; // 1-31 for monthly income
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IncomeSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  source: {
    type: String,
    required: [true, 'Income source is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Income amount is required'],
    min: [0, 'Income amount cannot be negative'],
  },
  frequency: {
    type: String,
    enum: ['weekly', 'monthly', 'yearly', 'one-time'],
    required: [true, 'Income frequency is required'],
  },
  dayOfWeek: {
    type: Number,
    min: [0, 'Day of week must be 0-6'],
    max: [6, 'Day of week must be 0-6'],
  },
  dayOfMonth: {
    type: Number,
    min: [1, 'Day of month must be 1-31'],
    max: [31, 'Day of month must be 1-31'],
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
IncomeSchema.virtual('monthlyEquivalent').get(function(this: IIncome) {
  switch (this.frequency) {
    case 'weekly':
      return this.amount * 4.33; // Average weeks per month
    case 'monthly':
      return this.amount;
    case 'yearly':
      return this.amount / 12;
    case 'one-time':
      return 0;
    default:
      return 0;
  }
});

export default mongoose.models.Income || mongoose.model<IIncome>('Income', IncomeSchema);
