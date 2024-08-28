import { Box, Button, FormControlLabel, Modal, Switch, TextField, Typography } from '@mui/material';
import { TodoModalStyle } from '@/components/todo/Todo.styled';
import ColorPickerBox from '@/components/ColorPickerBox';
import { CreateCategoryInfo } from '@/api/queryFn/categoryQueryFn';
import DeleteCategoryButton from './DeleteCategoryButton';

interface CategoryModalProps {
  isOpen: boolean;
  close: () => void;
  title: string;
  mutateAction: (body: CreateCategoryInfo) => void;
  data: CreateCategoryInfo;
  setData: (unit: keyof CreateCategoryInfo, value: number | string | boolean) => void;
  id?: number;
}

function CategoryModal({ isOpen, close, title, mutateAction, data, setData, id }: CategoryModalProps) {
  const handleColorChange = (newColor: string) => {
    setData('color', newColor);
  };

  const deleteUndefined = (d: string | null | undefined) => {
    if (d === undefined || d === null) return '';
    return d;
  };

  return (
    <Modal open={isOpen} onClose={close} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={TodoModalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6" component="h2">
            Category {title}
          </Typography>
          {title === '수정' && <DeleteCategoryButton categoryId={id!} handleCloseParentModal={close} />}
        </Box>
        <Box>
          <TextField
            sx={{ width: '100%', margin: '10px 0' }}
            label="제목"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
          />
          <ColorPickerBox color={deleteUndefined(data.color)} setColor={handleColorChange} />
          <FormControlLabel
            value="isDisplayed"
            control={
              <Switch
                checked={Boolean(data.isDisplayed)}
                onChange={(e) => {
                  setData('isDisplayed', e.target.checked ? 1 : 0);
                }}
                name="isDisplayed"
              />
            }
            label="isDisplayed"
            labelPlacement="start"
            sx={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '1rem' }}
          />
        </Box>
        <Box display="flex" gap={1} m={1} justifyContent="flex-end">
          <Button onClick={close} variant="text" size="medium" color="error" sx={{ border: '1px solid pink' }}>
            취소
          </Button>
          <Button onClick={() => mutateAction(data)} variant="contained" color="primary">
            저장
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CategoryModal;
