import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/db';
import { and, eq } from 'drizzle-orm';
import { parseISO } from 'date-fns';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// 새로운 to-do 생성
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unAuthorized Error' }, { status: 401 });
  }

  const userId = session.user.id;
  const { title, date, content, startTime, endTime, color, categoryId } = await req.json();

  try {
    const formatedDisplayingDate = new Date(date).toDateString();

    const result = await db
      .insert(schema.todosTable)
      .values({
        title,
        content,
        date: formatedDisplayingDate,
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
        isProgress: schema.todosTable.isProgress,
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

// date만 params로 받고, sesion으로 userId를 가져와서 해당 날짜의 To-do 가져오기
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'unAuthorized Error' }, { status: 401 });
  }

  const userId = session.user.id;
  const { searchParams } = req.nextUrl;
  const dateParam = searchParams.get('date');

  if (!dateParam) {
    return NextResponse.json({ error: 'date query parameter is required' }, { status: 400 });
  }

  const date = parseISO(dateParam).toDateString();
  const query = db
    .select()
    .from(schema.todosTable)
    .where(and(eq(schema.todosTable.date, date), eq(schema.todosTable.userId, userId)));

  try {
    const todos = await query.all();
    if (todos.length > 0) {
      return NextResponse.json({ todos });
    }
    return NextResponse.json({ todos: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Todos', details: (error as Error).message }, { status: 500 });
  }
}
