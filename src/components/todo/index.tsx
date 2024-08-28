'use client';

import React, { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setDisplayingDate, setSessionId } from '@/lib/todos/todoDataSlice';
import TodoHeader from '@/components/todo/TodoHeader';
import TodoPagination from '@/components/todo/TodoPagination';
import TodoCalendar from '@/components/todo/TodoCalendar';
import TodoReport from '@/components/todo/TodoReport';
import TodoList from '@/components/todo/TodoList/index';
import * as S from '@/components/todo/Todo.styled';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { TODAY } from '@/constants';
import TodoModal from './TodoModal';

export default function Todo() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  // TodoPagination, TodoCalendar에서 선택한 날짜를 가져옴
  const params = useParams();
  const { year, month, day } = params;

  const nowDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const nowHour = nowDate.getHours();
  const nowMin = nowDate.getHours();
  const nowSecond = nowDate.getHours();

  console.log(
    '범인: ',
    new Date(
      new Date(Number(year), Number(month) - 1, Number(day), nowHour, nowMin, nowSecond).toLocaleString('en-US', {
        timeZone: 'Asia/Seoul',
      }),
    ),
  );

  const displayingDate = useMemo(() => {
    return year && month && day
      ? new Date(
          new Date(Number(year), Number(month) - 1, Number(day), nowHour, nowMin, nowSecond).toLocaleString('en-US', {
            timeZone: 'Asia/Seoul',
          }),
        )
      : TODAY;
  }, [year, month, day]);

  // sessionId가 변경될 때마다 redux store에 저장
  useEffect(() => {
    if (sessionId) {
      dispatch(setSessionId(sessionId));
    }
  }, [sessionId, dispatch]);

  // displayingDate가 변경될 때마다 redux store에 저장
  useEffect(() => {
    dispatch(setDisplayingDate(displayingDate));
  }, [displayingDate, dispatch]);

  return (
    <S.TodoSection>
      <TodoHeader />
      <TodoCalendar />
      <TodoPagination />
      <TodoList />
      <TodoReport />
      <TodoModal />
    </S.TodoSection>
  );
}
