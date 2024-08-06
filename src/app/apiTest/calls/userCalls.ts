import axios, { AxiosError } from 'axios';

export const createUser = async (email: string, password: string, nickname: string) => {
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

export const getUserIdByEmail = async (email: string) => {
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

export const emailValidation = async (email: string) => {
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

export const loginValidation = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/user/loginValidation', { email, password });
    return response.data.isValid;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error('AxiosError: login 검증에 실패했습니다.', e.message);
    }
    throw e;
  }
};
