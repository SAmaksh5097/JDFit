import express from 'express';
import { generateResume, getResumes, getResume } from '../controllers/resumeController.js';

const router = express.Router();

// POST /api/resume/generate
router.post('/generate', generateResume);

// GET /api/resume/user/:userId
router.get('/user/:userId', getResumes);

// GET /api/resume/:id?userId=...
router.get('/:id', getResume);

export default router;