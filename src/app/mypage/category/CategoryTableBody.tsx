import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import { Flex } from '@/components/common';
import { Button, styled, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { useState } from 'react';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';
import { CreateCategoryInfo } from '@/api/queryFn/categoryQueryFn';
import * as S from './Category.styled';
import CategoryModal from './CategoryModal';

interface StyledTableRowProps {
  disabled: boolean;
}

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
    return isDisplayed ? '포함' : '미포함';
  };

  if (!categoryList) return null;

  const StyledTableRow = styled(TableRow)<StyledTableRowProps>(({ theme, disabled }) => ({
    backgroundColor: disabled ? theme.palette.action.hover : 'inherit',
    cursor: disabled ? 'not-allowed' : 'default',
    opacity: disabled ? 0.5 : 1,
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '& td': {
      color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
    },
  }));

  return (
    <TableBody>
      {categoryList.map((category) => {
        const isDisable = category.isDefault === 1;
        return (
          <Tooltip key={category.id} title="기본 카테고리는 수정 불가능 합니다." disableHoverListener={!isDisable}>
            <StyledTableRow disabled={isDisable}>
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
                  disabled={isDisable}
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
            </StyledTableRow>
          </Tooltip>
        );
      })}
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
