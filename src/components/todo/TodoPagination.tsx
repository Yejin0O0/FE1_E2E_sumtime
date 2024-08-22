import React from 'react';
import { Pagination } from '@mui/material';
import { getDaysInMonth } from 'date-fns';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

function TodoPagination() {
  const displayingDate = useAppSelector((state) => state.todoData.displayingDate);
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
        defaultPage={displayingDate.getDate()}
        page={displayingDate.getDate()}
        onChange={(e, value) => {
          const newDate = new Date(displayingDate);
          newDate.setDate(value);
          const newYear = newDate.getFullYear();
          const newMonth = newDate.getMonth() + 1;
          const newDay = newDate.getDate();
          router.push(`/day/${newYear}/${newMonth}/${newDay}`);
        }}
        count={getDaysInMonth(displayingDate)}
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
