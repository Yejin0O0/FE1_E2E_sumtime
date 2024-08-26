import React from 'react';
import styled from '@emotion/styled';
import { ANIMATION_ROTATE } from '@/components/todo/Todo.styled';

const Card = styled.div`
  z-index: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background: #ffffff;
  border-radius: 8px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% - 800px);
    left: calc(50% - 50px);
    width: 400px;
    height: 1200px;
    background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(221, 93, 93, 0.75) 50%, rgba(255, 255, 255, 0) 100%);
    transform-origin: center center;
    transform: translate(-50%, -50%);
    animation: ${ANIMATION_ROTATE} 2.3s infinite linear;
  }
`;

function GlowingBorder({ children }: { children: React.ReactNode }) {
  return <Card>{children}</Card>;
}

export default GlowingBorder;
