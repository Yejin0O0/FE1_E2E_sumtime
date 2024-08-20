import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/db';

export async function POST(req: NextRequest) {
  const { userId, title, date, content, startTime, endTime, color, categoryId } = await req.json();

  try {
    const formattedCreatedAt = new Date(date).toDateString();

    const result = await db
      .insert(schema.todosTable)
      .values({
        title,
        content,
        date: formattedCreatedAt,
        startTime,
        endTime,
        color,
        userId,
        categoryId,
      })
      .returning({
        todoId: schema.todosTable.id,
        title: schema.todosTable.title,
        content: schema.todosTable.content,
        startTime: schema.todosTable.startTime,
        endTime: schema.todosTable.endTime,
        color: schema.todosTable.color,
        userId: schema.todosTable.userId,
        categoryId: schema.todosTable.categoryId,
        date: schema.todosTable.date,
      });
    const insertedTodo = result[0];

    return NextResponse.json({ todo: insertedTodo });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to add todo', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to add todo', details: 'Unknown error occurred' }, { status: 500 });
  }
}
