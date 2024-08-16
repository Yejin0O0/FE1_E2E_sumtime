import React from 'react';
import { Pagination } from '@mui/material';
import { getDaysInMonth } from 'date-fns';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

interface PropsType {
  date: Date;
  setDate: (date: Date) => void;
}

function TodoPagination({ date, setDate }: PropsType) {
  const router = useRouter();
  return (
    <Box
      marginTop={1}
      marginBottom={1}
      padding={1}
      borderRadius={2}
      width="100%"
      display="flex"
      justifyContent="center"
      boxShadow="1px 1px 10px lightgray"
    >
      <Pagination
        defaultPage={date.getDate()}
        page={date.getDate()}
        onChange={(e, value) => {
          const newDate = new Date(date);
          newDate.setDate(value);
          setDate(newDate);
          const newYear = newDate.getFullYear();
          const newMonth = newDate.getMonth() + 1;
          const newDay = newDate.getDate();
          router.push(`/mainpagetest/day/${newYear}/${newMonth}/${newDay}`);
        }}
        count={getDaysInMonth(date)}
        siblingCount={5}
        boundaryCount={0}
        color="primary"
        size="medium"
        showFirstButton
        showLastButton
        hideNextButton
        hidePrevButton
      />
    </Box>
  );
}

export default TodoPagination;
