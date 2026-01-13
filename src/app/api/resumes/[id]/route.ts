import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

const resumeStorage = new Map<string, any[]>();

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
    const userId = user.id;

    const userResumes = resumeStorage.get(userId) || [];
    const updatedResumes = userResumes.filter(resume => resume.id !== id);
    
    if (updatedResumes.length === userResumes.length) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    resumeStorage.set(userId, updatedResumes);

    return NextResponse.json({ 
      success: true, 
      message: 'Resume deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return NextResponse.json({ error: 'Failed to delete resume' }, { status: 500 });
  }
}
