import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { setTodoId } from '@/lib/todos/todoDataSlice';
import { openModal, closeModalByFAB, setModalMode } from '@/lib/todos/todoUISlice';
import TodoWrapper from '@/components/todo/TodoList/TodoWrapper';
import * as TodoStyle from './TodoList.styled';
import { SkeletonRectangle } from '../../common/SkeletonRectangle';
import * as CommonStyle from '../../common';
import EmptyTodoList from './EmptyTodoList';
import OpenCreateTodoModalButton from './OpenCreateTodoModalButton';

const S = { ...TodoStyle, ...CommonStyle };

function TodoList() {
  const dispatch = useDispatch();

  // redux store에서 todoListData, isLoading 가져오기
  const { todoListData, isLoading } = useSelector((state: RootState) => state.todoData);
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
      <Box position="relative" width="100%" height="50%">
        <S.TodoComponentsSection>
          <SkeletonRectangle />
          <SkeletonRectangle />
          <SkeletonRectangle />
        </S.TodoComponentsSection>
      </Box>
    );
  }

  if (todoListData.length === 0) {
    return <EmptyTodoList />;
  }

  return (
    <Box position="relative" width="100%" height="50%">
      <S.TodoComponentsSection>
        <Box>
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
        </Box>
      </S.TodoComponentsSection>
      <OpenCreateTodoModalButton />
    </Box>
  );
}

export default TodoList;
