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
import { useSession } from 'next-auth/react';
import { TodoModalStyle } from './Todo.styled';
import { TodoModalMode } from '../../types/todo';

interface TodoModalProps {
  open: boolean;
  todoId: number;
  isModalOpenedByFAB: boolean;
  setIsModalOpenFalse: () => void;
  mode: TodoModalMode;
}

export default function TodoModal({ open, todoId, isModalOpenedByFAB, setIsModalOpenFalse, mode }: TodoModalProps) {
  const { data: session } = useSession();
  const sessionId = session?.user?.id; // session에서 받아온 id
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
    if (!sessionId) {
      alert('로그인이 필요합니다');
    } else if (typeof sessionId === 'number') {
      // session 존재할 때만 실행
      await updateTodo(
        { todoId, title, content, startTime, endTime, color },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
            queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
            handleCloseModal();
          },
          onError: (error) => {
            alert(`Todo 업데이트에 실패했습니다.${error}`);
          },
        },
      );
    }
  };

  const handleCreateTodo = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
    } else if (typeof sessionId === 'number') {
      // session 존재할 때만 실행
      const createdAt = new Date();
      await createTodo(
        { userId: sessionId, title, createdAt, content, startTime, endTime, color },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
            handleCloseModal();
          },
          onError: (error) => {
            alert(`Todo를 생성하는 데 실패했습니다.${error}`);
          },
        },
      );
    } else {
      alert('로그인이 필요합니다');
    }
  };

  const handleDelete = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
    } else if (typeof sessionId === 'number') {
      // session 존재할 때만 실행
      await deleteTodo(todoId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
          queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
          handleCloseModal();
        },
        onError: (error) => {
          alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
        },
      });
    } else {
      alert('로그인이 필요합니다');
    }
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
