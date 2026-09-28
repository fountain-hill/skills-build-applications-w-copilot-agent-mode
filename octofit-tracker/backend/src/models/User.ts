import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessLevel: string;
  team?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  fitnessLevel: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>('User', userSchema);
