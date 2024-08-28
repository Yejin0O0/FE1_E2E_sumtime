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
import { toZonedTime } from 'date-fns-tz';
import { TIME_ZONE } from '@/constants';

// const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

export const useGetTodosMatchingDate = (userId: number | undefined, date: Date | null): UseQueryResult<SelectTodo[], Error> =>
  useQuery({
    queryKey: ['todos', userId, date],
    queryFn: () => {
      if (!userId) return Promise.resolve([]); // 클라이언트가 아닌 todoHooks에서 userId 예외처리
      if (!date) return [];
      return getTodosByDate(date);
    },
    enabled: !!userId,
  });

export const useGetAllTodosForTimetable = (userId: number): UseQueryResult<TodoForTimetable[], Error> =>
  useQuery({
    queryKey: ['todos', userId],
    queryFn: () => getTodosByDate(toZonedTime(new Date(), TIME_ZONE)),
    enabled: !!userId,
    select: (data) =>
      data.map((todo) => ({
        ...todo,
        startTime: todo.startTime ? toZonedTime(new Date(todo.startTime), TIME_ZONE) : null,
        endTime: todo.endTime ? toZonedTime(new Date(todo.endTime), TIME_ZONE) : null,
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
    isProgress: boolean;
    color: string | null;
    categoryId: number;
  }
> =>
  useMutation({
    mutationFn: ({ todoId, title, content, startTime, endTime, isProgress, color, categoryId }) =>
      updateTodo(todoId, title, content, startTime, endTime, isProgress, color, categoryId),
  });

export const useUpdateTodoTime = (): UseMutationResult<
  SelectTodo,
  Error,
  { todoId: number; startTime: string | null; endTime: string | null; isProgress: boolean }
> =>
  useMutation({
    mutationFn: ({ todoId, startTime, endTime, isProgress }) => updateTodoTime(todoId, startTime, endTime, isProgress),
  });

export const useDeleteTodo = (): UseMutationResult<string, Error, number> =>
  useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
  });
