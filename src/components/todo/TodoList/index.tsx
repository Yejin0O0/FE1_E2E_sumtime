import React, { useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal, closeModalByFAB, setModalMode } from '@/lib/todos/todoUISlice';
import TodoWrapper from '@/components/todo/TodoList/TodoWrapper';
import { selectTodoData, setTodoId, setLoading, setTodoListData } from '@/lib/todos/todoDataSlice';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/lib/hooks';

import * as TodoStyle from './TodoList.styled';
import * as CommonStyle from '../../common';
import EmptyTodoList from './EmptyTodoList';
import OpenCreateTodoModalButton from './OpenCreateTodoModalButton';

const S = { ...TodoStyle, ...CommonStyle };

function TodoList() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  const { displayingDate } = useAppSelector(selectTodoData);

  const { data: todoListData = [], isLoading } = useGetTodosMatchingDate(sessionId, displayingDate);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setLoading(isLoading));
      if (todoListData) {
        dispatch(setTodoListData(todoListData));
      }
    }
  }, [todoListData, isLoading]);

  const [isListProgressing, setIsListProgressing] = React.useState(false);

  useEffect(() => {
    if (todoListData.some((todo) => todo.isProgress)) {
      setIsListProgressing(true);
    } else {
      setIsListProgressing(false);
    }
  }, [todoListData]);

  const handleOpenModalByTodo = (id: number) => {
    dispatch(setTodoId(id));
    dispatch(closeModalByFAB());
    dispatch(openModal());
    dispatch(setModalMode('update'));
  };

  if (isLoading) {
    return (
      <Box position="relative" width="100%" height="50%" maxHeight="35%" minHeight="35%">
        <S.TodoComponentsSection>
          <Skeleton width="100%" height="100%" sx={{ transform: 'scale(1, 1)', transformOrigin: '0 0%' }} />
        </S.TodoComponentsSection>
      </Box>
    );
  }

  if (todoListData.length === 0) {
    return (
      <Box position="relative" width="100%" height="50%" maxHeight="35%" minHeight="35%">
        <S.TodoComponentsSection style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <EmptyTodoList />
          <OpenCreateTodoModalButton />
        </S.TodoComponentsSection>
      </Box>
    );
  }

  return (
    <Box position="relative" width="100%" height="50%" maxHeight="35%" minHeight="35%">
      <S.TodoComponentsSection>
        <S.PaddingBottomTodoComponentsSection>
          {todoListData.map((todo) => (
            <TodoWrapper
              key={todo.id}
              todoId={todo.id}
              title={todo.title}
              endTime={todo.endTime}
              setTodoId={handleOpenModalByTodo}
              isProgress={!!todo.isProgress}
              isListProgressing={isListProgressing}
            />
          ))}
        </S.PaddingBottomTodoComponentsSection>
      </S.TodoComponentsSection>
      <OpenCreateTodoModalButton />
    </Box>
  );
}

export default TodoList;
