import styled from '@emotion/styled';
import { Flex, FlexProps } from '../common';

interface ColorPickerInputLayoutProps extends FlexProps {
  $width?: string;
  $height?: string;
  $margin?: string;
  $boxSizing?: string;
  $alignItems?: string;
  $gap?: string;
}

const ColorPickerBoxLayout = styled(Flex)<ColorPickerInputLayoutProps>`
  box-sizing: ${(props) => props.$boxSizing || 'border-box'};
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  width: 100%;
  height: ${(props) => props.$width || '56px'};
  padding: 14px;
  line-height: 1.4375em;
  margin: ${(props) => props.$margin || '20px 0px 10px 0px'};
  position: relative;
  align-items: ${(props) => props.$alignItems || 'none'};
  gap: ${(props) => props.$gap || ''};
`;

const LabelP = styled.label`
  background-color: white;
  color: rgba(0, 0, 0, 0.4);
  position: absolute;
  font-size: 0.7rem;
  top: -0.5em;
  z-index: 2;
`;

const ColorPickerInputLayout = styled.input<{
  $backgroundColor: string;
  $width?: string;
}>`
  width: ${(props) => props.$width || '100%'};
  height: 28px;
  border-radius: 8px;
  border: 3px solid #fff;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-color: ${(props) => props.$backgroundColor};
  padding: 4px;
  box-sizing: border-box;
`;

// ValidationSpanProps 형식 가져옴. 추후 공통 컴포넌트로 빼는 작업 필요
interface ColorPickerEditedSpanProps {
  $color?: string;
  theme?: {
    color: {
      fontColor: string;
      backgroundColor: string;
      red: string;
    };
    fontSize: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
      xxxxl: string;
    };
  };
}

const ColorPickerEditedSpan = styled.span<ColorPickerEditedSpanProps>`
  font-size: 12px;

  color: ${(props) => (props?.$color ? props.$color : props?.theme?.color?.fontColor)};
`;

export { ColorPickerBoxLayout, LabelP, ColorPickerInputLayout, ColorPickerEditedSpan };
