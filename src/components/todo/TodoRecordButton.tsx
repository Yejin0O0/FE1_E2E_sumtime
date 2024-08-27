import React from 'react';
import Box from '@mui/material/Box';
import { useAppSelector } from '@/lib/hooks';

interface TodoRecordButtonProps {
  toggleRecord: (todoId: number) => void;
  todoId: number;
  isProgress?: boolean;
  isListProgressing: boolean;
}

function TodoRecordButton({ toggleRecord, todoId, isProgress, isListProgressing }: TodoRecordButtonProps) {
  const { displayingDate } = useAppSelector((state) => state.todoData);
  const isRecordBlocked = (!isProgress && isListProgressing) || displayingDate?.toDateString() !== new Date().toDateString();

  return (
    <Box
      boxSizing="border-box"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={isRecordBlocked ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
      onClick={(e) => {
        if (isRecordBlocked) {
          e.stopPropagation();
          return;
        }
        e.stopPropagation();
        toggleRecord(todoId);
      }}
    >
      <Box
        boxSizing="border-box"
        width="1.5rem"
        height="1.5rem"
        borderRadius="50%"
        border={isRecordBlocked ? '1px solid #b8b8b8' : '1px solid #CE4934'}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="absolute"
          width={!isProgress ? '0.9rem' : '0.6rem'}
          height={!isProgress ? '0.9rem' : '0.6rem'}
          bgcolor={isRecordBlocked ? '#b8b8b8' : '#CE4934'}
          borderRadius={!isProgress ? '50%' : '20%'}
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.15s ease',
          }}
        />
      </Box>
    </Box>
  );
}

export default TodoRecordButton;
