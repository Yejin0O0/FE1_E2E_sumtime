import { useContext } from 'react';
import { generateClassNameWithType } from '../utils';
import { BaseTask } from './Timetable.type';
import { TypeContext } from '../contexts';
import styles from './Timetable.module.scss';
import TaskSlot from './TaskSlot';
import TimeSlot from './TimeSlot';

interface SlotProps<T extends BaseTask> {
  headerDate: Date;
  slotSize: string;
  slotTime: number;
  taskItemList: T[];
  shouldDisplayTaskContentList: boolean[];
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle: React.CSSProperties;
  slotStyle: React.CSSProperties;
}

function Slot<T extends BaseTask>({
  headerDate,
  slotTime,
  taskItemList,
  slotSize,
  shouldDisplayTaskContentList = [],
  timeSlotStyle,
  taskSlotStyle,
  slotStyle,
}: SlotProps<T>) {
  const type = useContext(TypeContext);
  const style = type === 'ROW' ? { width: slotSize } : { height: slotSize };

  return (
    <div className={generateClassNameWithType(styles, 'slot', type)} style={{ ...slotStyle, ...style }}>
      <TimeSlot headerDate={headerDate} timeSlotStyle={timeSlotStyle} />
      <TaskSlot
        headerDate={headerDate}
        slotTime={slotTime}
        taskItemList={taskItemList}
        shouldDisplayTaskContentList={shouldDisplayTaskContentList}
        taskSlotStyle={taskSlotStyle}
      />
    </div>
  );
}

export default Slot;
