import { useContext } from 'react';
import Slot from './Slot';
import { Task } from '../Timetable.type';
import { generateClassNameWithType, filterTaskListByTimeSlot, isDateInRange, getShouldDisplayTaskContentList } from '../../utils';
import TypeContext from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';
import CurrentTimeLine from '../CurrentTimeLine';

interface TypeTimeTableProps {
  timeSlots: Date[];
  slotSize: string;
  taskList: Task[];
  slotTime: number;
  size: string;
  startTime: Date;
  endTime: Date;
  displayCurrentTime?: boolean;
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
  timeTableStyle?: React.CSSProperties;
}

function TypeTimeTable({
  timeSlots,
  slotSize,
  timeSlotStyle,
  taskList,
  slotTime,
  displayCurrentTime,
  taskSlotStyle = {},
  timeTableStyle = {},
  size,
  startTime,
  endTime,
}: TypeTimeTableProps) {
  const type = useContext(TypeContext);
  const uniqueTaskIdMap = new Map();
  const isCurrentTimeVisible = displayCurrentTime && isDateInRange(timeSlots[0], new Date(), timeSlots[timeSlots.length - 1]);

  return (
    <div className={generateClassNameWithType(styles, 'container', type)} style={timeTableStyle}>
      {isCurrentTimeVisible && <CurrentTimeLine startTime={startTime} endTime={endTime} size={size} />}
      {timeSlots.map((time, index) => {
        const key = `${time.toDateString()}${index}`;
        const taskItemList = filterTaskListByTimeSlot(taskList, time.getHours(), slotTime);
        const shouldDisplayTaskContentList = getShouldDisplayTaskContentList(taskItemList, uniqueTaskIdMap);

        return (
          <Slot
            key={key}
            headerDate={time}
            size={slotSize}
            timeSlotStyle={timeSlotStyle}
            shouldDisplayTaskContentList={shouldDisplayTaskContentList}
            slotTime={slotTime}
            taskItemList={taskItemList}
            taskSlotStyle={taskSlotStyle}
          />
        );
      })}
    </div>
  );
}

export default TypeTimeTable;
