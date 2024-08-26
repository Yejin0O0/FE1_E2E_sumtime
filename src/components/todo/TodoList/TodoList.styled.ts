import styled from '@emotion/styled';
import { Container } from '@/components/common';

export const TodoComponentsSection = styled(Container)`
  height: 100%;
  overflow-y: auto; /* scrolling */
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px lightgrey;
`;

export const FloatingButton = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
`;
