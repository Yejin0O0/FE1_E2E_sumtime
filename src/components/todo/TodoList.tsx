import React from 'react';
import Box from '@mui/material/Box';
import * as S from '@/components/todo/Todo.styled';
import TodoComponent from '@/components/todo/TodoComponent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { setTodoId } from '@/lib/todos/todoDataSlice';
import { openModal, closeModalByFAB, openModalByFAB, setModalMode } from '@/lib/todos/todoUISlice';
import { SkeletonRectangle } from '../common/SkeletonRectangle';

function TodoList() {
  const dispatch = useDispatch();

  // redux store에서 todoListData, isLoading 가져오기
  const { todoListData } = useSelector((state: RootState) => state.todoData);
  const { isLoading } = useSelector((state: RootState) => state.todoData);

  const handleOpenModalByFAB = () => {
    dispatch(setTodoId(0));
    dispatch(openModalByFAB());
    dispatch(openModal());
    dispatch(setModalMode('create'));
  };

  const handleOpenModalByTodo = (id: number) => {
    dispatch(setTodoId(id));
    dispatch(closeModalByFAB());
    dispatch(openModal());
    dispatch(setModalMode('update'));
  };

  return (
    <Box position="relative" width="100%" height="50%">
      <S.TodoComponentsSection>
        {isLoading ? (
          <>
            <SkeletonRectangle />
            <SkeletonRectangle />
            <SkeletonRectangle />
          </>
        ) : (
          <Box>
            {todoListData &&
              todoListData.map((todo) => (
                <TodoComponent key={todo.id} todoId={todo.id} title={todo.title} setTodoId={handleOpenModalByTodo} />
              ))}
          </Box>
        )}
      </S.TodoComponentsSection>
      <S.FloatingButton>
        <Fab color="primary" size="small" aria-label="add" onClick={handleOpenModalByFAB}>
          <AddIcon />
        </Fab>
      </S.FloatingButton>
    </Box>
  );
}

export default TodoList;
