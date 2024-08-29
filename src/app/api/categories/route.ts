import { NextResponse } from 'next/server';
import { db } from '@/db';
import { categoriesTable, InsertCategory } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unAuthorized Error' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const categories = await db.select().from(categoriesTable).where(eq(categoriesTable.userId, userId)).all();

    if (categories.length === 0) {
      return NextResponse.json({ error: '카테고리가 존재하지 않습니다.' }, { status: 404 });
    }

    const filteredCategories = categories.map(({ createdAt, updatedAt, ...category }) => category);

    return NextResponse.json({ categories: filteredCategories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'unAuthorized Error' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const { title, color, isDisplayed } = body;

    if (!title) {
      return NextResponse.json({ error: 'title 값을 입력해주세요' }, { status: 400 });
    }

    const newCategory: Pick<InsertCategory, 'title' | 'color' | 'isDisplayed' | 'userId'> = {
      title,
      color: color || null,
      isDisplayed: isDisplayed !== undefined ? isDisplayed : 1,
      userId,
    };

    const insertedCategory = await db.insert(categoriesTable).values(newCategory).returning({
      title: categoriesTable.title,
      color: categoriesTable.color,
      isDisplayed: categoriesTable.isDisplayed,
      id: categoriesTable.id,
    });

    return NextResponse.json(insertedCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
