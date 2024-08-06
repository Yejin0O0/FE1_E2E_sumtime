import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../../db';

export async function POST(req: NextRequest) {
  const { todoId } = await req.json();

  if (!todoId) {
    return NextResponse.json({ error: 'todoId query parameter is required' }, { status: 400 });
  }

  console.log('Received id:', todoId);

  try {
    const todo = await db
      .select()
      .from(schema.todosTable)
      .where(eq(schema.todosTable.todoId, parseInt(todoId, 10)))
      .get();

    console.log('Query result:', todo);

    if (todo) {
      return NextResponse.json({ todo });
    }
    return NextResponse.json({ error: 'Todos not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching Todo:', error);
    return NextResponse.json({ error: 'Failed to fetch Todo', details: (error as Error).message }, { status: 500 });
  }
}
