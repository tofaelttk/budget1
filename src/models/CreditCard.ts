import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICreditCard extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  balance: number;
  creditLimit: number;
  minimumPayment: number;
  dueDate: string;
  interestRate: number;
  color: string;
  lastPayment?: {
    amount: number;
    date: Date;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CreditCardSchema: Schema<ICreditCard> = new Schema({
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
  balance: {
    type: Number,
    required: true,
    min: 0
  },
  creditLimit: {
    type: Number,
    required: true,
    min: 0
  },
  minimumPayment: {
    type: Number,
    required: true,
    min: 0
  },
  dueDate: {
    type: String,
    required: true
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  lastPayment: {
    amount: {
      type: Number,
      min: 0
    },
    date: {
      type: Date
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create indexes
CreditCardSchema.index({ userId: 1, isActive: 1 });
CreditCardSchema.index({ userId: 1, dueDate: 1 });

export default (mongoose.models.CreditCard as Model<ICreditCard>) || mongoose.model<ICreditCard>('CreditCard', CreditCardSchema);
