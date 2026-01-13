import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import ResumeHistory from '@/models/ResumeHistory';

export async function GET(request: NextRequest) {
  try {
    console.log('API: Fetching resume history...');
    
    const user = await currentUser();
    if (!user) {
      console.log('API: No user found, returning 401');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('API: User authenticated:', user.id);
    console.log('API: Connecting to MongoDB...');
    
    await connectToDatabase();

    console.log('API: Querying history for user:', user.id);
    const history = await ResumeHistory.find({ userId: user.id })
      .sort({ timestamp: -1 })
      .limit(20)
      .lean();

    console.log('API: Found', history.length, 'history items');
    return NextResponse.json({ success: true, history });
  } catch (error) {
    console.error('API: Error fetching resume history:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('API: Starting resume history save...');
    
    const user = await currentUser();
    if (!user) {
      console.log('API: No user found, returning 401');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('API: User authenticated:', user.id);

    const body = await request.json();
    console.log('API: Request body:', body);
    
    const { fileName, jobRole, atsScore, analysis } = body;

    if (!fileName || !atsScore || !analysis) {
      console.log('API: Missing required fields:', { fileName, atsScore, hasAnalysis: !!analysis });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('API: Connecting to MongoDB...');
    await connectToDatabase();

    const historyItem = new ResumeHistory({
      userId: user.id,
      fileName,
      jobRole: jobRole || 'Not specified',
      atsScore,
      analysis
    });

    console.log('API: Saving history item...');
    const savedItem = await historyItem.save();
    console.log('API: Save successful, ID:', savedItem._id);

    return NextResponse.json({ 
      success: true, 
      historyItem: savedItem
    });
  } catch (error) {
    console.error('API: Error saving resume history:', error);
    return NextResponse.json({ 
      error: 'Failed to save history', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
