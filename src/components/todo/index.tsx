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

  const todayDate = new Date();
  // 해당 부분은 현재 date객체를 가져와 사용하고 있습니다. 이후 라이브러리에서 제공하는 함수로 변경될 가능성이 있습니다.
  // 또한, 달력 파트의 날짜를 가져오는 부분과 중복되는 부분이 있어, 추후 중복을 제거할 수 있도록 리팩토링이 필요합니다.

  return (
    todoListData && (
      <S.TodoSection>
        <S.TodoComponentsSection>
          <Text $fontSize="xl" $fontWeight="bold" $color="black">
            {todayDate.getFullYear()}년 {todayDate.getMonth() + 1}월 {todayDate.getDate()}일{' '}
            {todayDate.toLocaleDateString('ko-KR', { weekday: 'long' })}
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
