import { createCategory, CreateCategoryInfo } from '@/api/queryFn/categoryQueryFn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (createInfo: CreateCategoryInfo) => createCategory(createInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categoryList'] });
    },
  });
  return { mutate };
};

export default useCreateCategory;
