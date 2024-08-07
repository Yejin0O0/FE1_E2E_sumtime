/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { flip, offset, useClick, useDismiss, useFloating, useInteractions, useMergeRefs } from '@floating-ui/react';
import { calculateTaskOffsetAndHeightPercent, getColor, generateClassNameWithType } from '../../utils';
import { Task } from '../Timetable.type';
import TaskSlotContext from '../../TaskSlotContext';
import TypeContext from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';

interface TaskSlotItemProps {
  taskItem: Task;
  index: number;
  shouldDisplayTaskContent: boolean;
  slotStartTime: Date;
  slotEndTime: Date;
  slotTime: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function TaskSlotItem({
  taskItem,
  shouldDisplayTaskContent,
  slotStartTime,
  slotEndTime,
  slotTime,
  isOpen,
  onOpenChange,
}: TaskSlotItemProps) {
  const { startTime, endTime, taskColor, title, subTitle, id } = taskItem;
  const taskSlotRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const type = useContext(TypeContext);
  const taskOption = useContext(TaskSlotContext);

  const {
    refs: menuRefs,
    floatingStyles: menuFloatingStyles,
    context: menuContext,
  } = useFloating({
    open: isOpen,
    onOpenChange,
    middleware: [offset({ mainAxis: 0, crossAxis: 400 }), flip()],
  });

  const { getReferenceProps: getMenuReferenceProps, getFloatingProps: getMenuFloatingProps } = useInteractions([
    useClick(menuContext),
    useDismiss(menuContext),
  ]);

  const ref = useMergeRefs([menuRefs.setReference]);

  const props = getMenuReferenceProps();

  const { offsetPercent, heightPercent } = calculateTaskOffsetAndHeightPercent(
    slotStartTime,
    slotEndTime,
    startTime,
    endTime,
    slotTime,
  );

  const taskSlotColor = taskColor ?? getColor(id);
  const positionStyles =
    type === 'ROW'
      ? { top: '0', left: `${offsetPercent}%`, width: `${heightPercent}%` }
      : { top: `${offsetPercent}%`, left: '0', height: `${heightPercent}%` };
  const floatingPositionStyles = type === 'ROW' ? { left: `${offsetPercent}%` } : { top: `${offsetPercent}%` };

  useEffect(() => {
    if (type === 'ROW') {
      if (taskSlotRef.current) {
        const width = taskSlotRef.current.offsetWidth;
        setIsContentVisible(width > 40);
      }
    }
    if (type === 'COLUMN') {
      if (taskSlotRef.current) {
        const height = taskSlotRef.current.offsetHeight;
        setIsContentVisible(height > 40);
      }
    }
  }, [taskSlotRef.current, type]);

  return (
    <div>
      <button
        type="button"
        ref={ref}
        {...props}
        className={generateClassNameWithType(styles, 'buttonInherit', type)}
        style={{
          ...positionStyles,
          backgroundColor: `${taskSlotColor}`,
        }}
      >
        <div ref={taskSlotRef} className={generateClassNameWithType(styles, 'taskSlotBackground', type)}>
          {shouldDisplayTaskContent &&
            isContentVisible && ( // taskSlotContent
              <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
                <p className={generateClassNameWithType(styles, 'title', type)}>{title}</p>
                <p className={generateClassNameWithType(styles, 'description', type)}>{subTitle}</p>
              </div>
            )}
          {shouldDisplayTaskContent &&
            !isContentVisible && ( // taskSlotContent
              <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
                <p className={generateClassNameWithType(styles, 'title', type)}>{taskOption.defaultValue}</p>
              </div>
            )}
        </div>
      </button>
      {shouldDisplayTaskContent && isOpen && (
        <div
          ref={menuRefs.setFloating}
          style={{
            ...menuFloatingStyles,
            background: 'white',
            border: '1px solid black',
            transform: 'none',
            padding: 30,
            zIndex: 100,
            ...floatingPositionStyles,
          }}
          {...getMenuFloatingProps()}
        >
          {title}
          {subTitle}
        </div>
      )}
    </div>
  );
}

export default TaskSlotItem;
