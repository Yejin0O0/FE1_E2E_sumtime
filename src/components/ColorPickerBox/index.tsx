import * as S from './ColorPickerBox.styled';
import ColorPickerInput from './ColorPickerInput';

interface ColorPickerBoxProps {
  margin?: string;
  color: string;
  setColor: (newColor: string) => void;
  labelName?: string;
}

function ColorPickerBox({ margin, labelName, color, setColor }: ColorPickerBoxProps) {
  return (
    <S.ColorPickerBoxLayout $margin={margin} $gap="14px" $align="center">
      <S.LabelP htmlFor="color-input">{labelName || `Color`}</S.LabelP>
      <ColorPickerInput color={color} setColor={setColor} />
    </S.ColorPickerBoxLayout>
  );
}

export default ColorPickerBox;
