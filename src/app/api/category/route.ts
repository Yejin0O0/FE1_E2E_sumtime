import { NextResponse } from 'next/server';
import { db } from '@/db';
import { InsertCategory, categoriesTable } from '@/db/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, color, isDisplayed } = body;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'unAuthorized Error' }, { status: 401 });
    }

    const userId = session.user.id;

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
    });

    return NextResponse.json(insertedCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const categories = await db.select().from(categoriesTable).all();
    const filteredCategories = categories.map(({ createdAt, updatedAt, ...category }) => category);

    return NextResponse.json({ categories: filteredCategories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
