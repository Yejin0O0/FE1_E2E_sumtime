// 'use client';

import styled from '@emotion/styled';
import { Flex } from './Flex.styled';

const BasicContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  max-width: 1440px;
  background-color: #ffffff;
  height: 100vh;
  margin: 0 auto; /* 가운데 정렬 */
`;

export { BasicContainer };
