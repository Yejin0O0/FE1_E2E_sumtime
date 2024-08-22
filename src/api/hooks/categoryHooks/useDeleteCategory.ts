import { deleteCategory } from '@/api/queryFn/categoryQueryFn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (categoryId: number) => deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
  });
  return { mutate };
};

export default useDeleteCategory;
