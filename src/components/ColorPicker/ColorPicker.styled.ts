import styled from '@emotion/styled';
import { Flex } from '../common';

interface ColorPickerLayoutProps {
  $backgroundColor?: string;
}

const ColorPickerLayout = styled.div<ColorPickerLayoutProps>`
  border-radius: 4px;
  padding: 8px;
  background-color: ${(props) => props?.$backgroundColor ?? 'white'};
  z-index: 999;
`;

const ColorPaletteLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  margin: 8px 0;
  padding: 0 16px;
`;

const SaveBarLayout = styled(Flex)`
  margin: 8px;
  font-size: 14px;
`;

const SaveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
interface PaletteColorButtonProps {
  $backgroundColor?: string;
}

const PaletteColorButton = styled.button<PaletteColorButtonProps>`
  border: 0;
  border-radius: 50%;
  width: 24px;
  background-color: ${(props) => props.$backgroundColor};
  aspect-ratio: 1 / 1;
  cursor: pointer;
`;

export { ColorPickerLayout, ColorPaletteLayout, PaletteColorButton, SaveButton, SaveBarLayout };
