import { Box, Button, Modal, Typography } from '@mui/material';

import { modalStyle } from '../modal.styled';

interface DeleteConfirmModalProps {
  id: number;
  open: boolean;
  handleClose: () => void;
  deleteFn: (id: number) => void;
}

function DeleteConfirmModal({ id, open, handleClose, deleteFn }: DeleteConfirmModalProps) {
  return (
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
          <Button onClick={() => deleteFn(id)} variant="contained" color="error">
            삭제
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteConfirmModal;
