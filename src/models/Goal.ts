import mongoose, { Document, Schema } from 'mongoose';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: 'emergency-fund' | 'debt-payoff' | 'savings' | 'investment' | 'other';
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Goal title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  targetAmount: {
    type: Number,
    required: [true, 'Target amount is required'],
    min: [0, 'Target amount cannot be negative'],
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: [0, 'Current amount cannot be negative'],
  },
  targetDate: {
    type: Date,
    required: [true, 'Target date is required'],
  },
  category: {
    type: String,
    enum: ['emergency-fund', 'debt-payoff', 'savings', 'investment', 'other'],
    required: [true, 'Goal category is required'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Virtual for progress percentage
GoalSchema.virtual('progressPercentage').get(function(this: IGoal) {
  return Math.min((this.currentAmount / this.targetAmount) * 100, 100);
});

// Virtual for remaining amount
GoalSchema.virtual('remainingAmount').get(function(this: IGoal) {
  return Math.max(this.targetAmount - this.currentAmount, 0);
});

// Virtual for days remaining
GoalSchema.virtual('daysRemaining').get(function(this: IGoal) {
  const now = new Date();
  const timeDiff = this.targetDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
});

export default mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);
