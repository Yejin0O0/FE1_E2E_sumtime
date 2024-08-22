import { useQuery } from '@tanstack/react-query';
import { getCategory } from '@/api/queryFn/categoryQueryFn';

const useGetCategory = (id: number | undefined) => {
  const { data: categoryList } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });

  return categoryList;
};

export default useGetCategory;
