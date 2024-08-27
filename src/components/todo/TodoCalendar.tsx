import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { DateCalendar } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { toggleCalendar } from '@/lib/todos/todoUISlice';

function TodoCalendar() {
  // redux사용 위한 selector, dispatch 사용
  const isOpened = useAppSelector((state) => state.todoUI.isCalendarOpen); // todoUISlice.ts의 isCalendarOpen
  const date = useAppSelector((state) => state.todoData.displayingDate); // todoDataSlice.ts의 displayingDate
  const dispatch = useAppDispatch();
  const router = useRouter();

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      dispatch(toggleCalendar());
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpened]);

  return (
    <Box
      ref={calendarRef}
      position="absolute"
      zIndex="2"
      bgcolor="white"
      top="84px"
      borderRadius={2}
      boxShadow="1px 1px 10px lightgray"
      display={isOpened ? 'block' : 'none'}
    >
      <DateCalendar
        defaultValue={new Date()}
        value={date}
        onChange={(value) => {
          const newYear = value.getFullYear();
          const newMonth = value.getMonth() + 1;
          const newDay = value.getDate();
          router.push(`/day/${newYear}/${newMonth}/${newDay}`);
          dispatch(toggleCalendar());
        }}
      />
    </Box>
  );
}

export default TodoCalendar;
