import { add } from 'date-fns';
import { useContext, useState } from 'react';
import TaskSlotItem from './TaskSlotItem';
import { Task } from '../Timetable.type';
import TypeContext from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';
import { generateClassNameWithType } from '../../utils';

interface TaskSlotProps {
  headerDate: Date;
  slotTime: number;
  taskItemList: Task[];
  shouldDisplayTaskContentList: boolean[];
  taskSlotStyle: React.CSSProperties;
}
function TaskSlot({ headerDate, slotTime, taskItemList, shouldDisplayTaskContentList, taskSlotStyle = {} }: TaskSlotProps) {
  const [openTaskIndex, setOpenTaskIndex] = useState<number | null>(null);
  const type = useContext(TypeContext);

  const handleOpenChange = (index: number, isOpen: boolean) => {
    setOpenTaskIndex(isOpen ? index : null);
  };

  if (taskItemList.length === 0) {
    return <div className={generateClassNameWithType(styles, 'taskSlotLayout', type)} />;
  }

  const slotStartTime = headerDate;
  const slotEndTime = add(headerDate, { minutes: slotTime });

  return (
    <div className={generateClassNameWithType(styles, 'taskSlotLayout', type)} style={taskSlotStyle}>
      {taskItemList.map((taskItem, index) => {
        const shouldDisplayTaskContent = shouldDisplayTaskContentList[index];

        return (
          <TaskSlotItem
            key={taskItem.id}
            taskItem={taskItem}
            index={index}
            slotStartTime={slotStartTime}
            slotEndTime={slotEndTime}
            slotTime={slotTime}
            shouldDisplayTaskContent={shouldDisplayTaskContent}
            isOpen={openTaskIndex === index}
            onOpenChange={(isOpen) => handleOpenChange(index, isOpen)}
          />
        );
      })}
    </div>
  );
}

export default TaskSlot;
