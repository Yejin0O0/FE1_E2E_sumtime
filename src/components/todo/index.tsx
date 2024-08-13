'use client';

/* eslint-disable import/no-cycle */

import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import { getTodayDateKr } from '@/utils/timeUtils';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';
import { Text } from '../common';

export type TodoModalMode = 'create' | 'update' | '';

export default function Todo() {
  const [todoId, setTodoId] = useState<number>(0);
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();
  const {
    value: isModalOpenedByFAB,
    setTrue: setIsModalOpenedByFABTrue,
    setFalse: setIsModalOpenedByFABFalse,
  } = useBooleanState();

  const [mode, setTodoModalMode] = useState<TodoModalMode>(''); // modal이 열리는 경우 mode로 관리
  const { data: todoListData } = useGetTodosMatchingDate(1, new Date());

  const handleOpenModalByFAB = () => {
    setIsModalOpenedByFABTrue();
    setTodoId(0); // 새로 추가하는 경우 todoId를 0으로 설정
    setIsModalOpenTrue();
    setTodoModalMode('create'); // 이렇게 mode를 설정해주면 todocomponent, todomodal에 직접 Mode='create'로 전달할 필요가 없음
  };

  const handleOpenModalByTodo = (id: number) => {
    setIsModalOpenedByFABFalse();
    setTodoId(id);
    setIsModalOpenTrue();
    setTodoModalMode('update'); // 이렇게 mode를 설정해주면 todocomponent, todomodal에 직접 Mode='create'로 전달할 필요가 없음
  };

  return (
    <S.TodoSection>
      <S.TodoComponentsSection>
        <Text $fontSize="xl" $fontWeight="bold" $color="black">
          {getTodayDateKr()}
        </Text>
        {todoListData &&
          todoListData.map((todo) => (
            <TodoComponent key={todo.todoId} todoId={todo.todoId} title={todo.title} setTodoId={handleOpenModalByTodo} />
          ))}
      </S.TodoComponentsSection>
      <S.FloatingButton>
        <Fab color="primary" size="small" aria-label="add" onClick={handleOpenModalByFAB}>
          <AddIcon />
        </Fab>
      </S.FloatingButton>
      <TodoModal
        open={isModalOpen}
        setIsModalOpenFalse={setIsModalOpenFalse}
        todoId={todoId}
        isModalOpenedByFAB={isModalOpenedByFAB}
        mode={mode}
      />
    </S.TodoSection>
  );
}
