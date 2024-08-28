import { SelectTodo } from '@/db/schema/todos';
import { TIME_ZONE } from '@/constants';
import { toZonedTime } from 'date-fns-tz';

export function convertTodosForTimetable(todoList: SelectTodo[]) {
  if (!todoList || todoList.length === 0) return [];

  return todoList.map((todo) => ({
    ...todo,
    startTime: todo.startTime ? toZonedTime(new Date(todo.startTime), TIME_ZONE) : null,
    endTime: todo.endTime ? toZonedTime(new Date(todo.endTime), TIME_ZONE) : null,
    id: todo.id,
    taskColor: todo.color,
  }));
}
