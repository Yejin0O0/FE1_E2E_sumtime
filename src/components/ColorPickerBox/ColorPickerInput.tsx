import React from 'react';
import useColorPickerFloating from './useColorPickerFloating';
import ColorPicker from '../ColorPicker';
import * as S from './ColorPickerBox.styled';

interface ColorPickerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color: string;
  setColor: (newColor: string) => void;
  showPalette?: boolean;
}
function ColorPickerInput({ color, setColor, ...restStyleProps }: ColorPickerInputProps) {
  const { refs, floatingStyles, isOpen, getReferenceProps, getFloatingProps } = useColorPickerFloating();

  return (
    <>
      <S.ColorPickerInputLayout
        {...restStyleProps}
        id="color-input"
        ref={refs.setReference}
        {...getReferenceProps()}
        $backgroundColor={color}
      />
      {isOpen && (
        <ColorPicker
          color={color}
          setColor={setColor}
          showPalette
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        />
      )}
    </>
  );
}

export default ColorPickerInput;
