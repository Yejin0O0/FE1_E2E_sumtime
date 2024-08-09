import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  createTodo,
  deleteTodo,
  getAllTodosByUserId,
  getOneTodoByTodoId,
  updateTodo,
  updateTodoTime,
} from '@/api/queryFn/todoQueryFn';
import { SelectTodo } from '@/db/schema/todos';

export const useCreateTodo = (): UseMutationResult<
  SelectTodo,
  Error,
  { userId: number; title: string; content: string; startTime: string; endTime: string; color: string }
> =>
  useMutation({
    mutationFn: ({ userId, title, content, startTime, endTime, color }) =>
      createTodo(userId, title, content, startTime, endTime, color),
  });

export const useGetAllTodos = (userId: number): UseQueryResult<SelectTodo[], Error> =>
  useQuery({ queryKey: ['todos', userId], queryFn: () => getAllTodosByUserId(userId), enabled: !!userId });

export const useGetOneTodo = (todoId: number): UseQueryResult<SelectTodo, Error> =>
  useQuery({ queryKey: ['todo', todoId], queryFn: () => getOneTodoByTodoId(todoId), enabled: !!todoId });

export const useUpdateTodo = (): UseMutationResult<
  SelectTodo,
  Error,
  { todoId: number; title: string; content: string; startTime: string; endTime: string; color: string }
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
