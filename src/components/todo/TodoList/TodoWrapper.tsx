import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateTodoTime } from '@/api/hooks/todoHooks';
import { useAppSelector } from '@/lib/hooks';
import { selectTodoData } from '@/lib/todos/todoDataSlice';
import GlowingBorder from '@/components/todo/GlowingBorder';
import Todo from '@/components/todo/Todo';
import { endOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { TIME_ZONE } from '@/constants';
import { checkTaskListOverlap } from 'react-custom-timetable';
import { convertTodosForTimetable } from '@/utils/timetable/convertTodosForTimetable';
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
  const { sessionId, displayingDate, todoListData } = useAppSelector(selectTodoData);

  const handleOpenModal = () => {
    // TodoList를 클릭한 경우
    setTodoId(todoId); // props로 받아온 handleOpenModalByTodo함수가 setTodoId함수로 동작하게 만듦
  };

  const toggleRecord = async (id: number) => {
    if (!sessionId) {
      alert('로그인이 필요합니다.');
      return;
    }

    const newStartTime = !isProgress ? toZonedTime(new Date(), TIME_ZONE).toISOString() : null;
    const newEndTime = isProgress ? toZonedTime(new Date(), TIME_ZONE).toISOString() : null;
    const updatedTodo = {
      todoId: id,
      categoryId: 1,
      startTime: newStartTime,
      endTime: newEndTime,
      isProgress: !isProgress,
    };
    const updatedTodoList = [
      ...todoListData.filter((todo) => todo.id !== id),
      {
        ...updatedTodo,
        title,
        content: '',
        color: '',
        date: displayingDate instanceof Date ? displayingDate.toISOString() : displayingDate || '',
        id: todoId,
        createdAt: toZonedTime(new Date(), TIME_ZONE).toISOString(),
        updatedAt: toZonedTime(new Date(), TIME_ZONE).toISOString(),
        endTime: toZonedTime(endOfDay(new Date()), TIME_ZONE).toISOString(),
        userId: sessionId,
        categoryId: 1,
        isProgress: endTime ? 0 : 1,
      },
    ];
    if (checkTaskListOverlap(convertTodosForTimetable(updatedTodoList))) {
      alert('현재 시간 이후에 등록된 일정이 있습니다.\n해당 일정을 제거하거나, 일정이 끝난 후 다시 시도하세요.');
      return;
    }

    updateTodoTime(updatedTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
      },
      onError: (error) => {
        alert(`Todo 업데이트에 실패했습니다.${error}`);
      },
    });
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
