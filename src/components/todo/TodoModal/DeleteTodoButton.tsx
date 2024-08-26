'use client';

import { useState } from 'react';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTodo } from '@/api/hooks/todoHooks';
import { red } from '@mui/material/colors';
import { useSession } from 'next-auth/react';
import { modalStyle } from './modal.styled';

interface DeleteTodoButtonProps {
  todoId: number;
  handleCloseParentModal?: () => void;
}

function DeleteTodoButton({ todoId, handleCloseParentModal = () => {} }: DeleteTodoButtonProps) {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const sessionId = data?.user.id;
  const { mutate: deleteTodo } = useDeleteTodo();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
      return;
    }

    deleteTodo(todoId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        handleClose();
        handleCloseParentModal();
      },
      onError: (error) => {
        alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
      },
    });
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="secondary">
        <DeleteIcon sx={{ color: red[400], fontSize: 25 }} />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle }} display="flex" flexDirection="column" justifyContent="space-between" gap={1} padding={1}>
          <Typography variant="h6" gutterBottom>
            정말 삭제하시겠습니까?
          </Typography>
          <Typography variant="subtitle1">한번 삭제하시면 복구할 수 없습니다.</Typography>

          <Box display="flex" gap={1} justifyContent="flex-end">
            <Button onClick={handleClose} variant="outlined" size="medium" color="primary">
              취소
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              삭제
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default DeleteTodoButton;
