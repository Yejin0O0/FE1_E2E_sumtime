import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTodo, useDeleteTodo, useGetOneTodo, useUpdateTodo } from '@/api/hooks/todoHooks';
import { red } from '@mui/material/colors';
import { TimePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import randomColor from 'randomcolor';
import CategoryField from '@/components/todo/CategoryField';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeModal, selectTodoUI } from '@/lib/todos/todoUISlice'; // Redux 상태 추가
import { selectTodoData } from '@/lib/todos/todoDataSlice'; // Redux 상태 추가
import { TodoModalStyle } from './Todo.styled';
import ColorPickerInput from '../ColorPickerInput';

export default function TodoModal() {
  // Redux hook 사용: 기존 props로 주입된 값들은 Redux에서 가져옴
  const dispatch = useAppDispatch();
  const { isModalOpen, mode } = useAppSelector(selectTodoUI);
  const { sessionId, todoId, displayingDate } = useAppSelector(selectTodoData);

  // 데이터 가져오기
  const { data: todoData, isSuccess: isSuccessGetOneTodo } = useGetOneTodo(todoId);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | null>('');
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [color, setColor] = useState(randomColor());

  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  useEffect(() => {
    if (isModalOpen && mode === 'create') {
      setTitle('');
      setContent('');
      setStartTime(null);
      setEndTime(null);
      setColor(randomColor());
    } else if (isModalOpen && mode === 'update') {
      setTitle(todoData?.title || '');
      setContent(todoData?.content || '');
      setStartTime(todoData?.startTime || null);
      setEndTime(todoData?.endTime || null);
      setColor(todoData?.color || randomColor());
    }
  }, [isModalOpen, mode, todoData]);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleUpdateTodo = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
    } else {
      await updateTodo(
        {
          todoId,
          title,
          content,
          startTime,
          endTime,
          color,
        },
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
      return;
    }

    await createTodo(
      {
        userId: sessionId,
        title,
        date: displayingDate,
        content,
        startTime,
        endTime,
        color,
        categoryId: 1,
      },
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
  };

  const handleDelete = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
    } else {
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
    }
  };

  return (
    isModalOpen &&
    (mode === 'create' || isSuccessGetOneTodo) && (
      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={TodoModalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography id="modal-title" variant="h6" component="h2">
              {mode === 'create' ? 'Todo 생성' : 'Todo 수정'}
            </Typography>
            {mode === 'update' && (
              <IconButton onClick={handleDelete} color="secondary">
                <DeleteIcon sx={{ color: red[400], fontSize: 25 }} />
              </IconButton>
            )}
          </Box>
          <Box m={1}>
            <TextField
              sx={{ width: '100%', margin: '10px 0' }}
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              sx={{ width: '100%', margin: '10px 0' }}
              label="설명"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Box display="flex" gap={1}>
              <TimePicker
                sx={{ width: '100%', margin: '10px 0' }}
                views={['hours', 'minutes']}
                label="시작 시간"
                defaultValue={startTime ? parseISO(startTime) : null}
                onChange={(value) => setStartTime(value ? value.toISOString() : null)}
              />
              <TimePicker
                sx={{ width: '100%', margin: '10px 0' }}
                views={['hours', 'minutes']}
                label="종료 시간"
                defaultValue={endTime ? parseISO(endTime) : null}
                onChange={(value) => setEndTime(value ? value.toISOString() : null)}
              />
            </Box>
            <CategoryField />
            <ColorPickerInput color={color} setColor={setColor} />
          </Box>
          <Box display="flex" gap={1} m={1} justifyContent="flex-end">
            <Button onClick={handleCloseModal} variant="text" size="medium" color="error" sx={{ border: '1px solid pink' }}>
              취소
            </Button>
            <Button onClick={mode === 'create' ? handleCreateTodo : handleUpdateTodo} variant="contained" color="primary">
              저장
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
}
