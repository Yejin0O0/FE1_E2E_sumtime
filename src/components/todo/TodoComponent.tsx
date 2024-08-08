import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTodoTime } from '@/app/apiTest/hooks/todoQueries';
import * as S from './Todo.styled';
import { Text } from '../common';

interface TodoComponentProps {
  todoId: number;
  title: string;
  setTodoId: (s: string) => void;

  setIsModalOpenTrue: () => void;
  setIsModalOpenedByFABFalse: () => void;
}

function TodoComponent({ todoId, title, setTodoId, setIsModalOpenTrue, setIsModalOpenedByFABFalse }: TodoComponentProps) {
  const queryClient = useQueryClient();
  const { mutate: updateTodoTime } = useUpdateTodoTime();

  const handleOpenModal = () => {
    // TodoList를 클릭한 경우
    setTodoId(todoId.toString());
    setIsModalOpenedByFABFalse();
    setIsModalOpenTrue();
  };

  const handleStart = async (id: number) => {
    const startTime = new Date().toLocaleTimeString();
    const endTime = null;

    await updateTodoTime(
      { todoId: id.toString(), startTime, endTime },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', todoId.toString()] });
        },
        onError: (error) => {
          alert(`Todo 업데이트에 실패했습니다.${error}`);
        },
      },
    );
  };

  const handleEnd = async (id: number) => {
    const startTime = null;
    const endTime = new Date().toLocaleTimeString();

    await updateTodoTime(
      { todoId: id.toString(), startTime, endTime },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', todoId.toString()] });
        },
        onError: (error) => {
          alert(`Todo 업데이트에 실패했습니다.${error}`);
        },
      },
    );
  };

  return (
    <S.ATodoComponentContainer>
      <S.TodoContainer
        onClick={() => {
          handleOpenModal();
        }}
      >
        <Text $width="90%" $fontSize="small" title-wrap="wrap">
          {title}
        </Text>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleStart(todoId);
          }}
        >
          ▶
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnd(todoId);
          }}
        >
          ❚❚
        </button>
      </S.TodoContainer>
    </S.ATodoComponentContainer>
  );
}

export default TodoComponent;
