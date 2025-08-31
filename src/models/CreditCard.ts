import mongoose, { Document, Schema } from 'mongoose';

export interface ICreditCard extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  currentBalance: number;
  creditLimit: number;
  interestRate: number; // APR as decimal (e.g., 0.1899 for 18.99%)
  minimumPayment: number;
  dueDate: number; // Day of the month (1-31)
  paymentStrategy: 'minimum' | 'percentage';
  extraPaymentPercentage: number; // Additional percentage above minimum
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CreditCardSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Card name is required'],
    trim: true,
  },
  currentBalance: {
    type: Number,
    required: [true, 'Current balance is required'],
    min: [0, 'Balance cannot be negative'],
  },
  creditLimit: {
    type: Number,
    required: [true, 'Credit limit is required'],
    min: [0, 'Credit limit cannot be negative'],
  },
  interestRate: {
    type: Number,
    required: [true, 'Interest rate is required'],
    min: [0, 'Interest rate cannot be negative'],
    max: [1, 'Interest rate cannot exceed 100%'],
  },
  minimumPayment: {
    type: Number,
    required: [true, 'Minimum payment is required'],
    min: [0, 'Minimum payment cannot be negative'],
  },
  dueDate: {
    type: Number,
    required: [true, 'Due date is required'],
    min: [1, 'Due date must be between 1-31'],
    max: [31, 'Due date must be between 1-31'],
  },
  paymentStrategy: {
    type: String,
    enum: ['minimum', 'percentage'],
    default: 'minimum',
  },
  extraPaymentPercentage: {
    type: Number,
    default: 0,
    min: [0, 'Extra payment percentage cannot be negative'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Virtual for utilization percentage
CreditCardSchema.virtual('utilizationPercentage').get(function(this: ICreditCard) {
  return this.currentBalance / this.creditLimit;
});

// Virtual for actual payment amount
CreditCardSchema.virtual('actualPayment').get(function(this: ICreditCard) {
  const basePayment = this.paymentStrategy === 'minimum' ? this.minimumPayment : this.currentBalance;
  return basePayment * (1 + this.extraPaymentPercentage);
});

export default mongoose.models.CreditCard || mongoose.model<ICreditCard>('CreditCard', CreditCardSchema);
