import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  createTodo,
  deleteTodo,
  getAllTodosByUserId,
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
    createdAt: Date;
    content: string | null;
    startTime: string | null;
    endTime: string | null;
    color: string | null;
  }
> =>
  useMutation({
    mutationFn: ({ userId, title, createdAt, content, startTime, endTime, color }) =>
      createTodo(userId, title, createdAt, content, startTime, endTime, color),
  });

export const useGetAllTodos = (userId: number): UseQueryResult<SelectTodo[], Error> =>
  useQuery({ queryKey: ['todos', userId], queryFn: () => getAllTodosByUserId(userId), enabled: !!userId });
export const useGetTodosMatchingDate = (userId: number, createdAt: Date): UseQueryResult<SelectTodo[], Error> =>
  useQuery({ queryKey: ['todos', userId], queryFn: () => getTodosByDate(userId, createdAt), enabled: !!userId });

export const useGetAllTodosForTimetable = (userId: number): UseQueryResult<TodoForTimetable[], Error> =>
  useQuery({
    queryKey: ['todos', userId],
    queryFn: () => getTodosByDate(userId, new Date()),
    enabled: !!userId,
    select: (data) =>
      data.map((todo) => ({
        ...todo,
        startTime: todo.startTime ? new Date(todo.startTime) : null,
        endTime: todo.endTime ? new Date(todo.endTime) : null,
        id: todo.todoId,
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
