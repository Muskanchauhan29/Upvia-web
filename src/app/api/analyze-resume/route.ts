import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI only if API key is available
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('API: Starting resume analysis...');
    
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    const jobRole = formData.get('jobRole') as string;

    console.log('API: File received:', file?.name, 'Type:', file?.type);
    console.log('API: Job role:', jobRole);

    if (!file) {
      console.log('API: No file uploaded');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Extract text from file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let text = '';

    if (file.type === 'application/pdf') {
      // For PDF files, you'd need a PDF parser
      // For now, we'll assume it's text-based
      text = buffer.toString('utf-8');
    } else if (file.type === 'text/plain') {
      text = buffer.toString('utf-8');
    } else {
      text = buffer.toString('utf-8');
    }

    console.log('API: Text extracted, length:', text.length);

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log('API: No OpenAI key, using fallback analysis');
      // Fallback to basic rule-based analysis
      const analysis = analyzeResumeBasic(text, jobRole);
      console.log('API: Basic analysis completed, score:', analysis.atsScore);
      
      return NextResponse.json({
        success: true,
        analysis,
        fileName: file.name,
        jobRole
      });
    }

    console.log('API: Using OpenAI for analysis');
    // AI Analysis using OpenAI
    const prompt = `You are an expert ATS (Applicant Tracking System) analyst and career coach. Analyze this resume comprehensively:

Resume Text:
${text}

Target Job Role: ${jobRole || 'General Position'}

Provide a detailed ATS evaluation in exactly this JSON format:
{
  "atsScore": number between 0-100,
  "strengths": ["array of 3-5 specific strengths with examples"],
  "weaknesses": ["array of 3-5 specific weaknesses with examples"],
  "improvements": ["array of 5-7 actionable improvements with specific examples"],
  "suggestions": ["array of 5-7 AI-powered suggestions with rewrite examples"],
  "sections": {
    "summary": boolean,
    "experience": boolean,
    "education": boolean,
    "skills": boolean,
    "projects": boolean
  }
}

SCORING CRITERIA (0-100):
- Format & Structure (20 points): Clean layout, proper sections, readable fonts
- Content Quality (25 points): Action verbs, quantifiable achievements, impact statements
- ATS Compatibility (25 points): Keywords, proper formatting, no tables/images
- Role Alignment (20 points): Relevant skills and experience for target role
- Completeness (10 points): All essential sections present

IMPROVEMENTS SHOULD INCLUDE:
- Specific formatting fixes
- Missing sections to add
- Weak bullet points to strengthen
- Keywords to include
- Quantifiable metrics to add

AI SUGGESTIONS SHOULD INCLUDE:
- Rewritten bullet point examples
- Better action verb alternatives
- Industry-specific terminology
- Modern resume trends
- ATS optimization tips

Focus on practical, actionable advice that will significantly improve the resume's ATS performance and job search effectiveness.`;

    try {
      if (!openai) {
        throw new Error('OpenAI client not initialized');
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000,
        temperature: 0.1,
      });

      console.log('API: OpenAI response received');
      console.log('API: Response choices:', completion.choices.length);
      
      if (!completion.choices || completion.choices.length === 0) {
        throw new Error('No response from OpenAI');
      }

      const content = completion.choices[0]?.message?.content;
      console.log('API: Response content type:', typeof content);
      console.log('API: Response content preview:', content?.substring(0, 200));
      
      if (!content) {
        throw new Error('No content in OpenAI response');
      }

      let analysis;
      try {
        analysis = JSON.parse(content);
        console.log('API: JSON parsed successfully');
      } catch (parseError) {
        console.error('API: JSON parse error:', parseError);
        console.error('API: Raw content that failed to parse:', content);
        // Fallback to basic analysis
        analysis = analyzeResumeBasic(text, jobRole);
        console.log('API: Using fallback analysis due to parse error');
      }

      console.log('API: Final analysis score:', analysis.atsScore);
      
      return NextResponse.json({
        success: true,
        analysis,
        fileName: file.name,
        jobRole
      });

    } catch (openaiError) {
      console.error('API: OpenAI API error:', openaiError);
      
      // Fallback to basic analysis
      try {
        const analysis = analyzeResumeBasic(text, jobRole);
        console.log('API: Fallback analysis completed, score:', analysis.atsScore);
        
        return NextResponse.json({
          success: true,
          analysis,
          fileName: file.name,
          jobRole
        });
      } catch (fallbackError) {
        console.error('API: Fallback analysis failed:', fallbackError);
        return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
      }
    }

  } catch (error) {
    console.error('API: General error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}

// Basic rule-based analysis as fallback
function analyzeResumeBasic(text: string, jobRole: string) {
  const analysis = {
    atsScore: 0,
    strengths: [] as string[],
    weaknesses: [] as string[],
    improvements: [] as string[],
    suggestions: [] as string[],
    sections: {
      summary: false,
      experience: false,
      education: false,
      skills: false,
      projects: false
    }
  };

  const lowerText = text.toLowerCase();
  
  // Format & Structure (20 points)
  if (lowerText.includes('summary') || lowerText.includes('objective') || lowerText.includes('profile')) {
    analysis.sections.summary = true;
    analysis.atsScore += 8;
    analysis.strengths.push('Professional summary section present');
  } else {
    analysis.weaknesses.push('Missing professional summary');
    analysis.improvements.push('Add a 2-3 line professional summary highlighting your key qualifications');
  }

  if (lowerText.includes('experience') || lowerText.includes('work') || lowerText.includes('employment')) {
    analysis.sections.experience = true;
    analysis.atsScore += 8;
    analysis.strengths.push('Work experience section included');
  } else {
    analysis.weaknesses.push('No work experience section');
    analysis.improvements.push('Add detailed work experience with dates and responsibilities');
  }

  if (lowerText.includes('education') || lowerText.includes('academic') || lowerText.includes('degree')) {
    analysis.sections.education = true;
    analysis.atsScore += 4;
    analysis.strengths.push('Education section present');
  } else {
    analysis.weaknesses.push('Missing education section');
    analysis.improvements.push('Include your educational background and qualifications');
  }

  // Content Quality (25 points)
  const actionVerbs = ['managed', 'developed', 'implemented', 'created', 'led', 'improved', 'increased', 'reduced', 'achieved', 'coordinated', 'designed', 'optimized', 'launched', 'grew', 'transformed'];
  const actionVerbCount = actionVerbs.filter(verb => lowerText.includes(verb)).length;
  
  if (actionVerbCount >= 5) {
    analysis.atsScore += 15;
    analysis.strengths.push('Strong use of action verbs throughout resume');
  } else if (actionVerbCount >= 2) {
    analysis.atsScore += 8;
    analysis.improvements.push('Use more action verbs to start bullet points');
  } else {
    analysis.weaknesses.push('Limited use of action verbs');
    analysis.improvements.push('Start bullet points with strong action verbs like "managed", "developed", "implemented"');
  }

  // Check for quantifiable results (10 points)
  const hasNumbers = /\d+%|\$\d+|\d+ years|\d+ months|\d+ customers|\d+ users|\d+ projects/.test(text);
  if (hasNumbers) {
    analysis.atsScore += 10;
    analysis.strengths.push('Includes quantifiable achievements and metrics');
  } else {
    analysis.weaknesses.push('Lacks quantifiable achievements');
    analysis.improvements.push('Add specific numbers, percentages, and metrics to demonstrate impact');
  }

  // ATS Compatibility (25 points)
  if (lowerText.includes('skills') || lowerText.includes('technical') || lowerText.includes('competencies')) {
    analysis.sections.skills = true;
    analysis.atsScore += 10;
    analysis.strengths.push('Dedicated skills section included');
  } else {
    analysis.weaknesses.push('No dedicated skills section');
    analysis.improvements.push('Add a skills section listing your technical and soft skills');
  }

  if (lowerText.includes('project') || lowerText.includes('portfolio')) {
    analysis.sections.projects = true;
    analysis.atsScore += 8;
    analysis.strengths.push('Projects section showcases practical experience');
  } else {
    analysis.improvements.push('Consider adding a projects section to showcase your work');
  }

  // Check for ATS-friendly formatting
  const hasComplexFormatting = /[\u25cf\u2022\u25cb]|→|←|↔|↑|↓/.test(text);
  if (!hasComplexFormatting) {
    analysis.atsScore += 7;
    analysis.strengths.push('ATS-friendly formatting with simple bullets');
  } else {
    analysis.weaknesses.push('May contain ATS-unfriendly characters');
    analysis.improvements.push('Use standard bullet points (•) instead of special characters');
  }

  // Role Alignment (20 points)
  if (jobRole) {
    const roleKeywords = getRoleKeywords(jobRole);
    const matchedKeywords = roleKeywords.filter(keyword => 
      lowerText.includes(keyword.toLowerCase())
    );
    
    const alignmentScore = (matchedKeywords.length / roleKeywords.length) * 20;
    analysis.atsScore += Math.round(alignmentScore);
    
    if (matchedKeywords.length > roleKeywords.length * 0.7) {
      analysis.strengths.push(`Strong alignment with ${jobRole} role requirements`);
    } else if (matchedKeywords.length > roleKeywords.length * 0.4) {
      analysis.improvements.push(`Add more keywords specific to ${jobRole} positions`);
    } else {
      analysis.weaknesses.push(`Limited keywords relevant to ${jobRole} role`);
      analysis.improvements.push(`Include more keywords specific to ${jobRole} positions`);
    }
  } else {
    analysis.atsScore += 10; // Default score for general role
  }

  // Completeness (10 points)
  const hasEmail = /\S+@\S+\.\S+/.test(text);
  const hasPhone = /\d{3}.*\d{3}.*\d{4}/.test(text);
  
  if (hasEmail && hasPhone) {
    analysis.atsScore += 5;
    analysis.strengths.push('Complete contact information provided');
  } else {
    analysis.weaknesses.push('Missing or incomplete contact information');
    analysis.improvements.push('Ensure your email and phone number are clearly visible');
  }

  // Check for LinkedIn or portfolio
  if (lowerText.includes('linkedin') || lowerText.includes('portfolio') || lowerText.includes('github')) {
    analysis.atsScore += 5;
    analysis.strengths.push('Includes professional links (LinkedIn/portfolio)');
  } else {
    analysis.improvements.push('Add LinkedIn profile or portfolio link');
  }

  // Ensure score is within bounds
  analysis.atsScore = Math.max(0, Math.min(100, analysis.atsScore));

  // Generate specific suggestions
  if (analysis.atsScore < 50) {
    analysis.suggestions.push('Consider a complete resume rewrite focusing on ATS optimization');
    analysis.suggestions.push('Use a clean, single-column format with standard fonts');
    analysis.suggestions.push('Include quantifiable achievements for each position');
    analysis.suggestions.push('Add relevant keywords from job descriptions');
    analysis.suggestions.push('Ensure all sections are clearly labeled and organized');
  } else if (analysis.atsScore < 70) {
    analysis.suggestions.push('Good foundation! Focus on strengthening weak bullet points');
    analysis.suggestions.push('Add more specific metrics and achievements');
    analysis.suggestions.push('Tailor your resume more specifically to target roles');
    analysis.suggestions.push('Consider adding a professional summary');
    analysis.suggestions.push('Include relevant certifications or training');
  } else {
    analysis.suggestions.push('Strong resume! Minor optimizations can further improve ATS performance');
    analysis.suggestions.push('Consider tailoring bullet points for specific job applications');
    analysis.suggestions.push('Add recent achievements or projects if available');
    analysis.suggestions.push('Review and update skills section regularly');
    analysis.suggestions.push('Consider adding a brief professional summary if missing');
  }

  return analysis;
}

function getRoleKeywords(role: string): string[] {
  const roleMap: { [key: string]: string[] } = {
    'software engineer': ['javascript', 'react', 'node.js', 'python', 'git', 'api', 'database', 'testing', 'agile', 'full-stack'],
    'data scientist': ['python', 'machine learning', 'statistics', 'sql', 'r', 'tensorflow', 'pytorch', 'data analysis', 'visualization'],
    'product manager': ['product strategy', 'roadmap', 'agile', 'scrum', 'user research', 'analytics', 'stakeholder management', 'kpi'],
    'marketing manager': ['digital marketing', 'seo', 'sem', 'content strategy', 'social media', 'analytics', 'campaign management', 'roi'],
    'sales manager': ['sales strategy', 'lead generation', 'crm', 'negotiation', 'account management', 'revenue growth', 'forecasting'],
    'project manager': ['project management', 'pmp', 'agile', 'scrum', 'risk management', 'budget', 'timeline', 'stakeholder']
  };

  const normalizedRole = role.toLowerCase();
  for (const [key, keywords] of Object.entries(roleMap)) {
    if (normalizedRole.includes(key)) {
      return keywords;
    }
  }
  
  return ['leadership', 'communication', 'teamwork', 'problem-solving', 'project management', 'analytical skills'];
}
