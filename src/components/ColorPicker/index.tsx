import { forwardRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import * as S from './ColorPicker.styled';

interface ColorPickerProps extends React.ComponentPropsWithRef<'div'> {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

function ColorPicker(props: ColorPickerProps, ref: React.Ref<HTMLDivElement>) {
  const { color, setColor, ...otherProps } = props;

  return (
    <S.ColorPickerLayout {...otherProps} ref={ref}>
      <HexColorPicker color={color} onChange={setColor} />
    </S.ColorPickerLayout>
  );
}

export default forwardRef(ColorPicker);
