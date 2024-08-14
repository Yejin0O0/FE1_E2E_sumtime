'use client';

import { useGetAllTodosForTimetable } from '@/api/hooks/todoHooks';
import Timetable from '@/app/timetable/components';
import * as S from './TimeTable.styled';
import { startTime, endTime } from '../../app/timetable/mocks/timetableMockData';

function TimeTable() {
  const { data: allTodosForTimetable } = useGetAllTodosForTimetable(1);

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
