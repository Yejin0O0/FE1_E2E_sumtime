import { useContext } from 'react';
import Slot from './Slot';
import { BaseTask } from '../Timetable.type';
import { generateClassNameWithType, filterTaskListByTimeSlot, isDateInRange, getShouldDisplayTaskContentList } from '../../utils';
import { TypeContext } from '../../contexts/TypeContext';
import styles from './TypeTimeTable.module.scss';
import CurrentTimeLine from '../CurrentTimeLine';

interface TypeTimeTableProps<T extends BaseTask> {
  timeSlots: Date[];
  slotSize: string;
  taskList: T[];
  slotTime: number;
  size: string;
  startTime: Date;
  endTime: Date;
  displayCurrentTime?: boolean;
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
  timeTableStyle?: React.CSSProperties;
  currentTimeLineStyle?: string;
}

function TypeTimeTable<T extends BaseTask>({
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
  currentTimeLineStyle,
}: TypeTimeTableProps<T>) {
  const type = useContext(TypeContext);
  const uniqueTaskIdMap = new Map();

  const isCurrentTimeVisible = displayCurrentTime && isDateInRange(timeSlots[0], new Date(), timeSlots[timeSlots.length - 1]);

  return (
    <div className={generateClassNameWithType(styles, 'container', type)} style={timeTableStyle}>
      {isCurrentTimeVisible && (
        <CurrentTimeLine startTime={startTime} endTime={endTime} size={size} currentTimeLineStyle={currentTimeLineStyle} />
      )}
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
