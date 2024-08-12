'use client';

import { useCallback, useMemo } from 'react';
import { eachMinuteOfInterval } from 'date-fns';
import { parseSize, distributeSize, checkTimeOverlapFromTaskList } from '../utils';
import { PopoverType, BaseTask, TimetableType, TaskThemeType } from './Timetable.type';
import { ContextProvider } from '../contexts';
import TypeTimeTable from './TypeTimeTable';

interface TimetableProps<T extends BaseTask> {
  startTime: Date;
  endTime: Date;
  slotTime: number;
  timeTableSize: string;
  timetableType: TimetableType;
  taskList: T[];
  displayCurrentTime?: boolean;
  defaultValue: string;
  currentTimeLineStyle?: string;
  popoverType?: PopoverType;
  timeTableStyle?: React.CSSProperties;
  timeSlotStyle?: React.CSSProperties;
  taskSlotStyle?: React.CSSProperties;
  slotStyle?: React.CSSProperties;
  taskTheme?: TaskThemeType;
}

function Timetable<T extends BaseTask>({
  startTime,
  endTime,
  slotTime,
  timeTableSize,
  timetableType,
  displayCurrentTime = false,
  taskList,
  popoverType = 'CLICK',
  timeTableStyle = { backgroundColor: 'white' },
  timeSlotStyle = { color: 'black' },
  taskSlotStyle = { color: 'black' },
  defaultValue,
  currentTimeLineStyle,
  taskTheme,
  slotStyle = {},
}: TimetableProps<T>) {
  const checkOverlapFromTaskList = useCallback(
    (currentTaskList: T[]) => checkTimeOverlapFromTaskList(currentTaskList),
    [taskList],
  );

  if (checkOverlapFromTaskList(taskList)) {
    throw new Error('task time is overlap. please check your taskList');
  }

  const timeSlots = eachMinuteOfInterval(
    {
      start: startTime,
      end: endTime,
    },
    { step: slotTime },
  );

  const { value, format } = parseSize(timeTableSize);
  const slotSize = distributeSize(value, timeSlots.length, format);

  const contextValue = useMemo(
    () => ({
      defaultValue,
    }),
    [defaultValue],
  );

  return (
    <ContextProvider timetableType={timetableType} popoverType={popoverType} contextValue={contextValue} taskTheme={taskTheme}>
      <TypeTimeTable
        timeSlots={timeSlots}
        slotSize={slotSize}
        taskList={taskList}
        slotTime={slotTime}
        displayCurrentTime={displayCurrentTime}
        timeSlotStyle={timeSlotStyle}
        taskSlotStyle={taskSlotStyle}
        timeTableStyle={timeTableStyle}
        size={timeTableSize}
        startTime={startTime}
        endTime={endTime}
        currentTimeLineStyle={currentTimeLineStyle}
        slotStyle={slotStyle}
      />
    </ContextProvider>
  );
}

export default Timetable;
