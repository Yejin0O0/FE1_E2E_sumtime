import styled from '@emotion/styled';
import { Flex, Container } from '../common';

export const TodoSection = styled(Flex)`
  flex-direction: column;
  justify-content: start;
  width: 50%;
  height: 100%;
  background-color: whitesmoke;
  border-radius: 5px;
  position: relative;
  padding: 20px;
`;

export const TodoComponentsSection = styled(Container)`
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: #e5e5e5;
  width: 100%;
  min-height: 50%;
  max-height: 50%;
  overflow-y: auto; /* scrolling */
  border-radius: 5px;
  border: 1px solid red;

  padding: 10px;
  border-style: none;
  position: relative;
  box-sizing: border-box;
`;

export const ATodoComponentContainer = styled(Container)`
  margin: 10px;
  height: auto;
  background-color: whitesmoke;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  box-sizing: border-box;
`;

export const TodoContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  min-height: 30px;
  max-height: fit-content input {
    flex-grow: 1;
    background-color: none;
  }

  button {
    width: 20px;
    height: 100%;
    font-size: small;
  }

  button + button {
    margin-left: 10px; // 버튼 사이의 간격을 위한 마진
  }
`;

export const FloatingButton = styled.div`
  position: absolute;
  top: 400px;
  right: 50px;
  z-index: 1500;
`;

// mui TodoModal에만 쓰이는 Style
export const TodoModalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
