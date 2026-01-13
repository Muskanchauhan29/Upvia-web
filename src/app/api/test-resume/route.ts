import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Resume API is working',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Test API: Received request');
    
    const formData = await request.formData();
    const file = formData.get('resume') as File;
    const jobRole = formData.get('jobRole') as string;

    console.log('Test API: File:', file?.name);
    console.log('Test API: Job role:', jobRole);

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Simple test analysis
    const testAnalysis = {
      atsScore: 75,
      strengths: ['Test strength 1', 'Test strength 2'],
      weaknesses: ['Test weakness 1'],
      improvements: ['Test improvement 1', 'Test improvement 2'],
      suggestions: ['Test suggestion 1'],
      sections: {
        summary: true,
        experience: true,
        education: true,
        skills: true,
        projects: false
      }
    };

    return NextResponse.json({
      success: true,
      analysis: testAnalysis,
      fileName: file.name,
      jobRole: jobRole || 'Not specified'
    });

  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
}
