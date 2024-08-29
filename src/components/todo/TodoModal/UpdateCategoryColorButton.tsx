import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import ColorPickerCircleButton from '@/components/ColorPickerCircleButton';
import { MouseEvent, useState } from 'react';
import useUpdateCategory from '@/api/hooks/categoryHooks/useUpdateCategory';

interface UpdateCategoryColorButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  categoryId: number;
}

function UpdateCategoryColorButton({ categoryId, ...otherProps }: UpdateCategoryColorButtonProps) {
  const { categoryList } = useGetCategoryList();
  const { mutate: updateCategoryMutate } = useUpdateCategory();
  const updateTargetCategory = categoryList?.find(({ id }) => categoryId === id);
  const [color, setColor] = useState(updateTargetCategory?.color);
  const { onClick } = otherProps;

  const checkDefault = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!color || !updateTargetCategory) {
      return;
    }

    if (updateTargetCategory.isDefault === 1) {
      alert('기본 카테고리는 수정할 수 없습니다');
    }

    if (!onClick) {
      return;
    }

    onClick(event);
  };

  const updateCategory = () => {
    if (!color || !updateTargetCategory) {
      return;
    }

    updateCategoryMutate({ categoryId, createInfo: { ...updateTargetCategory, color } });
  };

  if (!color) {
    return <div />;
  }

  return (
    <ColorPickerCircleButton
      {...otherProps}
      onClick={(e) => checkDefault(e)}
      color={color}
      setColor={setColor}
      closeFunc={updateCategory}
      isOpenColorPicker={updateTargetCategory?.isDefault !== 1}
    />
  );
}

export default UpdateCategoryColorButton;
