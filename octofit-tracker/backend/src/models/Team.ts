import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
