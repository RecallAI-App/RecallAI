import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId ) {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        quota: 6,
      },
    })

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Error creating user quota:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
