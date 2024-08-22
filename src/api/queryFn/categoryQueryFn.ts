import axios, { AxiosError } from 'axios';

export interface Category {
  id: number;
  title: string;
  color: string | null;
  isReported: number | null;
}

export interface CreateCategoryInfo {
  title: string;
  color: string | null;
  isReported: number | null;
}

export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get('/api/category');

    return data.categories;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('AxiosError: 카테고리를 가져올 수 없습니다.', error.message);
    }
    throw error;
  }
};

export const getCategory = async (categoryId: number | undefined): Promise<Category> => {
  try {
    const { data } = await axios.get(`/api/category/${categoryId}`);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('AxiosError: 단일 카테고리를 가져올 수 없습니다.', error.message);
    }
    throw error;
  }
};

export const createCategory = async (createInfo: CreateCategoryInfo): Promise<Category> => {
  try {
    const { data } = await axios.post('/api/category', {
      title: createInfo.title,
      color: createInfo.color,
      isReported: createInfo.isReported,
    });

    return data.category;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('AxiosError: 카테고리를 생성할 수 없습니다.', error.message);
    }
    throw error;
  }
};

export const updateCategory = async (categoryId: number, createInfo: CreateCategoryInfo): Promise<Category> => {
  try {
    const { data } = await axios.put(`/api/category/${categoryId}`, {
      title: createInfo.title,
      color: createInfo.color,
      isReported: createInfo.isReported,
    });

    return data.category;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('AxiosError: 카테고리를 수정할 수 없습니다.', error.message);
    }
    throw error;
  }
};

export const deleteCategory = async (categoryId: number): Promise<string> => {
  try {
    const { data } = await axios.delete(`/api/category/${categoryId}`);

    return data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('AxiosError: 카테고리를 수정할 수 없습니다.', error.message);
      throw error;
    }
    throw error;
  }
};
