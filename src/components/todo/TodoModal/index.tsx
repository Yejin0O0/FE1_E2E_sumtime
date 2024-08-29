import { useEffect, useState } from 'react';
import { TextField, Box, Button, Typography, Modal } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTodo, useGetOneTodo, useUpdateTodo } from '@/api/hooks/todoHooks';
import { TimePicker } from '@mui/x-date-pickers';
import { parseISO, isValid, isBefore, isToday, isAfter } from 'date-fns';
import randomColor from 'randomcolor';
import CategoryField from '@/components/todo/CategoryField';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeModal, selectTodoUI } from '@/lib/todos/todoUISlice'; // Redux 상태 추가
import { selectTodoData } from '@/lib/todos/todoDataSlice'; // Redux 상태 추가
import { TIME_ZONE } from '@/constants';
import { checkTaskListOverlap } from 'react-custom-timetable';
import { convertTodosForTimetable } from '@/utils/timetable/convertTodosForTimetable';

import { toZonedTime } from 'date-fns-tz';
import { TodoModalStyle } from '../Todo.styled';
import DeleteTodoButton from './DeleteTodoButton';

export default function TodoModal() {
  // Redux hook 사용: 기존 props로 주입된 값들은 Redux에서 가져옴
  const dispatch = useAppDispatch();
  const { isModalOpen, mode } = useAppSelector(selectTodoUI);
  const { sessionId, todoId, displayingDate, todoListData } = useAppSelector(selectTodoData);

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

  const now = toZonedTime(new Date(), TIME_ZONE); // 현재 시간
  const today = toZonedTime(new Date(), TIME_ZONE);
  today.setHours(0, 0, 0, 0); // 오늘의 시작 시점

  const isPastDate = isBefore(displayingDate ?? now, today);
  const isTodayDate = isToday(displayingDate ?? now);
  const isFutureDate = isAfter(displayingDate ?? now, today);

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
      return;
    }

    const updatedTodo = {
      todoId,
      title,
      content,
      startTime,
      endTime,
      isProgress: !endTime,
      color,
      categoryId: 1,
    };

    const updatedTodoList = [
      ...todoListData.filter((todo) => todo.id !== todoId),
      {
        ...updatedTodo,
        date: displayingDate instanceof Date ? displayingDate.toISOString() : displayingDate || '',
        id: todoId,
        createdAt: toZonedTime(new Date(), TIME_ZONE).toISOString(),
        updatedAt: toZonedTime(new Date(), TIME_ZONE).toISOString(),
        userId: sessionId,
        categoryId: 1,
        isProgress: endTime ? 0 : 1,
      },
    ];
    if (checkTaskListOverlap(convertTodosForTimetable(updatedTodoList))) {
      alert('시간표가 중복됩니다. 시간을 다시 확인해주세요.');
      return;
    }

    updateTodo(updatedTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todo', todoId] });
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        handleCloseModal();
      },
      onError: (error) => {
        alert(`Todo 업데이트에 실패했습니다.${error}`);
      },
    });
  };

  const handleCreate = async () => {
    if (!sessionId) {
      alert('로그인이 필요합니다');
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
      categoryId: 1,
    };

    createTodo(newTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos', sessionId] });
        handleCloseModal();
      },
      onError: (error) => {
        alert(`Todo를 생성하는 데 실패했습니다.${error}`);
      },
    });
  };

  const validateCreateTodo = () => {
    if (title.length === 0 || title.trim().length === 0) {
      alert('제목을 작성해주세요');
      return false;
    }
    if (endTime && startTime === null && !todoData?.isProgress) {
      alert('시작 시간을 확인해주세요.');
      return false;
    }
    if (startTime && endTime === null && !todoData?.isProgress) {
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
            {mode === 'update' && <DeleteTodoButton todoId={todoId} handleCloseParentModal={handleCloseModal} />}
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
                  onChange={(value) => setStartTime(value && isValid(value) ? toZonedTime(value, TIME_ZONE).toISOString() : null)} //! !!!! 이거 바꿔볼 것
                />
                <TimePicker
                  sx={{ width: '100%', margin: '10px 0' }}
                  views={['hours', 'minutes']}
                  label="종료 시간"
                  value={endTime ? parseISO(endTime) : null}
                  minTime={startTime ? parseISO(startTime) : minTime} // 설정된 minTime 사용
                  maxTime={maxTime} // 설정된 maxTime 사용
                  onChange={(value) => setEndTime(value && isValid(value) ? toZonedTime(value, TIME_ZONE).toISOString() : null)}
                />
              </Box>
            )}

            <CategoryField />
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
