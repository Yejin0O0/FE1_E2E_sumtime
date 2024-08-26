import axios, { AxiosError } from 'axios';

export interface Category {
  id: number;
  userId: number;
  title: string;
  color: string | null;
  isDisplayed: number | null;
  isDefault: number;
}

export interface CreateCategoryInfo {
  title: string;
  color: string | null;
  isDisplayed: number | null;
}

export const getCategoryList = async (): Promise<Category[]> => {
  try {
    const { data } = await axios.get('/api/categories');

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
    const { data } = await axios.get(`/api/categories/${categoryId}`);

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
    const { data } = await axios.post('/api/categories', {
      title: createInfo.title,
      color: createInfo.color,
      isDisplayed: createInfo.isDisplayed,
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
    const { data } = await axios.put(`/api/categories/${categoryId}`, {
      title: createInfo.title,
      color: createInfo.color,
      isDisplayed: createInfo.isDisplayed,
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
    const { data } = await axios.delete(`/api/categories/${categoryId}`);

    return data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('AxiosError: 카테고리를 수정할 수 없습니다.', error.message);
      throw error;
    }
    throw error;
  }
};
