/**
 * Utility to encode PostgreSQL query results into TOON notation for LLM context optimization.
 */
export const encodeToTOON = (profileData) => {
  let toonString = '';

  // 1. Identity / Core User details
  toonString += `identity{\n  name: "${profileData.name || ''}",\n  email: "${profileData.email || ''}",\n  phone: "${profileData.phone || ''}"\n}\n\n`;

  // 2. Social Links
  if (profileData.social_links && profileData.social_links.length > 0) {
    toonString += `socials[${profileData.social_links.length}]{platform,url}:\n`;
    profileData.social_links.forEach(link => {
      toonString += `"${link.platform_name}","${link.url}"\n`;
    });
    toonString += '\n';
  }

  // 3. Education
  if (profileData.education && profileData.education.length > 0) {
    toonString += `education[${profileData.education.length}]{institution,degree,cgpa,timeline}:\n`;
    profileData.education.forEach(edu => {
      const timeline = `${edu.start_year || ''}-${edu.end_year || 'Present'}`;
      toonString += `"${edu.institution}","${edu.degree}","${edu.cgpa || ''}","${timeline}"\n`;
    });
    toonString += '\n';
  }

  // 4. Experience
  if (profileData.experience && profileData.experience.length > 0) {
    toonString += `experience[${profileData.experience.length}]{company,role,location,timeline,desc}:\n`;
    profileData.experience.forEach(exp => {
      const timeline = `${exp.start_date}-${exp.end_date || 'Present'}`;
      // Clean up string fields to avoid layout breaking newlines in TOON
      const sanitizedDesc = exp.description ? exp.description.replace(/\n/g, ' ') : '';
      toonString += `"${exp.company}","${exp.role}","${exp.location || ''}","${timeline}","${sanitizedDesc}"\n`;
    });
    toonString += '\n';
  }

  // 5. Projects
  if (profileData.projects && profileData.projects.length > 0) {
    toonString += `projects[${profileData.projects.length}]{title,techStack,liveUrl,desc}:\n`;
    profileData.projects.forEach(proj => {
      const sanitizedDesc = proj.description ? proj.description.replace(/\n/g, ' ') : '';
      toonString += `"${proj.title}","${proj.tech_stack}","${proj.live_url || ''}","${sanitizedDesc}"\n`;
    });
    toonString += '\n';
  }

  // 6. Skills
  if (profileData.skills && profileData.skills.length > 0) {
    toonString += `skills[${profileData.skills.length}]{category,list}:\n`;
    profileData.skills.forEach(skill => {
      toonString += `"${skill.category}","${skill.skills_list || ''}"\n`;
    });
    toonString += '\n';
  }

  // 7. Achievements & Extracurriculars
  if (profileData.achievements_extracurriculars && profileData.achievements_extracurriculars.length > 0) {
    toonString += `achievements[${profileData.achievements_extracurriculars.length}]{desc}:\n`;
    profileData.achievements_extracurriculars.forEach(ach => {
      const sanitizedDesc = ach.description ? ach.description.replace(/\n/g, ' ') : '';
      toonString += `"${sanitizedDesc}"\n`;
    });
    toonString += '\n';
  }

  return toonString.trim();
};