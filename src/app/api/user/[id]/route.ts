import { NextResponse } from 'next/server';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: '유효한 id를 제공해주세요.' }, { status: 400 });
    }

    const body = await request.json();
    const { nickname } = body;

    const updatedNickname: Partial<typeof usersTable.$inferInsert> = {};

    if (nickname) updatedNickname.nickname = nickname;

    if (Object.keys(updatedNickname).length === 0) {
      return NextResponse.json({ error: '수정할 필드가 없습니다.' }, { status: 400 });
    }

    const result = await db
      .update(usersTable)
      .set(updatedNickname)
      .where(eq(usersTable.id, id))
      .returning({
        nickname: usersTable.nickname,
      })
      .get();

    if (!result) {
      return NextResponse.json({ error: '사용자 정보를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: '닉네임 수정에 실패했습니다.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: '유효한 사용자 ID를 제공해주세요.' }, { status: 400 });
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).get();

    if (!user) {
      return NextResponse.json({ error: '해당 사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    await db.delete(usersTable).where(eq(usersTable.id, id));

    return NextResponse.json({ message: '사용자가 성공적으로 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: '사용자 삭제에 실패했습니다.' }, { status: 500 });
  }
}
