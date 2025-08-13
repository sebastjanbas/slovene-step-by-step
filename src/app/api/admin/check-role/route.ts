import { NextResponse } from 'next/server';
import { checkRole } from '@/utils/roles';

export async function GET() {
  // Check if the user is an admin
  if (!checkRole('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ role: 'admin' });
}
