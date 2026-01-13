import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import ResumeHistory from '@/models/ResumeHistory';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'Invalid history ID' }, { status: 400 });
    }

    await connectToDatabase();

    const result = await ResumeHistory.deleteOne({
      _id: id,
      userId: user.id
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'History item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'History item deleted' });
  } catch (error) {
    console.error('Error deleting resume history:', error);
    return NextResponse.json({ error: 'Failed to delete history' }, { status: 500 });
  }
}
