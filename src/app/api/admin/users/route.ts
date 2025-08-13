import { NextRequest, NextResponse } from 'next/server';
import { checkRole } from '@/utils/roles';
import { clerkClient } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  // Check if the user is an admin
  if (!checkRole('admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clerkClient();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('search');

    const users = query
      ? (await client.users.getUserList({ query })).data
      : (await client.users.getUserList()).data;

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
