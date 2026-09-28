import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: string;
  durationMinutes: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  description: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'], required: true },
  description: { type: String, required: true },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
