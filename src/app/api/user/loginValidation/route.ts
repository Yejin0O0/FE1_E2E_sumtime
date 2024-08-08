import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { db, schema } from '../../../../db';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password is required' }, { status: 400 });
  }

  console.log('Received email and password', email, password);

  try {
    const user = await db
      .select({
        userId: schema.usersTable.userId,
        email: schema.usersTable.email,
        nickname: schema.usersTable.nickname,
      })
      .from(schema.usersTable)
      .where(and(eq(schema.usersTable.email, email), eq(schema.usersTable.password, password)))
      .get();

    console.log('Query result:', user);

    if (user) {
      return NextResponse.json({ user });
    }
    return NextResponse.json({ isValid: false });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user', details: (error as Error).message }, { status: 500 });
  }
}
