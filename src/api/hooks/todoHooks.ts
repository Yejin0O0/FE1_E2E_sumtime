import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  createTodo,
  deleteTodo,
  getOneTodoByTodoId,
  getTodosByDate,
  updateTodo,
  updateTodoTime,
} from '@/api/queryFn/todoQueryFn';
import { SelectTodo, TodoForTimetable } from '@/db/schema/todos';

export const useCreateTodo = (): UseMutationResult<
  SelectTodo,
  Error,
  {
    userId: number;
    title: string;
    date: Date;
    content: string | null;
    startTime: string | null;
    endTime: string | null;
    color: string | null;
    categoryId: number;
  }
> =>
  useMutation({
    mutationFn: ({ userId, title, date, content, startTime, endTime, color, categoryId }) =>
      createTodo(userId, title, date, content, startTime, endTime, color, categoryId),
  });

export const useGetTodosMatchingDate = (userId: number | undefined, date: Date): UseQueryResult<SelectTodo[], Error> =>
  useQuery({
    queryKey: ['todos', userId, date],
    queryFn: () => {
      if (!userId) return Promise.resolve([]); // 클라이언트가 아닌 todoHooks에서 userId 예외처리
      return getTodosByDate(date);
    },
    enabled: !!userId,
  });

export const useGetAllTodosForTimetable = (userId: number): UseQueryResult<TodoForTimetable[], Error> =>
  useQuery({
    queryKey: ['todos', userId],
    queryFn: () => getTodosByDate(new Date()),
    enabled: !!userId,
    select: (data) =>
      data.map((todo) => ({
        ...todo,
        startTime: todo.startTime ? new Date(todo.startTime) : null,
        endTime: todo.endTime ? new Date(todo.endTime) : null,
        taskColor: todo.color,
      })),
  });

export const useGetOneTodo = (todoId: number): UseQueryResult<SelectTodo, Error> =>
  useQuery({ queryKey: ['todo', todoId], queryFn: () => getOneTodoByTodoId(todoId), enabled: !!todoId });

export const useUpdateTodo = (): UseMutationResult<
  SelectTodo,
  Error,
  {
    todoId: number;
    title: string;
    content: string | null;
    startTime: string | null;
    endTime: string | null;
    color: string | null;
  }
> =>
  useMutation({
    mutationFn: ({ todoId, title, content, startTime, endTime, color }) =>
      updateTodo(todoId, title, content, startTime, endTime, color),
  });

export const useUpdateTodoTime = (): UseMutationResult<
  SelectTodo,
  Error,
  { todoId: number; startTime: string | null; endTime: string | null }
> =>
  useMutation({
    mutationFn: ({ todoId, startTime, endTime }) => updateTodoTime(todoId, startTime, endTime),
  });

export const useDeleteTodo = (): UseMutationResult<string, Error, number> =>
  useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
  });
