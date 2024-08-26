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
import { parseISO, isValid, isBefore, isToday, isAfter } from 'date-fns';
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

  const now = new Date(); // 현재 시간
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 오늘의 시작 시점

  const isPastDate = isBefore(displayingDate, today);
  const isTodayDate = isToday(displayingDate);
  const isFutureDate = isAfter(displayingDate, today);

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

  const handleUpdate = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
    } else {
      updateTodo(
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

  const handleCreate = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
      return;
    }

    createTodo(
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
      deleteTodo(todoId, {
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
  const validateCreateTodo = () => {
    if (title.length === 0 || title.trim().length === 0) {
      alert('제목을 작성해주세요');
      return false;
    }
    if (endTime && startTime === null) {
      alert('시작 시간을 확인해주세요.');
      return false;
    }
    if (startTime && endTime === null) {
      alert('종료 시간을 확인해주세요.');
      return false;
    }
    if (startTime && endTime && startTime >= endTime) {
      alert('시작 시간이 종료 시간보다 늦습니다.');
      return false;
    }
    return true;
  };

  const handleSaveClick = () => {
    if (validateCreateTodo()) {
      if (mode === 'create') {
        handleCreate();
      } else {
        handleUpdate();
      }
    }
  };

  const getTimePickerProps = () => {
    if (isFutureDate) {
      return { minTime: undefined, maxTime: undefined };
    }
    if (isPastDate) {
      return { minTime: undefined, maxTime: undefined };
    }
    if (isTodayDate && mode === 'update') {
      return { minTime: today, maxTime: now };
    }
    return { minTime: undefined, maxTime: undefined };
  };

  const { minTime, maxTime } = getTimePickerProps();

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
              onBlur={() => setTitle((prev) => prev.trim())}
            />
            <TextField
              sx={{ width: '100%', margin: '10px 0' }}
              label="설명"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => setTitle((prev) => prev.trim())}
            />

            {(isPastDate || (isTodayDate && mode === 'update')) && (
              <Box display="flex" gap={1}>
                <TimePicker
                  sx={{ width: '100%', margin: '10px 0' }}
                  views={['hours', 'minutes']}
                  label="시작 시간"
                  value={startTime ? parseISO(startTime) : null}
                  minTime={minTime} // 설정된 minTime 사용
                  maxTime={endTime ? parseISO(endTime) : maxTime} // 설정된 maxTime 사용
                  onChange={(value) => setStartTime(value && isValid(value) ? value.toISOString() : null)}
                />
                <TimePicker
                  sx={{ width: '100%', margin: '10px 0' }}
                  views={['hours', 'minutes']}
                  label="종료 시간"
                  value={endTime ? parseISO(endTime) : null}
                  minTime={startTime ? parseISO(startTime) : minTime} // 설정된 minTime 사용
                  maxTime={maxTime} // 설정된 maxTime 사용
                  onChange={(value) => setEndTime(value && isValid(value) ? value.toISOString() : null)}
                />
              </Box>
            )}

            <CategoryField />
            <ColorPickerInput color={color} setColor={setColor} />
          </Box>
          <Box display="flex" gap={1} m={1} justifyContent="flex-end">
            <Button onClick={handleCloseModal} variant="text" size="medium" color="error" sx={{ border: '1px solid pink' }}>
              취소
            </Button>
            <Button onClick={handleSaveClick} variant="contained" color="primary">
              저장
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
}
