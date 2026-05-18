import express from 'express';
import { saveProfile, getProfile } from '../controllers/profileController.js';

const router = express.Router();

// POST /api/profile
router.post('/', saveProfile);

// GET /api/profile/:userId
router.get('/:userId', getProfile);

export default router;