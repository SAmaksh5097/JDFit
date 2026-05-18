import db from '../config/db.js';

export const createProfile = async (profileData) => {
    const {
        clerkUserId,
        fullName, 
        email, 
        phone, 
        linkedin, 
        github,
        workExperience, 
        education, 
        skills, 
        projects
    } = profileData;

    try {
        await db.query('BEGIN');

        // 1. Insert or update User
        const userCheck = await db.query('SELECT id FROM users WHERE id = $1 OR email = $2', [clerkUserId, email]);
        
        if (userCheck.rows.length > 0) {
            await db.query('UPDATE users SET name = $1, phone = $2, email = $3 WHERE id = $4', [fullName, phone || null, email, clerkUserId]);
            // Delete old relations to replace with new ones
            await db.query('DELETE FROM experience WHERE user_id = $1', [clerkUserId]);
            await db.query('DELETE FROM education WHERE user_id = $1', [clerkUserId]);
            await db.query('DELETE FROM skills WHERE user_id = $1', [clerkUserId]);
            await db.query('DELETE FROM projects WHERE user_id = $1', [clerkUserId]);
            await db.query('DELETE FROM social_links WHERE user_id = $1', [clerkUserId]);
        } else {
            await db.query(
                'INSERT INTO users (id, name, email, phone) VALUES ($1, $2, $3, $4)',
                [clerkUserId, fullName, email, phone || null]
            );
        }

        // 2. Insert Social Links
        if (linkedin) {
            await db.query('INSERT INTO social_links (user_id, platform_name, url) VALUES ($1, $2, $3)', [clerkUserId, 'LinkedIn', linkedin]);
        }
        if (github) {
            await db.query('INSERT INTO social_links (user_id, platform_name, url) VALUES ($1, $2, $3)', [clerkUserId, 'GitHub', github]);
        }

        // 3. Insert Work Experience
        if (workExperience && workExperience.length > 0) {
            for (const exp of workExperience) {
                const startYear = exp[`startDate-${exp.id}`] ? parseInt(exp[`startDate-${exp.id}`].split('-')[0]) : 0;
                const endYear = exp[`endDate-${exp.id}`] ? parseInt(exp[`endDate-${exp.id}`].split('-')[0]) : null;
                
                await db.query(
                    'INSERT INTO experience (user_id, company, role, start_date, end_date, description) VALUES ($1, $2, $3, $4, $5, $6)',
                    [clerkUserId, exp[`company-${exp.id}`] || 'Unknown', exp[`role-${exp.id}`] || 'Unknown', startYear, endYear, exp[`workSummary-${exp.id}`] || '']
                );
            }
        }

        // 4. Insert Education
        if (education && education.length > 0) {
            for (const edu of education) {
                await db.query(
                    'INSERT INTO education (user_id, institution, degree, start_year, end_year, cgpa) VALUES ($1, $2, $3, $4, $5, $6)',
                    [clerkUserId, edu[`institution-${edu.id}`] || 'Unknown', edu[`degree-${edu.id}`] || 'Unknown', edu[`from-${edu.id}`] ? parseInt(edu[`from-${edu.id}`]) : null, edu[`to-${edu.id}`] ? parseInt(edu[`to-${edu.id}`]) : null, edu[`cgpa-${edu.id}`] || null]
                );
            }
        }

        // 5. Insert Skills
        if (skills && skills.length > 0) {
            for (const skill of skills) {
                await db.query(
                    'INSERT INTO skills (user_id, category, skills_list) VALUES ($1, $2, $3)',
                    [clerkUserId, skill[`skillHeading-${skill.id}`] || 'General', skill[`skillBullets-${skill.id}`] || '']
                );
            }
        }

        // 6. Insert Projects
        if (projects && projects.length > 0) {
            for (const proj of projects) {
                await db.query(
                    'INSERT INTO projects (user_id, title, tech_stack, live_url, description) VALUES ($1, $2, $3, $4, $5)',
                    [clerkUserId, proj[`projectName-${proj.id}`] || 'Untitled', proj[`projectRole-${proj.id}`] || '', proj[`projectUrl-${proj.id}`] || null, proj[`projectDescription-${proj.id}`] || '']
                );
            }
        }

        await db.query('COMMIT');
        return { id: clerkUserId, email, fullName };
    } catch (error) {
        await db.query('ROLLBACK');
        throw error;
    }
};

export const getProfileById = async (userId) => {
    const userResult = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) return null;
    
    const user = userResult.rows[0];

    const [experience, education, skills, projects, socialLinks] = await Promise.all([
        db.query('SELECT * FROM experience WHERE user_id = $1', [userId]),
        db.query('SELECT * FROM education WHERE user_id = $1', [userId]),
        db.query('SELECT * FROM skills WHERE user_id = $1', [userId]),
        db.query('SELECT * FROM projects WHERE user_id = $1', [userId]),
        db.query('SELECT * FROM social_links WHERE user_id = $1', [userId])
    ]);

    return {
        ...user,
        experience: experience.rows,
        education: education.rows,
        skills: skills.rows,
        projects: projects.rows,
        social_links: socialLinks.rows
    };
};