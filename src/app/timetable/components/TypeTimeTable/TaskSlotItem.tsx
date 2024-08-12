/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useRef, useEffect, useState } from 'react';
import { calculateTaskOffsetAndHeightPercent, generateClassNameWithType, getRandomColor, getTaskColor } from '../../utils';
import { BaseTask } from '../Timetable.type';
import { TypeContext, PopoverTypeContext, TaskSlotContext, TaskThemeContext } from '../../contexts';
import styles from './TypeTimeTable.module.scss';
import usePopoverFloating from '../../hooks/usePopoverFloating';

interface TaskSlotItemProps<T extends BaseTask> {
  taskItem: T;
  index: number;
  shouldDisplayTaskContent: boolean;
  slotStartTime: Date;
  slotEndTime: Date;
  slotTime: number;
}

function TaskSlotItem<T extends BaseTask>({
  taskItem,
  shouldDisplayTaskContent,
  slotStartTime,
  slotEndTime,
  slotTime,
}: TaskSlotItemProps<T>) {
  const { startTime, endTime, title, content } = taskItem;
  const taskSlotRef = useRef<HTMLDivElement>(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const type = useContext(TypeContext);
  const taskOption = useContext(TaskSlotContext);
  const popoverType = useContext(PopoverTypeContext);
  const taskColorTheme = useContext(TaskThemeContext);

  const { refs, fixFloatingTargetPosition, floatingStyles, getFloatingProps, getReferenceProps, isFloatingTargetVisible } =
    usePopoverFloating(popoverType);

  if (!startTime || !endTime) {
    return null;
  }

  const { offsetPercent, heightPercent } = calculateTaskOffsetAndHeightPercent(
    slotStartTime,
    slotEndTime,
    startTime,
    endTime,
    slotTime,
  );

  const taskSlotColor = getTaskColor(taskItem) ?? getRandomColor(taskItem, taskColorTheme);

  const positionStyles =
    type === 'ROW'
      ? { top: '0', left: `${offsetPercent}%`, width: `${heightPercent}%` }
      : { top: `${offsetPercent}%`, left: '0', height: `${heightPercent}%` };

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
        ref={refs.setReference}
        {...getReferenceProps}
        className={generateClassNameWithType(styles, 'buttonInherit', type)}
        style={{
          ...positionStyles,
          backgroundColor: `${taskSlotColor}`,
        }}
        onClick={fixFloatingTargetPosition}
      >
        <div ref={taskSlotRef} className={generateClassNameWithType(styles, 'taskSlotBackground', type)}>
          {shouldDisplayTaskContent && isContentVisible && (
            <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
              <p className={generateClassNameWithType(styles, 'title', type)}>{title}</p>
            </div>
          )}
          {shouldDisplayTaskContent && !isContentVisible && (
            <div className={generateClassNameWithType(styles, 'taskSlotContent', type)}>
              <p className={generateClassNameWithType(styles, 'title', type)}>{taskOption.defaultValue}</p>
            </div>
          )}
        </div>
      </button>
      {isFloatingTargetVisible && (
        <div
          {...getFloatingProps()}
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            background: 'white',
            border: '1px solid black',
            padding: 30,
            zIndex: 100,
          }}
        >
          <div>{title}</div>
          {content && <div>{content}</div>}
        </div>
      )}
    </div>
  );
}

export default TaskSlotItem;
