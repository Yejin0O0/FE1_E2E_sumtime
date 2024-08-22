import useBooleanState from '@/hooks/utils/useBooleanState';
import { Button, TableCell, TableFooter, TableRow } from '@mui/material';
import useCreateCategory from '@/api/hooks/categoryHooks/useCreateCategory';
import { useState } from 'react';
import { CreateCategoryInfo } from '@/api/queryFn/categoryQueryFn';
import CategoryModal from './CategoryModal';

function CategoryTableFooter() {
  const { value: isOpen, setTrue: open, setFalse: close } = useBooleanState();
  const [data, setData] = useState<CreateCategoryInfo>(() => ({
    title: '',
    isReported: 0,
    color: '',
  }));

  const resetForm = () => {
    setData({
      title: '',
      isReported: 0,
      color: '',
    });
  };

  const setCategoryData = (unit: keyof typeof data, value: number | string | boolean) => {
    setData((prevData) => ({
      ...prevData,
      [unit]: value,
    }));
  };

  const { mutate: createCategory } = useCreateCategory();

  const createFunction = (body: CreateCategoryInfo) => {
    createCategory(body);
    resetForm();
    close();
  };

  const handleCloseModal = () => {
    resetForm();
    close();
  };

  return (
    <TableFooter sx={{ position: 'sticky', bottom: 0, backgroundColor: 'lightgray', zIndex: 1 }}>
      <TableRow>
        <TableCell colSpan={4} align="center" sx={{ fontSize: '15px', color: 'gray', border: 0, padding: 0 }}>
          <Button sx={{ width: '100%', padding: '20px' }} onClick={open}>
            + Add New Category
          </Button>
        </TableCell>
      </TableRow>
      <CategoryModal
        isOpen={isOpen}
        close={handleCloseModal}
        title="생성"
        mutateAction={createFunction}
        data={data}
        setData={setCategoryData}
      />
    </TableFooter>
  );
}

export default CategoryTableFooter;
