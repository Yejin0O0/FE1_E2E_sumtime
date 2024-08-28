import { deleteCategory } from '@/api/queryFn/categoryQueryFn';
import { useMutation } from '@tanstack/react-query';

const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (categoryId: number) => deleteCategory(categoryId),
  });
};

export default useDeleteCategory;
