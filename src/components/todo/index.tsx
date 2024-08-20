'use client';

import React, { useContext } from 'react';
import { TodoDataContext } from '@/context/TodoDataContext';
import { TodoUIContext } from '@/context/TodoUIContext';
import TodoHeader from '@/components/todo/TodoHeader';
import TodoPagination from '@/components/todo/TodoPagination';
import TodoCalendar from '@/components/todo/TodoCalendar';
import TodoReport from '@/components/todo/TodoReport';
import TodoList from '@/components/todo/TodoList';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';

export default function Todo() {
  const {
    // 데이터
    displayingDate,
    todoId,
    setTodoId,
  } = useContext(TodoDataContext);
  const {
    // 달력
    isCalendarOpen,
    toggleIsCalendarOpen,
    // 모달
    mode,
    setTodoModalMode,
    isModalOpen,
    setIsModalOpenTrue,
    setIsModalOpenFalse,
    isModalOpenedByFAB,
    setIsModalOpenedByFABTrue,
    setIsModalOpenedByFABFalse,
  } = useContext(TodoUIContext);

  return (
    <S.TodoSection>
      <TodoHeader toggleCalendar={toggleIsCalendarOpen} />
      <TodoCalendar isOpened={isCalendarOpen} date={displayingDate} toggleOpen={toggleIsCalendarOpen} />
      <TodoPagination date={displayingDate} />
      <TodoList
        setTodoId={setTodoId}
        setTodoModalMode={setTodoModalMode}
        setIsModalOpenTrue={setIsModalOpenTrue}
        setIsModalOpenedByFABTrue={setIsModalOpenedByFABTrue}
        setIsModalOpenedByFABFalse={setIsModalOpenedByFABFalse}
      />
      <TodoReport />
      <TodoModal
        open={isModalOpen}
        setIsModalOpenFalse={setIsModalOpenFalse}
        todoId={todoId}
        isModalOpenedByFAB={isModalOpenedByFAB}
        mode={mode}
        displayingDate={displayingDate}
      />
    </S.TodoSection>
  );
}
