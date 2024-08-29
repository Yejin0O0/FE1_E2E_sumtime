import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTodo } from '@/api/hooks/todoHooks';
import randomColor from 'randomcolor';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeModal, selectTodoUI } from '@/lib/todos/todoUISlice'; // Redux 상태 추가
import { selectTodoData } from '@/lib/todos/todoDataSlice'; // Redux 상태 추가
import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import { TIME_ZONE } from '@/constants';
import { toZonedTime } from 'date-fns-tz';
import CategoryField from './CategoryField';
import { TodoModalStyle } from '../Todo.styled';

export default function CreateTodoModal() {
  const { categoryList } = useGetCategoryList();

  // Redux hook 사용: 기존 props로 주입된 값들은 Redux에서 가져옴
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectTodoUI);
  const { sessionId, displayingDate } = useAppSelector(selectTodoData);

  // 데이터 가져오기
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | null>('');
  const [color, setColor] = useState(randomColor());
  const defaultCategory = categoryList?.find(({ isDefault }) => isDefault === 1);
  const [categoryId, setCategoryId] = useState<number | undefined>(defaultCategory?.id);
  const startTime = null;
  const endTime = null;

  const queryClient = useQueryClient();
  const { mutate: createTodo } = useCreateTodo();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const validateCreateTodo = () => {
    if (title.length === 0 || title.trim().length === 0) {
      alert('제목을 작성해주세요');
      return false;
    }

    return true;
  };

  const handleCreate = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
      return;
    }

    if (!validateCreateTodo()) {
      return;
    }

    if (!categoryId) {
      return;
    }

    const newTodo = {
      userId: sessionId,
      title,
      date: displayingDate ?? toZonedTime(new Date(), TIME_ZONE),
      content,
      startTime,
      endTime,
      color,
      categoryId,
    };

    createTodo(newTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        handleCloseModal();
        setTitle('');
        setContent('');
        setColor(randomColor());
      },
      onError: (error) => {
        alert(`Todo를 생성하는 데 실패했습니다.${error}`);
      },
    });
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={TodoModalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="modal-title" variant="h6" component="h2">
            Todo 생성
          </Typography>
        </Box>
        <Box m={1}>
          <TextField
            sx={{ width: '100%', margin: '10px 0' }}
            label="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTitle((prev) => prev.trim())}
          />
          <TextField
            sx={{ width: '100%', margin: '10px 0' }}
            label="설명"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setTitle((prev) => prev.trim())}
          />
          {categoryId && <CategoryField categoryId={categoryId} setCategoryId={setCategoryId} />}
        </Box>
        <Box display="flex" gap={1} m={1} justifyContent="flex-end">
          <Button onClick={handleCloseModal} variant="text" size="medium" color="error" sx={{ border: '1px solid pink' }}>
            취소
          </Button>
          <Button onClick={handleCreate} variant="contained" color="primary">
            생성
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
