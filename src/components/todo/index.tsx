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
import TodoModal from './TodoModal';

export default function Todo() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  // TodoPagination, TodoCalendar에서 선택한 날짜를 가져옴
  const params = useParams();
  const { year, month, day } = params;

  const displayingDate = useMemo(() => {
    return year && month && day ? new Date(Number(year), Number(month) - 1, Number(day)) : new Date();
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
