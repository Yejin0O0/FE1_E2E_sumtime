import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTodo, useDeleteTodo, useGetOneTodo, useUpdateTodo } from '@/app/apiTest/hooks/todoQueries';
import { TodoModalStyle } from './Todo.styled';

interface TodoModalProps {
  open: boolean;
  todoId: string;
  isModalOpenedByFAB: boolean;
  setIsModalOpenFalse: () => void;
}

export default function TodoModal({ open, todoId, isModalOpenedByFAB, setIsModalOpenFalse }: TodoModalProps) {
  const { data: todoData } = useGetOneTodo(todoId ?? '');
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [color, setColor] = React.useState('');

  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  useEffect(() => {
    if (open) {
      if (isModalOpenedByFAB) {
        setTitle('');
        setContent('');
        setStartTime('');
        setEndTime('');
        setColor('');
      } else {
        setTitle(todoData?.title || '');
        setContent(todoData?.content || '');
        setStartTime(todoData?.startTime || '');
        setEndTime(todoData?.endTime || '');
        setColor(todoData?.color || '');
      }
    }
  }, [open, isModalOpenedByFAB, todoData]);

  const handleCloseModal = () => {
    setIsModalOpenFalse();
  };

  const handleUpdateTodo = () => {
    updateTodo(
      { todoId, title, content, startTime, endTime, color },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
          queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
          handleCloseModal();
        },
        onError: (error) => {
          alert(`Todo 업데이트에 실패했습니다.${error}`);
        },
      },
    );
  };

  const handleCreateTodo = () => {
    createTodo(
      { userId: '1', title, content, startTime, endTime, color },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
          handleCloseModal();
        },
        onError: (error) => {
          alert(`Todo를 생성하는 데 실패했습니다.${error}`);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteTodo(todoId.toString(), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
        handleCloseModal();
      },
      onError: (error) => {
        queryClient.invalidateQueries({ queryKey: ['todos', '1'] });
        alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
      },
    });
  };

  return (
    <Modal open={open} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={TodoModalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6" component="h2">
            {isModalOpenedByFAB ? 'Todo 생성' : 'Todo 수정'}
          </Typography>
          {!isModalOpenedByFAB && (
            <IconButton onClick={handleDelete} color="secondary">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
        <TextField fullWidth margin="normal" label="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth margin="normal" label="설명" value={content} onChange={(e) => setContent(e.target.value)} />
        <TextField fullWidth margin="normal" label="시작 시간" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <TextField fullWidth margin="normal" label="종료 시간" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <TextField fullWidth margin="normal" label="색" value={color} onChange={(e) => setColor(e.target.value)} />
        <Button onClick={isModalOpenedByFAB ? handleCreateTodo : handleUpdateTodo} variant="contained" color="primary">
          저장
        </Button>
        <Button onClick={handleCloseModal} variant="outlined" color="secondary" sx={{ ml: 2 }}>
          취소
        </Button>
      </Box>
    </Modal>
  );
}
