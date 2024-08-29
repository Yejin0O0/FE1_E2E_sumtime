import styled from '@emotion/styled';

export const CategoryColorCircleLayout = styled.button<{ $backgroundColor?: string }>`
  background-color: ${(props) => props.$backgroundColor ?? 'transport'};
  width: 16px;
  height: 16px;
  border-radius: 16px;
  flex-shrink: 1;
  flex-grow: 0;
  border: none;
  cursor: pointer;
  z-index: 500;
`;
