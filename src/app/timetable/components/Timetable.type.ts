interface BaseTask {
  id: number;
  title: string;
  content: string | null;
  taskColor: string | null;
  startTime: Date | null;
  endTime: Date | null;
}

interface TaskSlotContextProps {
  defaultValue: string;
}
type TimetableType = 'CIRCLE' | 'ROW' | 'COLUMN';
type PopoverType = 'CLICK' | 'HOVER';

export type { BaseTask, TimetableType, PopoverType, TaskSlotContextProps };
