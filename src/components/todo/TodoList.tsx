import React from 'react';
import Box from '@mui/material/Box';
import * as S from '@/components/todo/Todo.styled';
import TodoComponent from '@/components/todo/TodoComponent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SelectTodo } from '@/db/schema/todos';
import { TodoModalMode } from '@/types/todo';

interface PropsType {
  dataList: SelectTodo[];
  setTodoId: (id: number) => void;
  setIsModalOpenTrue: () => void;
  setTodoModalMode: (mode: TodoModalMode) => void;
  setIsModalOpenedByFABTrue: () => void;
  setIsModalOpenedByFABFalse: () => void;
}

function TodoList({
  dataList,
  setTodoId,
  setIsModalOpenTrue,
  setTodoModalMode,
  setIsModalOpenedByFABTrue,
  setIsModalOpenedByFABFalse,
}: PropsType) {
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
        <Box>
          {dataList &&
            dataList.map((todo) => (
              <TodoComponent key={todo.todoId} todoId={todo.todoId} title={todo.title} setTodoId={handleOpenModalByTodo} />
            ))}
        </Box>
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
