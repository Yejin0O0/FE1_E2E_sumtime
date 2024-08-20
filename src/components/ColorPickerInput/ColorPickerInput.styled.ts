import styled from '@emotion/styled';
import { Flex, FlexProps } from '../common';

interface ColorPickerInputLayoutProps extends FlexProps {
  $width?: string;
}

const ColorPickerInputLayout = styled(Flex)<ColorPickerInputLayoutProps>`
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  width: 100%;
  height: 56px;
  padding: 14px;
  line-height: 1.4375em;
  margin: 20px 0px 10px 0px;
  position: relative;
`;

const LabelP = styled.label`
  background-color: white;
  color: rgba(0, 0, 0, 0.4);
  position: absolute;
  font-size: 1rem;
  top: -0.5em;
  z-index: 2;
`;

const ColorPickerInput = styled.input<{
  $backgroundColor: string;
}>`
  width: 100%;
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

export { ColorPickerInputLayout, LabelP, ColorPickerInput };
