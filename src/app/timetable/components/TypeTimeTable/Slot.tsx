import { useContext } from 'react';
import TimeSlot from './TimeSlot';
import TaskSlot from './TaskSlot';
import { generateClassNameWithType } from '../../utils';
import { Task } from '../Timetable.type';
import { TypeContext } from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';

interface SlotProps {
  headerDate: Date;
  size: string;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
  timeSlotStyle: React.CSSProperties;
  taskSlotStyle: React.CSSProperties;
}

function Slot({
  headerDate,
  slotTime,
  taskItemList,
  size,
  shouldDisplayTaskContentList = [],
  timeSlotStyle,
  taskSlotStyle,
}: SlotProps) {
  const type = useContext(TypeContext);
  const style = type === 'ROW' ? { width: size } : { height: size };

  return (
    <div className={generateClassNameWithType(styles, 'slot', type)} style={style}>
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
