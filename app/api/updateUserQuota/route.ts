import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  try {
    const { userId, quota } = await request.json();

    if (!userId || typeof quota !== 'number') {
      return NextResponse.json({ success: false, error: 'Invalid input' }, { status: 400 });
    }

    const user = await clerkClient.users.getUser(userId);
    const currentQuota = Number(user.publicMetadata.quota);

    if (currentQuota > 0) {
      const updatedQuota = currentQuota - 1;

      const finalQuota = updatedQuota;

      await clerkClient.users.updateUser(userId, {
        publicMetadata: {
          quota: finalQuota,
        },
      });

      return NextResponse.json({ success: true, updatedQuota: finalQuota }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, error: 'Daily Quota is already exceeded. Please try again later.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating user quota:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
