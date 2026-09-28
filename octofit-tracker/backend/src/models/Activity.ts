import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
