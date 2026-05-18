import db from '../config/db.js';

export const saveResumeToDB = async (userId, resumeName, companyName, latexCode) => {
    try {
        const result = await db.query(
            `INSERT INTO resumes (user_id, resume_name, company_name, latex_code)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [userId, resumeName, companyName, latexCode]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error saving resume to DB:', error);
        throw error;
    }
};

export const getResumesByUserId = async (userId) => {
    try {
        const result = await db.query(
            `SELECT * FROM resumes WHERE user_id = $1 ORDER BY created_at DESC`,
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.error('Error fetching resumes from DB:', error);
        throw error;
    }
};

export const getResumeByIdAndUser = async (resumeId, userId) => {
    try {
        const result = await db.query(
            `SELECT * FROM resumes WHERE id = $1 AND user_id = $2`,
            [resumeId, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching resume from DB:', error);
        throw error;
    }
};
