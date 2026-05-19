import { getProfileById } from '../models/profileModel.js';
import { encodeToTOON } from '../services/toonEncoder.js';
import { generateTailoredResumeData } from '../services/aiService.js';
import { saveResumeToDB, getResumesByUserId, getResumeByIdAndUser } from '../models/resumeModel.js';

export const generateResume = async (req, res) => {
    try {
        const { userId, jobDescription, instructions } = req.body;

        if (!userId || !jobDescription) {
            return res.status(400).json({ error: 'userId and jobDescription are required.' });
        }

        // Fetch user profile from DB
        const profile = await getProfileById(userId);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found.' });
        }

        // Encode to TOON format
        const toonProfile = encodeToTOON(profile);

        // Generate tailored LaTeX using AI Service
        const latexCode = await generateTailoredResumeData(toonProfile, jobDescription, instructions || '');

        // Automatically save to DB
        const savedResume = await saveResumeToDB(userId, "Untitled Document", "Untitled company", latexCode);

        res.status(200).json({ latexCode, resumeId: savedResume.id });

    } catch (error) {
        console.error('Error generating resume:', error);
        res.status(500).json({ error: 'Failed to generate resume.' });
    }
};

export const getResumes = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ error: 'userId is required.' });
        }
        const resumes = await getResumesByUserId(userId);
        res.status(200).json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ error: 'Failed to fetch resumes.' });
    }
};

export const getResume = async (req, res) => {
    try {
        const { userId } = req.query;
        const { id } = req.params;
        
        if (!userId || !id) {
            return res.status(400).json({ error: 'userId and resume id are required.' });
        }
        
        const resume = await getResumeByIdAndUser(id, userId);
        if (!resume) {
            return res.status(404).json({ error: 'Resume not found or unauthorized.' });
        }
        
        res.status(200).json(resume);
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ error: 'Failed to fetch resume.' });
    }
};

export default { generateResume, getResumes, getResume };