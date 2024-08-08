'use client';

import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useGetAllTodos } from '@/app/apiTest/hooks/todoQueries';
import TodoComponent from './TodoComponent';
import TodoModal from './TodoModal';
import * as S from './Todo.styled';
import { Text } from '../common';

export default function Todo() {
  const [todoId, setTodoId] = useState<string>('');
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();
  const {
    value: isModalOpenedByFAB,
    setTrue: setIsModalOpenedByFABTrue,
    setFalse: setIsModalOpenedByFABFalse,
  } = useBooleanState();
  const { data: todoListData } = useGetAllTodos('1');

  const handleOpenFAB = () => {
    setIsModalOpenedByFABTrue();
    setTodoId(''); // 새로 추가하는 경우 todoId를 빈 문자열로 설정
    setIsModalOpenTrue();
  };

  const handleOpenTodo = (id: string) => {
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
