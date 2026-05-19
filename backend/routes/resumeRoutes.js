import express from 'express';
import { generateResume, getResumes, getResume, updateResume } from '../controllers/resumeController.js';

const router = express.Router();

// POST /api/resume/generate
router.post('/generate', generateResume);

// GET /api/resume/user/:userId
router.get('/user/:userId', getResumes);

// PUT /api/resume/:id
router.put('/:id', updateResume);

// GET /api/resume/:id?userId=...
router.get('/:id', getResume);

export default router;