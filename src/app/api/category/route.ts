import { NextResponse } from 'next/server';
import { db } from '@/db';
import { InsertCategory, categoriesTable } from '@/db/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, color, isReported } = body;

    if (!title) {
      return NextResponse.json({ error: 'title 값을 입력해주세요' }, { status: 400 });
    }

    const newCategory: InsertCategory = {
      title,
      color: color || null,
      isReported: isReported !== undefined ? isReported : 1,
    };

    const insertedCategory = await db.insert(categoriesTable).values(newCategory).returning({
      id: categoriesTable.id,
      title: categoriesTable.title,
      color: categoriesTable.color,
      isReported: categoriesTable.isReported,
    });

    return NextResponse.json(insertedCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
