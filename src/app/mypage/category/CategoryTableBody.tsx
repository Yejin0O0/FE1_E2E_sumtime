import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import { Flex } from '@/components/common';
import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useState } from 'react';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import { CreateCategoryInfo } from '@/api/queryFn/categoryQueryFn';
import * as S from './Category.styled';
import CategoryModal from './CategoryModal';

function CategoryTableBody() {
  const { value: isOpen, setTrue: open, setFalse: close } = useBooleanState();
  const [id, setId] = useState<number | undefined>(undefined);

  const categoryList = useGetCategoryList();

  const { mutate: updateCategory } = useUpdateCategory();

  const [data, setData] = useState<CreateCategoryInfo>(() => ({
    title: '',
    isDisplayed: 0,
    color: '',
  }));

  const setCategoryData = (unit: keyof typeof data, value: number | string | boolean) => {
    setData((prevData) => ({
      ...prevData,
      [unit]: value,
    }));
  };

  const handleUpdateCategory = (categoryId: number, createInfo: CreateCategoryInfo) => {
    updateCategory({ categoryId, createInfo });
  };

  const mutateFunction = (body: CreateCategoryInfo) => {
    handleUpdateCategory(id!, body);
    close();
  };

  const clickUpdateButton = (categoryId: number) => {
    setId(categoryId);
    open();
  };

  const handleCloseModal = () => {
    setId(undefined);
    close();
  };

  const convertBoolStateToString = (isDisplayed: number | null) => {
    return isDisplayed ? '공개' : '비공개';
  };

  if (!categoryList) return null;

  return (
    <TableBody>
      {categoryList.map((category) => (
        <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row" sx={{ maxWidth: '200px', overflowX: 'auto' }}>
            {category.title}
          </TableCell>
          <TableCell align="right">
            <Flex $gap="20px">
              <S.ColorState hexColor={category.color} />
              <S.ColorCode>{category.color}</S.ColorCode>
            </Flex>
          </TableCell>
          <TableCell align="right">{convertBoolStateToString(category.isDisplayed)}</TableCell>
          <TableCell align="right">
            <Button
              onClick={() => {
                setCategoryData('title', category.title);
                setCategoryData('color', category.color || '');
                setCategoryData('isDisplayed', category.isDisplayed || 0);
                clickUpdateButton(category.id);
              }}
            >
              수정
            </Button>
          </TableCell>
        </TableRow>
      ))}
      <CategoryModal
        isOpen={isOpen}
        close={handleCloseModal}
        title="수정"
        mutateAction={mutateFunction}
        data={data}
        setData={setCategoryData}
        id={id}
      />
    </TableBody>
  );
}

export default CategoryTableBody;
