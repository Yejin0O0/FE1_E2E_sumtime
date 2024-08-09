'use client';

import Timetable from './components/Timetable';
import { taskList, startTime, endTime, slotTime } from './mocks/timetableMockData';

export default function TimetablePage() {
  return (
    <>
      <div style={{ width: '800px', height: '500px' }}>
        <Timetable // ROW
          startTime={startTime}
          endTime={endTime}
          slotTime={slotTime}
          taskList={taskList}
          timeTableSize="2000px"
          timetableType="ROW"
          displayCurrentTime
          timeTableStyle={{ backgroundColor: 'white' }}
          timeSlotStyle={{ color: 'black' }}
          taskSlotStyle={{ color: 'black' }}
          popoverType="HOVER"
          defaultValue="..."
        />
      </div>
      <div style={{ height: '500px', width: '800px' }}>
        <Timetable // COLUMN
          startTime={startTime}
          endTime={endTime}
          slotTime={slotTime}
          taskList={taskList}
          timeTableSize="2000px"
          timetableType="COLUMN"
          displayCurrentTime
          timeTableStyle={{ backgroundColor: 'white' }}
          timeSlotStyle={{ color: 'black' }}
          taskSlotStyle={{ color: 'black' }}
          defaultValue="..."
        />
      </div>
    </>
  );
}
