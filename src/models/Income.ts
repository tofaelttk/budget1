import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IIncomeSource extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  type: 'salary' | 'freelance' | 'investment' | 'business' | 'other';
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  nextPayment: Date;
  isActive: boolean;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIncomeRecord extends Document {
  userId: mongoose.Types.ObjectId;
  sourceId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const IncomeSourceSchema: Schema<IIncomeSource> = new Schema({
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
  type: {
    type: String,
    enum: ['salary', 'freelance', 'investment', 'business', 'other'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  frequency: {
    type: String,
    enum: ['weekly', 'biweekly', 'monthly', 'yearly'],
    required: true
  },
  nextPayment: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: '#10b981'
  }
}, {
  timestamps: true
});

const IncomeRecordSchema: Schema<IIncomeRecord> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sourceId: {
    type: Schema.Types.ObjectId,
    ref: 'IncomeSource',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create indexes
IncomeSourceSchema.index({ userId: 1, isActive: 1 });
IncomeSourceSchema.index({ userId: 1, nextPayment: 1 });

IncomeRecordSchema.index({ userId: 1, date: -1 });
IncomeRecordSchema.index({ sourceId: 1, date: -1 });

export const IncomeSource = (mongoose.models.IncomeSource as Model<IIncomeSource>) || mongoose.model<IIncomeSource>('IncomeSource', IncomeSourceSchema);
export const IncomeRecord = (mongoose.models.IncomeRecord as Model<IIncomeRecord>) || mongoose.model<IIncomeRecord>('IncomeRecord', IncomeRecordSchema);
