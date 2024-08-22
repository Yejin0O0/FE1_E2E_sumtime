import { useState } from 'react';
import { useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import * as S from './ColorPickerInput.styled';
import ColorPicker from '../ColorPicker';

interface ColorPickerInputProps {
  color: string;
  setColor: (newColor: string) => void;
}

function ColorPickerInput({ color, setColor }: ColorPickerInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'right-start',
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <S.ColorPickerInputLayout $gap="14px" $align="center">
      <S.LabelP htmlFor="color-input">Color</S.LabelP>
      <S.ColorPickerInput id="color-input" ref={refs.setReference} {...getReferenceProps()} $backgroundColor={color} />
      {isOpen && (
        <ColorPicker color={color} setColor={setColor} ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} />
      )}
    </S.ColorPickerInputLayout>
  );
}

export default ColorPickerInput;
