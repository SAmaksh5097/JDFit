import { createProfile, getProfileById } from '../models/profileModel.js';

export const saveProfile = async (req, res) => {
    try {
        const profileData = req.body;
        
        // Basic Validation
        if (!profileData.email || !profileData.fullName || !profileData.clerkUserId) {
            return res.status(400).json({ error: 'Full Name, Email, and User ID are required.' });
        }

        const savedProfile = await createProfile(profileData);
        res.status(201).json({ 
            message: 'Profile saved successfully.', 
            profile: savedProfile 
        });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ error: 'Failed to save profile. Please try again.' });
    }
};

export const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await getProfileById(userId);
        
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found.' });
        }

        res.status(200).json({ profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile. Please try again.' });
    }
};