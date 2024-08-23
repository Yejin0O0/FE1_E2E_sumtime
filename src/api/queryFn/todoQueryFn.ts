import axios, { AxiosError } from 'axios';
import { SelectTodo } from '@/db/schema/todos';

export const createTodo = async (
  userId: number,
  title: string,
  date: Date,
  content: string | null,
  startTime: string | null,
  endTime: string | null,
  color: string | null,
  categoryId: number,
): Promise<SelectTodo> => {
  try {
    const { data } = await axios.post(`/api/todos`, {
      userId,
      title,
      date,
      content,
      startTime,
      endTime,
      color,
      categoryId,
    });
    return data.todo;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const getTodosByDate = async (date: Date): Promise<SelectTodo[]> => {
  try {
    const { data } = await axios.get('/api/todos/', { params: { date } });
    return data.todos;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const getOneTodoByTodoId = async (todoId: number): Promise<SelectTodo> => {
  try {
    const { data } = await axios.get(`/api/todos/${todoId}`);
    return data.todo;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const updateTodo = async (
  todoId: number,
  title: string,
  content: string | null,
  startTime: string | null,
  endTime: string | null,
  color: string | null,
): Promise<SelectTodo> => {
  try {
    const { data } = await axios.put(`/api/todos/${todoId}`, { todoId, title, content, startTime, endTime, color });
    return data.todo;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const updateTodoTime = async (todoId: number, startTime: string | null, endTime: string | null): Promise<SelectTodo> => {
  try {
    const { data } = await axios.put(`/api/todos/${todoId}`, { todoId, startTime, endTime });
    return data.todo;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};

export const deleteTodo = async (todoId: number): Promise<string> => {
  try {
    const { data } = await axios.delete(`/api/todos/${todoId}`, { data: { todoId } });
    return data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};
