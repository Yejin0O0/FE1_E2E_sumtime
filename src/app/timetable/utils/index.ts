import { Task } from '../components/Timetable.type';

const getHourAndMinutesFormat = (data: Date) => {
  const hours = data.getHours();
  const minutes = data.getMinutes();
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const currentTime = minutes === 0 ? hours : `${hours}:${minutesFormat}`;

  return currentTime; // HH:MM
};

// 시간을 분단위로 바꿔버리고 더해주는 함수
const sumHoursAndMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

const TimeToMilliseconds = (date: Date) => {
  const hourToMilliseconds = date.getHours() * 60 * 60 * 1000;
  const minutesToMilliseconds = date.getMinutes() * 60 * 1000;
  const secondsToMilliseconds = date.getSeconds() * 1000;

  return hourToMilliseconds + minutesToMilliseconds + secondsToMilliseconds;
};

const calculateTaskOffsetAndHeightPercent = (
  slotStartTime: Date,
  slotEndTime: Date,
  taskStartTime: Date,
  taskEndTime: Date,
  slotTime: number,
) => {
  const slotStartMinutes = sumHoursAndMinutes(slotStartTime);
  const slotEndMinutes = sumHoursAndMinutes(slotEndTime);
  const taskStartMinutes = sumHoursAndMinutes(taskStartTime);
  const taskEndMinutes = sumHoursAndMinutes(taskEndTime);

  let offsetPercent = 0;
  let endPercent = 100;

  if (slotStartMinutes < taskStartMinutes) {
    // 슬롯의 시작시간보다 task의 시작 시간이 늦었다면(즉 slot 도중에 시작했다면)
    offsetPercent = ((taskStartMinutes - slotStartMinutes) / slotTime) * 100;
  }

  if (taskEndMinutes < slotEndMinutes) {
    // task의 끝나는 시간이 slot의 종료 시간보다 늦다면(즉 slot 도중에 끝난다면)
    endPercent = ((taskEndMinutes - slotStartMinutes) / slotTime) * 100;
  }

  const heightPercent = endPercent - offsetPercent;

  return { offsetPercent, heightPercent };
};

const isTimeOverlap = (startTime1: Date, endTime1: Date, startTime2: Date, endTime2: Date): boolean => {
  const startTime1Minutes = sumHoursAndMinutes(startTime1);
  const endTime1Minutes = sumHoursAndMinutes(endTime1);
  const startTime2Minutes = sumHoursAndMinutes(startTime2);
  const endTime2Minutes = sumHoursAndMinutes(endTime2);

  return startTime1Minutes < endTime2Minutes && startTime2Minutes < endTime1Minutes;
};

const getDateFromTime = (hours: number, minutes: number, second: number) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = now.getDate().toString().padStart(2, '0');

  const yearMonthDay = `${year}-${month}-${day}`;
  const hourFormat = hours < 10 ? `0${hours}` : hours;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondeFormat = second < 10 ? `0${second}` : second;

  return new Date(`${yearMonthDay}T${hourFormat}:${minutesFormat}:${secondeFormat}`);
};

const checkTimeOverlapFromTaskList = (taskList: Task[]) => {
  let isOverlap = false;

  for (let i = 0; i < taskList.length; i += 1) {
    for (let j = i + 1; j < taskList.length; j += 1) {
      if (isTimeOverlap(taskList[i].startTime, taskList[i].endTime, taskList[j].startTime, taskList[j].endTime)) {
        isOverlap = true;
        return isOverlap;
      }
    }
  }

  return false;
};

const calculateCurrentTimeOffset = (currentTime: Date, startTime: Date, endTime: Date) => {
  let offsetPercent = 0;
  const currentMinutes = TimeToMilliseconds(currentTime); // 현재 시간
  const startMinutes = TimeToMilliseconds(startTime); // 슬롯의 시작 시간
  const endMinutes = TimeToMilliseconds(endTime); // 슬롯의 종료 시간
  offsetPercent = ((currentMinutes - startMinutes) / (endMinutes - startMinutes)) * 100;

  return { offsetPercent };
};

const filterTaskListByTimeSlot = (taskListInput: Task[], slotStartHour: number, slotMinutes: number) =>
  taskListInput.filter((task: Task) => {
    const taskStartHour = task.startTime.getHours();
    const taskEndHour = task.endTime.getHours();
    const taskEndMinute = task.endTime.getMinutes();

    return (
      taskStartHour <= slotStartHour &&
      taskEndHour >= slotStartHour &&
      !(taskEndHour === slotStartHour && taskEndMinute === slotMinutes % 60)
    );
  });

const isDateInRange = (startDate: Date, date: Date, endDate: Date) => startDate <= date && date <= endDate;

const getShouldDisplayTaskContentList = (taskItemList: Task[], uniqueTaskIdMap: Map<unknown, unknown>): boolean[] =>
  taskItemList.map((taskItem) => {
    const shouldDisplayTaskContent = !!(taskItem?.id && !uniqueTaskIdMap.has(taskItem.id));
    if (taskItem?.id) {
      uniqueTaskIdMap.set(taskItem.id, taskItem.id);
    }
    return shouldDisplayTaskContent;
  });

export {
  getHourAndMinutesFormat,
  sumHoursAndMinutes,
  calculateTaskOffsetAndHeightPercent,
  isTimeOverlap,
  getDateFromTime,
  checkTimeOverlapFromTaskList,
  calculateCurrentTimeOffset,
  filterTaskListByTimeSlot,
  isDateInRange,
  getShouldDisplayTaskContentList,
};

export { hasKey, insertKey } from './map';
export { distributeSize, isFormatString, parseSize, parseSizeFormat, parseSizeValue } from './height';
export { getColor } from './color';
export { generateClassNameWithType } from './css';
