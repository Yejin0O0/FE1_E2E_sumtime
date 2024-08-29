import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
  }

  try {
    const user = await db
      .select({
        userId: schema.usersTable.id,
      })
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, email))
      .get();

    if (user) {
      return NextResponse.json({ userId: user.userId });
    }
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user', details: (error as Error).message }, { status: 500 });
  }
}
