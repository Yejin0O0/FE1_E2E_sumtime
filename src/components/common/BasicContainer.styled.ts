// 'use client';

import styled from '@emotion/styled';
import { Flex } from './Flex.styled';

const BasicContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 960px;
  background-color: #ffffff;
  height: calc(100vh - 65px);
  margin: 0 auto; /* 가운데 정렬 */
`;

export { BasicContainer };
