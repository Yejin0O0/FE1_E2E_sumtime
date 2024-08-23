import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/db';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { todoId: string } }) {
  const { todoId } = params;
  if (!todoId) {
    return NextResponse.json({ error: 'URL path parameter (todoId) is required' }, { status: 400 });
  }

  try {
    const todo = await db
      .select()
      .from(schema.todosTable)
      .where(eq(schema.todosTable.id, parseInt(todoId, 10)))
      .get();

    if (todo) {
      return NextResponse.json({ todo });
    }
    return NextResponse.json({ error: 'Todos not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Todo', details: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { todoId, title, content, startTime, endTime, color } = await req.json();

  try {
    // 업데이트할 필드 동적 설정
    const result = await db
      .update(schema.todosTable)
      .set({
        ...(!!title && { title }),
        ...(!!content && { content }),
        ...(!!startTime && { startTime }),
        ...(!!endTime && { endTime }),
        ...(!!color && { color }),
      })
      .where(eq(schema.todosTable.id, parseInt(todoId, 10)))
      .returning({
        todoId: schema.todosTable.id,
        title: schema.todosTable.title,
        content: schema.todosTable.content,
        startTime: schema.todosTable.startTime,
        endTime: schema.todosTable.endTime,
        color: schema.todosTable.color,
        userId: schema.todosTable.userId,
      });

    if (result.length > 0) {
      const updatedTodo = result[0];
      return NextResponse.json({ todo: updatedTodo });
    }
    return NextResponse.json({ error: 'Todo not found or no changes made' }, { status: 404 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to update todo', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to update todo', details: 'Unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { todoId: string } }) {
  const { todoId } = params;

  if (!todoId) {
    return NextResponse.json({ error: 'TodoID is required' }, { status: 400 });
  }

  try {
    const result = await db
      .delete(schema.todosTable)
      .where(eq(schema.todosTable.id, parseInt(todoId, 10)))
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
