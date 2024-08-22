import { CreateCategoryInfo, updateCategory } from '@/api/queryFn/categoryQueryFn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateCategoryParams {
  categoryId: number;
  createInfo: CreateCategoryInfo;
}

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ categoryId, createInfo }: UpdateCategoryParams) => updateCategory(categoryId, createInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
  });
  return { mutate };
};

export default useUpdateCategory;
