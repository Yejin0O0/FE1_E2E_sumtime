import { add } from 'date-fns';
import { useContext } from 'react';
import TaskSlotItem from './TaskSlotItem';
import { BaseTask } from '../Timetable.type';
import { TypeContext } from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';
import { generateClassNameWithType } from '../../utils';

interface TaskSlotProps<T extends BaseTask> {
  headerDate: Date;
  slotTime: number;
  taskItemList: T[];
  shouldDisplayTaskContentList: boolean[];
  taskSlotStyle: React.CSSProperties;
}

function TaskSlot<T extends BaseTask>({
  headerDate,
  slotTime,
  taskItemList,
  shouldDisplayTaskContentList,
  taskSlotStyle = {},
}: TaskSlotProps<T>) {
  const type = useContext(TypeContext);

  if (taskItemList.length === 0) {
    return <div className={generateClassNameWithType(styles, 'taskSlotLayout', type)} />;
  }

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  return (
    <div className={generateClassNameWithType(styles, 'taskSlotLayout', type)} style={taskSlotStyle}>
      {taskItemList.map((taskItem, index) => {
        const shouldDisplayTaskContent = shouldDisplayTaskContentList[index];
        if (!taskItem.startTime || !taskItem.endTime) {
          return null;
        }
        return (
          <TaskSlotItem
            key={taskItem.id}
            taskItem={taskItem}
            index={index}
            slotStartTime={slotStartTime}
            slotEndTime={slotEndTime}
            slotTime={slotTime}
            shouldDisplayTaskContent={shouldDisplayTaskContent}
          />
        );
      })}
    </div>
  );
}

export default TaskSlot;
