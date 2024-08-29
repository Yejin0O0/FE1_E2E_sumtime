import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useGetOneTodo, useUpdateTodo } from '@/api/hooks/todoHooks';
import { TimePicker } from '@mui/x-date-pickers';
import { parseISO, isValid, isBefore, isToday, isAfter } from 'date-fns';
import randomColor from 'randomcolor';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { closeModal, selectTodoUI } from '@/lib/todos/todoUISlice'; // Redux 상태 추가
import { selectTodoData } from '@/lib/todos/todoDataSlice'; // Redux 상태 추가
import { TIME_ZONE } from '@/constants';
import { toZonedTime } from 'date-fns-tz';

import { checkTaskListOverlap } from 'react-custom-timetable';
import { convertTodosForTimetable } from '@/utils/timetable/convertTodosForTimetable';
import CategoryField from './CategoryField';
import { TodoModalStyle } from '../Todo.styled';
import DeleteTodoButton from './DeleteTodoButton';

export default function UpdateTodoModal() {
  // Redux hook 사용: 기존 props로 주입된 값들은 Redux에서 가져옴
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector(selectTodoUI);
  const { sessionId, todoId, displayingDate, todoListData } = useAppSelector(selectTodoData);

  // 데이터 가져오기
  const { data: todoData, isSuccess: isSuccessGetOneTodo } = useGetOneTodo(todoId);
  const [title, setTitle] = useState(todoData?.title || '');
  const [content, setContent] = useState<string | null>(todoData?.content || '');
  const [startTime, setStartTime] = useState<string | null>(todoData?.startTime || null);
  const [endTime, setEndTime] = useState<string | null>(todoData?.endTime || null);
  const color = todoData?.color ?? randomColor();
  const [categoryId, setCategoryId] = useState<number | undefined>(todoData?.categoryId);

  const queryClient = useQueryClient();
  const { mutate: updateTodo } = useUpdateTodo();

  const now = toZonedTime(new Date(), TIME_ZONE); // 현재 시간
  const today = toZonedTime(new Date(), TIME_ZONE);
  today.setHours(0, 0, 0, 0); // 오늘의 시작 시점
  const isPastDate = isBefore(displayingDate ?? now, today);
  const isTodayDate = isToday(displayingDate ?? now);
  const isFutureDate = isAfter(displayingDate ?? now, today);

  useEffect(() => {
    setTitle(todoData?.title || '');
    setContent(todoData?.content || '');
    setStartTime(todoData?.startTime || null);
    setEndTime(todoData?.endTime || null);
    setCategoryId(todoData?.categoryId);
  }, [todoData]);

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
      endTime: endTime!,
      isProgress: !endTime && !!startTime,
      color,
      categoryId: categoryId!,
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
        categoryId: categoryId!,
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

  const getTimePickerProps = () => {
    if (isFutureDate) {
      return { minTime: undefined, maxTime: undefined, disableFuture: true };
    }
    if (isPastDate) {
      return { minTime: undefined, maxTime: undefined, disableFuture: false };
    }
    if (isTodayDate) {
      return { minTime: today, maxTime: now, disableFuture: true };
    }
    return { minTime: undefined, maxTime: undefined, disableFuture: undefined };
  };

  const { minTime, maxTime, disableFuture } = getTimePickerProps();

  return (
    isSuccessGetOneTodo && (
      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={TodoModalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography id="modal-title" variant="h6" component="h2">
              Todo 수정
            </Typography>
            <DeleteTodoButton todoId={todoId} handleCloseParentModal={handleCloseModal} />
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

            {(isPastDate || isTodayDate) && (
              <Box display="flex" gap={1}>
                <TimePicker
                  sx={{ width: '100%', margin: '10px 0' }}
                  views={['hours', 'minutes']}
                  label="시작 시간"
                  value={startTime ? parseISO(startTime) : null}
                  minTime={minTime} // 설정된 minTime 사용
                  maxTime={endTime ? parseISO(endTime) : maxTime} // 설정된 maxTime 사용
                  onChange={(value) => setStartTime(value && isValid(value) ? toZonedTime(value, TIME_ZONE).toISOString() : null)} //! !!!! 이거 바꿔볼 것
                  disableFuture={disableFuture}
                />
                <TimePicker
                  sx={{ width: '100%', margin: '10px 0' }}
                  views={['hours', 'minutes']}
                  label="종료 시간"
                  value={endTime ? parseISO(endTime) : null}
                  minTime={startTime ? parseISO(startTime) : minTime} // 설정된 minTime 사용
                  maxTime={maxTime} // 설정된 maxTime 사용
                  onChange={(value) => setEndTime(value && isValid(value) ? toZonedTime(value, TIME_ZONE).toISOString() : null)}
                  disableFuture={disableFuture}
                />
              </Box>
            )}

            {categoryId && <CategoryField categoryId={categoryId} setCategoryId={setCategoryId} />}
          </Box>
          <Box display="flex" gap={1} m={1} justifyContent="flex-end">
            <Button onClick={handleCloseModal} variant="text" size="medium" color="error" sx={{ border: '1px solid pink' }}>
              취소
            </Button>
            <Button onClick={handleUpdate} variant="contained" color="primary">
              저장
            </Button>
          </Box>
        </Box>
      </Modal>
    )
  );
}
