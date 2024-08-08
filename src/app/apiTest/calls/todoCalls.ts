import axios, { AxiosError } from 'axios';
import { SelectTodo } from '@/db/schema/todos';

export const createTodo = async (
  userId: string,
  title: string,
  content: string | null,
  startTime: string | null,
  endTime: string | null,
  color: string | null,
): Promise<SelectTodo> => {
  try {
    const { data } = await axios.post('/api/todo/create', { userId, title, content, startTime, endTime, color });
    return data.todo;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const getAllTodosByUserId = async (userId: string): Promise<SelectTodo[]> => {
  try {
    const { data } = await axios.post('/api/todo/getAllByUserId', { userId });
    return data.todos;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const getOneTodoByTodoId = async (todoId: string): Promise<SelectTodo> => {
  try {
    const { data } = await axios.post('/api/todo/getOneByTodoId', { todoId });
    return data.todo;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const updateTodo = async (
  todoId: string,
  title: string,
  content: string | null,
  startTime: string | null,
  endTime: string | null,
  color: string | null,
): Promise<SelectTodo> => {
  try {
    const { data } = await axios.put('/api/todo/update', { todoId, title, content, startTime, endTime, color });
    return data.todo;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const updateTodoTime = async (todoId: string, startTime: string | null, endTime: string | null): Promise<SelectTodo> => {
  try {
    const { data } = await axios.put('/api/todo/updateTime', { todoId, startTime, endTime });
    return data.todo;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const deleteTodo = async (todoId: string): Promise<string> => {
  try {
    const { data } = await axios.delete('/api/todo/delete/', { data: { todoId } });
    return data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};
