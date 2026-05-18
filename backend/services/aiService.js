import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sends the TOON formatted profile data, target JD, and optional custom instructions to the AI.
 * 
 * @param {string} toonProfile - The encoded TOON string of the user's profile
 * @param {string} jobDescription - The target job description text
 * @param {string} [additionalInstructions] - Optional custom instructions from the user
 * @returns {Promise<Object>} The optimized resume sections in a structured JSON object
 */
export const generateTailoredResumeData = async (toonProfile, jobDescription, additionalInstructions = '') => {
    
  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;
  const endpoint = process.env.GROQ_API_KEY 
    ? 'https://api.groq.com/openai/v1/chat/completions' 
    : 'https://api.openai.com/v1/chat/completions';

  if (!apiKey) {
    throw new Error('AI Provider API key missing in environment configuration.');
  }

  // Load the LaTeX template
  let resumeTemplate = '';
  try {
    const templatePath = path.join(__dirname, '../templates/resumeTemplate.tex');
    resumeTemplate = fs.readFileSync(templatePath, 'utf8');
  } catch (error) {
    console.error('Warning: Could not read resumeTemplate.tex', error);
    resumeTemplate = '% Could not load template. Generate a standard modern LaTeX resume.';
  }

  const systemPrompt = `You are an expert technical resume writer specializing in ATS optimization and LaTeX formatting. 
Your task is to identify every gap - missing keywords, weak verbs, vague claims, and skills they want that I haven't mentioned. Analyze the master profile (provided in token-saving TOON notation) and the target Job Description (JD). 

Match the language, mirror their priorities, and keep it to one page. Don't make anything up - be honest.
You must select the most relevant data and rewrite descriptions to optimize for keywords and impact. 

CRITICAL TEMPLATE INSTRUCTION:
You MUST strictly use the following LaTeX template. Do not change the preamble, document structure, margins, or macros unless absolutely necessary. Simply fill in the candidate's optimized data into this exact template structure.

--- START OF TEMPLATE ---
${resumeTemplate}
--- END OF TEMPLATE ---

CRITICAL: You must return your entire response as raw, valid, and fully compilable LaTeX code based heavily on the template above. Do not include markdown code blocks (\`\`\`latex), explanations, or any other text. Start directly with \\documentclass and end with \\end{document}.`;

  // Dynamically build the instruction block if the user provided modifications
  const instructionBlock = additionalInstructions.trim() 
    ? `CRITICAL USER CUSTOM MODIFICATIONS:
    Follow these specific stylistic/content directions from the user over default behavior:
    "${additionalInstructions}"`
    : '';

  const userPrompt = `USER MASTER PROFILE (TOON NOTATION):
---
${toonProfile}
---

TARGET JOB DESCRIPTION:
---
${jobDescription}
---

${instructionBlock}

Generate the tailored resume as valid LaTeX code. Pick only the top 2-3 most relevant projects and experiences that fit this specific job description. Ensure all bullet points use strong action verbs.`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.GROQ_API_KEY ? 'openai/gpt-oss-120b' : 'openai/gpt-oss-120b',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2 // Kept very low so it strictly adheres to user instructions without creative liberties
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let latexCode = data.choices[0].message.content.trim();
    // Strip markdown code block wrappers if the LLM accidentally includes them
    if (latexCode.startsWith('\`\`\`latex')) {
      latexCode = latexCode.substring(8).trim();
    } else if (latexCode.startsWith('\`\`\`')) {
      latexCode = latexCode.substring(3).trim();
    }
    if (latexCode.endsWith('\`\`\`')) {
      latexCode = latexCode.substring(0, latexCode.length - 3).trim();
    }
    
    return latexCode;
  } catch (error) {
    console.error('Failed to generate optimized resume payload via AI:', error);
    throw error;
  }
};