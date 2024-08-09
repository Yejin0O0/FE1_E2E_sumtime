'use client';

import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useGetAllTodos } from '@/api/hooks/todoHooks';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';
import { Text } from '../common';

export default function Todo() {
  const [todoId, setTodoId] = useState<number>(0);
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();
  const {
    value: isModalOpenedByFAB,
    setTrue: setIsModalOpenedByFABTrue,
    setFalse: setIsModalOpenedByFABFalse,
  } = useBooleanState();
  const { data: todoListData } = useGetAllTodos(1);

  const handleOpenFAB = () => {
    setIsModalOpenedByFABTrue();
    setTodoId(0); // 새로 추가하는 경우 todoId를 0으로 설정
    setIsModalOpenTrue();
  };

  const handleOpenTodo = (id: number) => {
    setIsModalOpenedByFABFalse();
    setTodoId(id);
    setIsModalOpenTrue();
  };

  return (
    todoListData && (
      <S.TodoSection>
        <S.TodoComponentsSection>
          <Text $fontSize="xl" $fontWeight="bold" $color="black">
            2024년 8월 1일 목요일
          </Text>
          {todoListData.map((todo) => (
            <TodoComponent
              key={todo.todoId}
              todoId={todo.todoId}
              title={todo.title}
              setTodoId={handleOpenTodo}
              setIsModalOpenTrue={setIsModalOpenTrue}
              setIsModalOpenedByFABFalse={setIsModalOpenedByFABFalse}
            />
          ))}
        </S.TodoComponentsSection>
        <S.FloatingButton>
          <Fab color="primary" size="small" aria-label="add" onClick={handleOpenFAB}>
            <AddIcon />
          </Fab>
        </S.FloatingButton>
        <TodoModal
          open={isModalOpen}
          setIsModalOpenFalse={setIsModalOpenFalse}
          todoId={todoId}
          isModalOpenedByFAB={isModalOpenedByFAB}
        />
      </S.TodoSection>
    )
  );
}
