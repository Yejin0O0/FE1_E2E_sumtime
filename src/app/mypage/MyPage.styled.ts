import { Flex } from '@/components/common';
import styled from '@emotion/styled';

export const Container = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: start;
  max-width: 1440px;
  background-color: #ffffff;
  margin: 0 auto;
  margin-top: 25px;
`;

export const ChildrenWrapper = styled(Flex)`
  width: 100%;
  padding: 20px;
`;
