import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: 'emergency' | 'vacation' | 'house' | 'car' | 'education' | 'debt' | 'investment' | 'other';
  priority: 'high' | 'medium' | 'low';
  color: string;
  icon: string;
  isCompleted: boolean;
  completedDate?: Date;
  monthlyContribution: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContribution extends Document {
  userId: mongoose.Types.ObjectId;
  goalId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema<IGoal> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  targetAmount: {
    type: Number,
    required: true,
    min: 0
  },
  currentAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  targetDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    enum: ['emergency', 'vacation', 'house', 'car', 'education', 'debt', 'investment', 'other'],
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  color: {
    type: String,
    default: '#6366f1'
  },
  icon: {
    type: String,
    default: 'Target'
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedDate: {
    type: Date
  },
  monthlyContribution: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

const ContributionSchema: Schema<IContribution> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  goalId: {
    type: Schema.Types.ObjectId,
    ref: 'Goal',
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
GoalSchema.index({ userId: 1, isCompleted: 1 });
GoalSchema.index({ userId: 1, targetDate: 1 });
GoalSchema.index({ userId: 1, priority: 1 });

ContributionSchema.index({ userId: 1, date: -1 });
ContributionSchema.index({ goalId: 1, date: -1 });

export const Goal = (mongoose.models.Goal as Model<IGoal>) || mongoose.model<IGoal>('Goal', GoalSchema);
export const Contribution = (mongoose.models.Contribution as Model<IContribution>) || mongoose.model<IContribution>('Contribution', ContributionSchema);
