import axios, { AxiosError } from 'axios';

export const createTodo = async (
  userId: string,
  title: string,
  content: string,
  startTime: string,
  endTime: string,
  color: string,
) => {
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

export const getAllByUserId = async (userId: string) => {
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

export const getOneByTodoId = async (todoId: string) => {
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
  content: string,
  startTime: string,
  endTime: string,
  color: string,
) => {
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
export const deleteTodo = async (todoId: string) => {
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
