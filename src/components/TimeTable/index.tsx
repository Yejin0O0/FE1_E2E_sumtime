'use client';

import Timetable, { getTodayFromTime } from 'react-custom-timetable';
import { convertTodosForTimetable } from '@/utils/convertTodosForTimetable';
import { useAppSelector } from '@/lib/hooks';
import * as S from './TimeTable.styled';

function TimeTable() {
  const { todoListData } = useAppSelector((state) => state.todoData);
  const allTodosForTimetable = convertTodosForTimetable(todoListData);
  const startTime = getTodayFromTime(0, 0, 1);
  const endTime = getTodayFromTime(23, 59, 59);

  return (
    <S.TimeTableSection>
      {allTodosForTimetable && (
        <Timetable
          totalStartTime={startTime}
          totalEndTime={endTime}
          slotRange={60}
          taskList={allTodosForTimetable}
          timeTableSize="2000px"
          timetableDirection="COLUMN"
          displayCurrentTime
          ellipsisText="+"
          currentTimeLineStyle="dashed 1px red"
        />
      )}
    </S.TimeTableSection>
  );
}

export default TimeTable;
