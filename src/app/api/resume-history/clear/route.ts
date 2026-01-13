import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import ResumeHistory from '@/models/ResumeHistory';

export async function DELETE(request: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const result = await ResumeHistory.deleteMany({ userId: user.id });

    return NextResponse.json({ 
      success: true, 
      message: `Cleared ${result.deletedCount} history items` 
    });
  } catch (error) {
    console.error('Error clearing resume history:', error);
    return NextResponse.json({ error: 'Failed to clear history' }, { status: 500 });
  }
}
