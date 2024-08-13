/* eslint-disable import/no-cycle */

import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTodo, useDeleteTodo, useGetOneTodo, useUpdateTodo } from '@/api/hooks/todoHooks';
import { TodoModalStyle } from './Todo.styled';
import { TodoModalMode } from './index';

interface TodoModalProps {
  open: boolean;
  todoId: number;
  isModalOpenedByFAB: boolean;
  setIsModalOpenFalse: () => void;
  mode: TodoModalMode;
}

export default function TodoModal({ open, todoId, isModalOpenedByFAB, setIsModalOpenFalse, mode }: TodoModalProps) {
  const { data: todoData, isSuccess: isSuccessGetOneTodo } = useGetOneTodo(todoId);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState<string | null>('');
  const [startTime, setStartTime] = React.useState<string | null>('');
  const [endTime, setEndTime] = React.useState<string | null>('');
  const [color, setColor] = React.useState<string | null>('');

  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  useEffect(() => {
    if (open && mode === 'create') {
      setTitle('');
      setContent('');
      setStartTime('');
      setEndTime('');
      setColor('');
    } else if (open && mode === 'update') {
      setTitle(todoData?.title || '');
      setContent(todoData?.content || '');
      setStartTime(todoData?.startTime || '');
      setEndTime(todoData?.endTime || '');
      setColor(todoData?.color || '');
    }
  }, [open, mode, todoData]);

  const handleCloseModal = () => {
    setIsModalOpenFalse();
  };

  const handleUpdateTodo = async () => {
    await updateTodo(
      { todoId, title, content, startTime, endTime, color },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
          queryClient.invalidateQueries({ queryKey: ['todos', 1] });
          handleCloseModal();
        },
        onError: (error) => {
          alert(`Todo 업데이트에 실패했습니다.${error}`);
        },
      },
    );
  };

  const handleCreateTodo = async () => {
    const createdAt = new Date();
    await createTodo(
      { userId: 1, title, createdAt, content, startTime, endTime, color },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos', 1] });
          handleCloseModal();
        },
        onError: (error) => {
          alert(`Todo를 생성하는 데 실패했습니다.${error}`);
        },
      },
    );
  };

  const handleDelete = async () => {
    await deleteTodo(todoId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
        queryClient.invalidateQueries({ queryKey: ['todos', 1] });
        handleCloseModal();
      },
      onError: (error) => {
        alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
      },
    });
  };

  return (
    (isModalOpenedByFAB || isSuccessGetOneTodo) && (
      <Modal open={open} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={TodoModalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography id="modal-title" variant="h6" component="h2">
              {mode === 'create' ? 'Todo 생성' : 'Todo 수정'}
            </Typography>
            {mode === 'update' && (
              <IconButton onClick={handleDelete} color="secondary">
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
          <TextField fullWidth margin="normal" label="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField fullWidth margin="normal" label="설명" value={content} onChange={(e) => setContent(e.target.value)} />
          <TextField
            fullWidth
            margin="normal"
            label="시작 시간"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <TextField fullWidth margin="normal" label="종료 시간" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          <TextField fullWidth margin="normal" label="색" value={color} onChange={(e) => setColor(e.target.value)} />
          <Button onClick={mode === 'create' ? handleCreateTodo : handleUpdateTodo} variant="contained" color="primary">
            저장
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" color="secondary" sx={{ ml: 2 }}>
            취소
          </Button>
        </Box>
      </Modal>
    )
  );
}
