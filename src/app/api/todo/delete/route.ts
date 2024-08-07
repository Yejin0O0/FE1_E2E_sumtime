import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '../../../../db';

export async function DELETE(req: NextRequest) {
  const { todoId } = await req.json();

  if (!todoId) {
    return NextResponse.json({ error: 'TodoID is required' }, { status: 400 });
  }

  try {
    const result = await db
      .delete(schema.todosTable)
      .where(eq(schema.todosTable.todoId, parseInt(todoId, 10)))
      .execute();

    if (result.rowsAffected > 0) {
      return NextResponse.json({ message: 'todo deleted successfully' });
    }
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to delete todo', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to delete todo', details: 'Unknown error occurred' }, { status: 500 });
  }
}
