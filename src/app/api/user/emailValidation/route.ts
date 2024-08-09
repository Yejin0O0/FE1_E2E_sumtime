import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
  }

  console.log('Received email:', email);

  try {
    const user = await db
      .select({
        userId: schema.usersTable.userId,
      })
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, email))
      .get();

    console.log('Query result:', user);

    if (user) {
      return NextResponse.json({ isValid: false });
    }
    return NextResponse.json({ isValid: true });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user', details: (error as Error).message }, { status: 500 });
  }
}
