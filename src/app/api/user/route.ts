import { NextRequest, NextResponse } from 'next/server';
import { db, schema } from '@/db';

export async function POST(req: NextRequest) {
  const { email, password, nickname } = await req.json();

  try {
    const result = await db.transaction(async (tx) => {
      const userResult = await tx
        .insert(schema.usersTable)
        .values({
          email,
          password,
          nickname,
        })
        .returning({ userId: schema.usersTable.id });

      if (userResult.length === 0) {
        throw new Error('Failed to add user');
      }

      const { userId } = userResult[0];

      const categoryResult = await tx
        .insert(schema.categoriesTable)
        .values({
          title: '기본 카테고리',
          color: '#d3d3d3',
          isDisplayed: 1,
          isDefault: 1,
          userId,
        })
        .returning({ categoryId: schema.categoriesTable.id });

      if (categoryResult.length === 0) {
        throw new Error('Failed to add category');
      }

      return userId;
    });

    return NextResponse.json({ message: 'User and Default Category added successfully', userId: result });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to add user and category', details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to add user and category', details: 'Unknown error occurred' }, { status: 500 });
  }
}
