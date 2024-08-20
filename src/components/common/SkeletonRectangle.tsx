/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Container } from './Container.styled';

// Pulse 애니메이션 정의
const pulse = keyframes`
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: -135% 0%;
  }
`;

// Pulse 애니메이션을 적용한 Skeleton 컴포넌트
export const SkeletonRectangle = styled(Container)`
  margin: 10px;
  height: 3rem;
  background: linear-gradient(-90deg, #efefef 0%, #fcfcfc 50%, #efefef 100%);
  background-size: 400% 400%;
  animation: ${pulse} 1.2s ease-in-out infinite;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;
