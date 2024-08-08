import axios, { AxiosError } from 'axios';

interface User {
  userId: number;
  email: string;
  nickname: string;
}

export const createUser = async (email: string, password: string, nickname: string): Promise<string> => {
  try {
    const response = await axios.post('/api/user/create', { email, password, nickname });
    return response.data.userId;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error('AxiosError: User를 추가할 수 없습니다.', e.message);
    }
    throw e;
  }
};

export const getUserIdByEmail = async (email: string): Promise<string> => {
  try {
    const response = await axios.get(`/api/user/getIdByEmail?email=${encodeURIComponent(email)}`);
    return response.data.userId;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error('AxiosError: UID를 가져올 수 없습니다.', e.message);
    }
    throw e;
  }
};

export const emailValidation = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.get(`/api/user/emailValidation?email=${encodeURIComponent(email)}`);
    return response.data.isValid;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error('AxiosError: email 검증에 실패했습니다.', e.message);
    }
    throw e;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await axios.post('/api/user/loginValidation', { email, password });
    return response.data.user;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error('AxiosError: login 검증에 실패했습니다.', e.message);
    }
    throw e;
  }
};

export const deleteUser = async (userId: string): Promise<string> => {
  try {
    const { data } = await axios.delete('/api/user/delete/', { data: { userId } });
    return data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
};
