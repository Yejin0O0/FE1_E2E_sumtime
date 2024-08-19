import React from 'react';
import Box from '@mui/material/Box';
import { DateCalendar } from '@mui/x-date-pickers';
import { useRouter } from 'next/navigation';

interface PropsType {
  isOpened: boolean;
  date: Date;
  toggleOpen: () => void;
}

function TodoCalendar({ isOpened, date, toggleOpen }: PropsType) {
  const router = useRouter();

  return (
    <Box
      position="absolute"
      zIndex="1"
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
          toggleOpen();
        }}
      />
    </Box>
  );
}

export default TodoCalendar;
