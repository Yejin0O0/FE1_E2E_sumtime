import { ComponentPropsWithoutRef } from 'react';
import useColorPickerFloating from './useColorPickerFloating';
import ColorPicker from '../ColorPicker';
import * as S from './ColorPickerCircle.styled';

interface ColorPickerCircleProps extends ComponentPropsWithoutRef<'button'> {
  color: string;
  setColor: (newColor: string) => void;
  showPalette?: boolean;
  closeFunc?: () => void;
  isOpenColorPicker?: boolean;
}
function ColorPickerCircleButton({
  color,
  setColor,
  closeFunc,
  isOpenColorPicker = true,
  ...restStyleProps
}: ColorPickerCircleProps) {
  const { refs, floatingStyles, isOpen, getReferenceProps, getFloatingProps } = useColorPickerFloating(closeFunc);

  return (
    <>
      <S.CategoryColorCircleLayout
        id="color-input"
        ref={refs.setReference}
        {...restStyleProps}
        {...getReferenceProps(restStyleProps)}
        $backgroundColor={color}
        type="button"
      />
      {isOpen && isOpenColorPicker && (
        <ColorPicker
          color={color}
          setColor={setColor}
          showPalette
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps(restStyleProps)}
        />
      )}
    </>
  );
}

export default ColorPickerCircleButton;
