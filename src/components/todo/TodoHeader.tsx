import React from 'react';
import { Text } from '@/components/common';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { toggleCalendar } from '@/lib/todos/todoUISlice';

function TodoHeader() {
  // 상태 선택 및 타입 지정
  const displayingDate = useAppSelector((state) => state.todoData.displayingDate); // 상태 선택
  const dispatch = useAppDispatch();

  // dispatch를 사용하는 이벤트핸들러 함수로 사용해야함
  const handleToggleCalendar = () => {
    dispatch(toggleCalendar());
  };

  return (
    <Box width="100%" height={56} borderRadius={2} display="flex" alignItems="center" boxShadow="1px 1px 10px lightgray">
      <Text $fontSize="18px" $fontWeight="700" $marginLeft="16px">
        {format(displayingDate, 'yyyy년 MM월 dd일 (EEE)', { locale: ko })}
      </Text>
      <Box marginTop={0.2}>
        <IconButton size="small" onClick={handleToggleCalendar}>
          <ArrowDropDownIcon fontSize="large" color="action" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TodoHeader;
