import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../../db';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: 'UserID query parameter is required' }, { status: 400 });
  }

  try {
    const todos = await db
      .select()
      .from(schema.todosTable)
      .where(eq(schema.todosTable.userId, parseInt(userId, 10)))
      .all();

    if (todos.length > 0) {
      return NextResponse.json({ todos });
    }
    return NextResponse.json({ error: 'Todos not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Todos', details: (error as Error).message }, { status: 500 });
  }
}
