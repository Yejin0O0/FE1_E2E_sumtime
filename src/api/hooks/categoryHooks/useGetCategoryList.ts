import { useQuery } from '@tanstack/react-query';
import { getCategoryList } from '@/api/queryFn/categoryQueryFn';

const useGetCategoryList = () => {
  const { data: categoryList, isLoading } = useQuery({
    queryKey: ['categoryList'],
    queryFn: () => getCategoryList(),
  });

  return { categoryList, isLoading };
};

export default useGetCategoryList;
