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
