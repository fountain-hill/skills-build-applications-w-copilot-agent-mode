import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Team } from '../models/Team.js';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Ava Patel', email: 'ava@example.com', fitnessLevel: 'Advanced' },
      { name: 'Noah Lee', email: 'noah@example.com', fitnessLevel: 'Intermediate' },
      { name: 'Mila Johnson', email: 'mila@example.com', fitnessLevel: 'Beginner' },
      { name: 'Leo Garcia', email: 'leo@example.com', fitnessLevel: 'Advanced' },
    ]);

    const alphaTeam = await Team.create({
      name: 'Alpha Squad',
      description: 'Consistency and performance group',
      members: [users[0]._id, users[1]._id],
    });

    const betaTeam = await Team.create({
      name: 'Beta Burners',
      description: 'Endurance and conditioning team',
      members: [users[2]._id, users[3]._id],
    });

    await User.updateMany(
      { _id: { $in: [users[0]._id, users[1]._id] } },
      { $set: { team: alphaTeam._id } }
    );

    await User.updateMany(
      { _id: { $in: [users[2]._id, users[3]._id] } },
      { $set: { team: betaTeam._id } }
    );

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 45,
        caloriesBurned: 520,
        date: new Date(),
      },
      {
        user: users[1]._id,
        type: 'Strength',
        durationMinutes: 60,
        caloriesBurned: 610,
        date: new Date(),
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date(),
      },
      {
        user: users[3]._id,
        type: 'HIIT',
        durationMinutes: 25,
        caloriesBurned: 480,
        date: new Date(),
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, score: 980, rank: 1 },
      { user: users[1]._id, score: 945, rank: 2 },
      { user: users[2]._id, score: 920, rank: 3 },
      { user: users[3]._id, score: 890, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        name: 'Power Circuit',
        category: 'Strength',
        durationMinutes: 30,
        difficulty: 'Hard',
        description: 'Full-body circuit of squats, push-ups, and kettlebell swings.',
      },
      {
        name: 'Tempo Run',
        category: 'Cardio',
        durationMinutes: 40,
        difficulty: 'Moderate',
        description: 'A steady-paced run focused on aerobic endurance.',
      },
      {
        name: 'Mobility Reset',
        category: 'Recovery',
        durationMinutes: 20,
        difficulty: 'Easy',
        description: 'Gentle stretch and mobility routine to support recovery.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
