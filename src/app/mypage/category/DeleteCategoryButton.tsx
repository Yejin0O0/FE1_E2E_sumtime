import useDeleteCategory from '@/api/hooks/categoryHooks/useDeleteCategory';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useBooleanState from '@/hooks/utils/useBooleanState';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

interface DeleteCategoryButtonProps {
  categoryId: number;
  handleCloseParentModal?: () => void;
}

function DeleteCategoryButton({ categoryId, handleCloseParentModal = () => {} }: DeleteCategoryButtonProps) {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const sessionId = data?.user.id;
  const { mutate: deleteCategoryMutation } = useDeleteCategory();
  const { value: isModalOpen, setFalse: closeModal, setTrue: openModal } = useBooleanState(false);

  const handleDelete = () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
      return;
    }

    deleteCategoryMutation(categoryId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categoryList'] });
        handleCloseParentModal();
      },
      onError: (error) => {
        console.warn(error);
        alert(`카테고리를 삭제하는 데 실패했습니다.`);
      },
    });
  };

  return (
    <>
      <IconButton onClick={openModal} color="secondary">
        <DeleteIcon sx={{ color: 'red', fontSize: 25 }} />
      </IconButton>
      <DeleteConfirmModal open={isModalOpen} handleClose={closeModal} deleteFn={handleDelete} />
    </>
  );
}
export default DeleteCategoryButton;
