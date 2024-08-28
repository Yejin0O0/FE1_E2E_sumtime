'use client';

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTodo } from '@/api/hooks/todoHooks';
import { red } from '@mui/material/colors';
import { useSession } from 'next-auth/react';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';
import useBooleanState from '@/hooks/utils/useBooleanState';

interface DeleteTodoButtonProps {
  todoId: number;
  handleCloseParentModal?: () => void;
}

function DeleteTodoButton({ todoId, handleCloseParentModal = () => {} }: DeleteTodoButtonProps) {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const sessionId = data?.user.id;
  const { mutate: deleteTodo } = useDeleteTodo();
  const { value: isModalOpen, setFalse: closeModal, setTrue: openMadal } = useBooleanState(false);

  const handleDelete = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
      return;
    }

    deleteTodo(todoId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        closeModal();
        handleCloseParentModal();
      },
      onError: (error) => {
        alert(`Todo를 삭제하는 데 실패했습니다.${error}`);
      },
    });
  };

  return (
    <>
      <IconButton onClick={openMadal} color="secondary">
        <DeleteIcon sx={{ color: red[400], fontSize: 25 }} />
      </IconButton>
      <DeleteConfirmModal open={isModalOpen} handleClose={closeModal} deleteFn={handleDelete} />
    </>
  );
}

export default DeleteTodoButton;
