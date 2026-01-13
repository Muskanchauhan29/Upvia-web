import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { saveResumeToMongoDB, getResumesFromMongoDB } from '@/lib/mongodb-simple';

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('📊 Fetching resumes from admin -> user_resume...');
    const resumes = await getResumesFromMongoDB(user.id);

    return NextResponse.json({ 
      success: true, 
      resumes,
      message: `Found ${resumes.length} resumes in admin -> user_resume`,
      database: 'admin',
      collection: 'user_resume'
    });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { fileName, jobRole, atsScore, analysis, fileContent } = body;

    if (!fileName || !atsScore || !analysis) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const resumeData = {
      _id: Date.now().toString(),
      userId: user.id,
      fileName,
      jobRole: jobRole || 'Not specified',
      atsScore,
      analysis,
      fileContent: fileContent || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('💾 Saving resume to admin -> user_resume...');
    console.log('📍 Database: admin');
    console.log('📍 Collection: user_resume');
    console.log('📍 Document ID:', resumeData._id);

    // Save to MongoDB (creates backup file for Compass import)
    const result = await saveResumeToMongoDB(resumeData);

    console.log('✅ Resume saved successfully!');
    console.log('📁 Check the mongodb-backups folder for import files');
    console.log('🔍 You can now import to MongoDB Compass!');

    return NextResponse.json({ 
      success: true, 
      resume: resumeData,
      result,
      message: `Resume saved to admin -> user_resume! Check mongodb-backups folder for Compass import.`,
      instructions: [
        '1. Open MongoDB Compass',
        '2. Connect to: mongodb+srv://muskan:muskan@0509@cluster0.ffxypd2.mongodb.net/upvia',
        '3. Go to the admin database',
        '4. Select the user_resume collection',
        '5. Click "Import Data" and select files from mongodb-backups folder'
      ],
      databaseStructure: {
        database: 'admin',
        collection: 'user_resume',
        connection: 'mongodb+srv://muskan:muskan@0509@cluster0.ffxypd2.mongodb.net/upvia'
      }
    });
  } catch (error) {
    console.error('Error saving resume:', error);
    return NextResponse.json({ error: 'Failed to save resume' }, { status: 500 });
  }
}
