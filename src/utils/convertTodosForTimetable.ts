import { SelectTodo } from '@/db/schema/todos';

export function convertTodosForTimetable(todoList: SelectTodo[]) {
  if (!todoList || todoList.length === 0) return [];

  return todoList.map((todo) => ({
    ...todo,
    startTime: todo.startTime ? new Date(todo.startTime) : null,
    endTime: todo.endTime ? new Date(todo.endTime) : null,
    id: todo.todoId,
    taskColor: todo.color,
  }));
}
