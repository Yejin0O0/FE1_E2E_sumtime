import styled from '@emotion/styled';
import { Flex, Container } from '../common';

export const TodoSection = styled(Flex)`
  flex-direction: column;
  width: 50%;
  height: 100%;
  position: relative;
  padding: 20px;
  border-left: 2px solid whitesmoke;
`;

export const ATodoComponentContainer = styled(Container)`
  margin: 10px;
  height: auto;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px lightgrey;
`;

export const TodoContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  min-height: 30px;
  max-height: fit-content;
  input {
    flex-grow: 1;
    background-color: transparent;
  }

  button {
    width: 25px;
    height: 100%;
    font-size: small;
    z-index: 2;
  }

  button + button {
    margin-left: 10px; // 버튼 사이의 간격을 위한 마진
  }
`;

// mui TodoModal에만 쓰이는 Style
export const TodoModalStyle = {
  outline: 'none',
  position: 'absolute' as const,
  width: 400,
  top: 'calc(50% - (530px/2))',
  left: 'calc(50% - (400px/2))',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 3.7,
};
