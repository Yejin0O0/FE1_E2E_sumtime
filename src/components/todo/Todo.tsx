import React from 'react';
import * as S from '@/components/todo/Todo.styled';
import { Text } from '@/components/common';
import TodoRecordButton from '@/components/todo/TodoRecordButton';
import Box from '@mui/material/Box';

interface TodoProps {
  title: string;
  todoId: number;
  isProgress?: boolean;
  isListProgressing: boolean;
  endTime: string | null;
  handleOpenModal: () => void;
  toggleRecord: (id: number) => void;
}

function Todo({ title, todoId, isProgress, isListProgressing, endTime, handleOpenModal, toggleRecord }: TodoProps) {
  return (
    <Box width="100%" padding="0 3px" display="flex" alignItems="center" justifyContent="center" borderRadius={2}>
      <S.TodoContainer
        endTime={endTime}
        onClick={() => {
          handleOpenModal();
        }}
      >
        <Text $width="90%" $fontSize="small" title-wrap="wrap">
          {title}
        </Text>
        {!endTime && (
          <TodoRecordButton
            todoId={todoId}
            isProgress={isProgress}
            isListProgressing={isListProgressing}
            toggleRecord={() => toggleRecord(todoId)}
          />
        )}
      </S.TodoContainer>
    </Box>
  );
}

export default Todo;
