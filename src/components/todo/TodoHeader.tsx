import React, { useContext } from 'react';
import { Text } from '@/components/common';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { TodoDataContext } from '@/context/TodoDataContext';

function TodoHeader({ toggleCalendar }: { toggleCalendar: () => void }) {
  const { displayingDate } = useContext(TodoDataContext);

  return (
    <Box width="100%" height={56} borderRadius={2} display="flex" alignItems="center" boxShadow="1px 1px 10px lightgray">
      <Text $fontSize="18px" $fontWeight="700" $marginLeft="16px">
        {format(displayingDate, 'yyyy년 MM월 dd일 (EEE)', { locale: ko })}
      </Text>
      <Box marginTop={0.2}>
        <IconButton size="small" onClick={toggleCalendar}>
          <ArrowDropDownIcon fontSize="large" color="action" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TodoHeader;
