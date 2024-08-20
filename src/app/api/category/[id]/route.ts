import { NextResponse } from 'next/server';
import { db } from '@/db';
import { categoriesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: '유효한 카테고리 ID를 제공해 주세요.' }, { status: 400 });
    }

    const category = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id)).get();

    if (!category) {
      return NextResponse.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
    }

    const filteredCategory = {
      id: category.id,
      title: category.title,
      color: category.color,
      isReported: category.isReported,
    };

    return NextResponse.json(filteredCategory, { status: 200 });
  } catch (error) {
    console.error('카테고리 조회 중 오류 발생:', error);
    return NextResponse.json({ error: '카테고리 조회 중 오류 발생' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: '유효한 id를 제공해주세요.' }, { status: 400 });
    }

    const body = await request.json();
    const { title, color, isReported } = body;

    // 업데이트할 필드만 선택합니다.
    const updatedCategory: Partial<typeof categoriesTable.$inferInsert> = {};

    if (title) updatedCategory.title = title;
    if (color) updatedCategory.color = color;
    if (typeof isReported === 'number') updatedCategory.isReported = isReported;

    if (Object.keys(updatedCategory).length === 0) {
      return NextResponse.json({ error: '수정할 필드가 없습니다.' }, { status: 400 });
    }

    const result = await db
      .update(categoriesTable)
      .set(updatedCategory)
      .where(eq(categoriesTable.id, id))
      .returning({
        id: categoriesTable.id,
        title: categoriesTable.title,
        color: categoriesTable.color,
        isReported: categoriesTable.isReported,
      })
      .get();

    if (!result) {
      return NextResponse.json({ error: '카테고리를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: '카테고리 수정에 실패했습니다.' }, { status: 500 });
  }
}
