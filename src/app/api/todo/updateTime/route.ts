import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/db';

export async function PUT(req: NextRequest) {
  const { todoId, startTime, endTime } = await req.json();

  try {
    // 업데이트할 필드 동적 설정
    const updateFields: Partial<{ startTime: string | null; endTime: string | null }> = {};
    if (startTime !== undefined && startTime !== null) {
      updateFields.startTime = startTime;
    }
    if (endTime !== undefined && endTime !== null) {
      updateFields.endTime = endTime;
    }

    const result = await db
      .update(schema.todosTable)
      .set(updateFields)
      .where(eq(schema.todosTable.todoId, parseInt(todoId, 10)))
      .returning({
        todoId: schema.todosTable.todoId,
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
