import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTodoTime } from '@/api/hooks/todoHooks';
import { useAppSelector } from '@/lib/hooks';
import { selectTodoData } from '@/lib/todos/todoDataSlice';
import GlowingBorder from '@/components/todo/GlowingBorder';
import Todo from '@/components/todo/Todo';
import { toZonedTime } from 'date-fns-tz';
import { TIME_ZONE } from '@/constants';
import * as S from '../Todo.styled';

interface TodoWrapperProps {
  todoId: number;
  title: string;
  setTodoId: (todoId: number) => void;
  endTime: string | null;
  isProgress?: boolean;
  isListProgressing: boolean;
}

function TodoWrapper({ todoId, title, setTodoId, endTime, isProgress, isListProgressing }: TodoWrapperProps) {
  const queryClient = useQueryClient();
  const { mutate: updateTodoTime } = useUpdateTodoTime();
  const { sessionId } = useAppSelector(selectTodoData);

  const handleOpenModal = () => {
    // TodoList를 클릭한 경우
    setTodoId(todoId); // props로 받아온 handleOpenModalByTodo함수가 setTodoId함수로 동작하게 만듦
  };

  const toggleRecord = async (id: number) => {
    // const newStartTime = !isProgress ? new Date().toISOString() : null;
    const newStartTime = !isProgress ? toZonedTime(new Date(), TIME_ZONE).toISOString() : null;
    const newEndTime = isProgress ? toZonedTime(new Date(), TIME_ZONE).toISOString() : null;

    updateTodoTime(
      {
        todoId: id,
        categoryId: 1,
        startTime: newStartTime,
        endTime: newEndTime,
        isProgress: !isProgress,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
          queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        },
        onError: (error) => {
          alert(`Todo 업데이트에 실패했습니다.${error}`);
        },
      },
    );
  };

  return (
    <S.TodoWrapper>
      {isProgress ? (
        <GlowingBorder>
          <Todo
            todoId={todoId}
            title={title}
            isProgress={isProgress}
            isListProgressing={isListProgressing}
            endTime={endTime}
            toggleRecord={toggleRecord}
            handleOpenModal={handleOpenModal}
          />
        </GlowingBorder>
      ) : (
        <Todo
          todoId={todoId}
          title={title}
          isProgress={isProgress}
          isListProgressing={isListProgressing}
          endTime={endTime}
          toggleRecord={toggleRecord}
          handleOpenModal={handleOpenModal}
        />
      )}
    </S.TodoWrapper>
  );
}

export default TodoWrapper;
