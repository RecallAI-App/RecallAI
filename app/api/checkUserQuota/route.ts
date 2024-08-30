import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    console.log('Received userId:', userId);

    if (!userId) {
      throw new Error('User ID is missing or invalid');
    }

    const user = await clerkClient.users.getUser(userId);

    const currentQuota = Number(user.publicMetadata?.quota ?? 0);
    console.log('Current quota:', currentQuota);

    return NextResponse.json({ success: true, quota: currentQuota }, { status: 200 });
    
  } catch (error) {
    console.error('Error updating user quota:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
