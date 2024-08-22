import { forwardRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import * as S from './ColorPicker.styled';
import ColorPalette from './ColorPalette';

interface ColorPickerProps extends React.ComponentPropsWithRef<'div'> {
  color: string;
  setColor: (newColor: string) => void;
  showPalette?: boolean;
}

function ColorPicker(props: ColorPickerProps, ref: React.Ref<HTMLDivElement>) {
  const { color, setColor, showPalette = false, ...otherProps } = props;

  return (
    <S.ColorPickerLayout {...otherProps} ref={ref}>
      <HexColorPicker color={color} onChange={setColor} />
      {showPalette && <ColorPalette color={color} setColor={setColor} />}
    </S.ColorPickerLayout>
  );
}

export default forwardRef(ColorPicker);
