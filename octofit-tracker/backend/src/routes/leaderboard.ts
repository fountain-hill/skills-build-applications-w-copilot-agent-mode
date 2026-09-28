import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').sort({ score: -1 });
  res.json(leaderboard);
});

router.post('/', async (req, res) => {
  const entry = new LeaderboardEntry(req.body);
  await entry.save();
  res.status(201).json(entry);
});

export default router;
