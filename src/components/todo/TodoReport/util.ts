import { PieValueType } from '@mui/x-charts';
import { TodoDateType, Category } from '@/types';

const REMAINING_TIME_ID = 0;
const REMAINING_TIME_NAME = '기록하지 않은 시간';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const calculateRemainingTime = (totalRecordedDuration: number): PieValueType => {
  return {
    id: REMAINING_TIME_ID,
    value: ONE_DAY_MS - totalRecordedDuration,
    label: REMAINING_TIME_NAME,
    color: '#0000004d',
  };
};

const convertToChartData = (dailyTaskSummery: Record<string, PieValueType>) => {
  return Object.keys(dailyTaskSummery).map((key, index) => ({
    id: index,
    value: dailyTaskSummery[key].value / (ONE_DAY_MS / 24 / 60),
    color: dailyTaskSummery[key].color,
    label: dailyTaskSummery[key].label,
  }));
};

const formatToChartData = (todoList: TodoDateType[], categoryList: Category[] | undefined = []) => {
  const dailyTaskSummery: {
    [key: string]: PieValueType;
  } = {};

  todoList.forEach((todo) => {
    const { categoryId, startTime, endTime } = todo;
    const todoCategory = categoryList.find((category) => category.id === categoryId);

    if (!startTime || !endTime || !todoCategory || todoCategory.isDisplayed === 0) {
      return;
    }

    const { id, title, color } = todoCategory;
    const taskDuration = Math.abs(endTime.getTime() - startTime.getTime());
    dailyTaskSummery[title] = {
      id,
      value: (dailyTaskSummery[title]?.value || 0) + taskDuration,
      label: title,
      color: color ?? 'black',
    };
  });

  // 수행한 todo 시간의 총합
  const totalRecordedDuration = Object.values(dailyTaskSummery).reduce((sum, curObj) => sum + curObj.value, 0);
  // 수행한 todo 제외한 모든 시간
  dailyTaskSummery[REMAINING_TIME_NAME] = calculateRemainingTime(totalRecordedDuration);

  return convertToChartData(dailyTaskSummery);
};

const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const formattedHours = hours.toString().padStart(2, ' ');
  const formattedMinutes = mins.toString().padStart(2, '0');

  return mins === 0 ? `${formattedHours}시간` : `${formattedHours}시 ${formattedMinutes}분`;
};

export { formatToChartData, formatMinutesToTime };
