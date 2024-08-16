import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import * as S from '@/components/todo/Todo.styled';
import TodoComponent from '@/components/todo/TodoComponent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { TodoModalMode } from '@/types/todo';
import { TodoDataContext } from '@/context/TodoDataContext';
import { SkeletonRectangle } from '../common/SkeletonRectangle';

interface PropsType {
  setTodoId: (id: number) => void;
  setIsModalOpenTrue: () => void;
  setTodoModalMode: (mode: TodoModalMode) => void;
  setIsModalOpenedByFABTrue: () => void;
  setIsModalOpenedByFABFalse: () => void;
}

function TodoList({
  setTodoId,
  setIsModalOpenTrue,
  setTodoModalMode,
  setIsModalOpenedByFABTrue,
  setIsModalOpenedByFABFalse,
}: PropsType) {
  const { todoListData, isLoading } = useContext(TodoDataContext);

  const handleOpenModalByFAB = () => {
    setTodoId(0);
    setIsModalOpenTrue();
    setIsModalOpenedByFABTrue();
    setTodoModalMode('create');
  };

  const handleOpenModalByTodo = (id: number) => {
    setTodoId(id);
    setIsModalOpenTrue();
    setIsModalOpenedByFABFalse();
    setTodoModalMode('update');
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
                <TodoComponent key={todo.todoId} todoId={todo.todoId} title={todo.title} setTodoId={handleOpenModalByTodo} />
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
