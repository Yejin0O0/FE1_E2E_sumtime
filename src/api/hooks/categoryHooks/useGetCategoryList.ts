import { useQuery } from '@tanstack/react-query';
import { getCategoryList } from '@/api/queryFn/categoryQueryFn';

const useGetCategoryList = () => {
  const { data: categoryList } = useQuery({
    queryKey: ['categoryList'],
    queryFn: () => getCategoryList(),
  });

  return categoryList;
};

export default useGetCategoryList;
