import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    currency: string;
    dateFormat: string;
    notifications: {
      email: boolean;
      push: boolean;
      reminders: boolean;
    };
    theme: 'light' | 'dark' | 'auto';
  };
  profile: {
    monthlyIncome: number;
    emergencyFundGoal: number;
    riskTolerance: 'low' | 'medium' | 'high';
  };
}

const UserSchema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  preferences: {
    currency: {
      type: String,
      default: 'USD'
    },
    dateFormat: {
      type: String,
      default: 'MM/DD/YYYY'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      },
      reminders: {
        type: Boolean,
        default: true
      }
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'dark'
    }
  },
  profile: {
    monthlyIncome: {
      type: Number,
      default: 0
    },
    emergencyFundGoal: {
      type: Number,
      default: 10000
    },
    riskTolerance: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    }
  }
}, {
  timestamps: true
});

// Create indexes
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: -1 });

// Export the model
export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
