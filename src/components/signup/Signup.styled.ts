import styled from '@emotion/styled';
import { Flex } from '../common';

interface ValidationSpanProps {
  $color?: string;
  theme?: {
    color: {
      fontColor: string;
      backgroundColor: string;
      red: string;
    };
    fontSize: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
      xxxxl: string;
    };
  };
}

export const SignupSection = styled.div`
  width: 450px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const SignupInputDiv = styled.div`
  width: 300px;
`;

export const SignupValidationDiv = styled(Flex)`
  width: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SignupValidationSpan = styled.span<ValidationSpanProps>`
  font-size: 14px;
  color: ${(props) => (props?.$color ? props.$color : props?.theme?.color?.fontColor)};
`;

export const SignupTitle = styled.p`
  width: 350px;
  font-size: 15px;
`;

export const SignupLogo = styled.img`
  width: 200px;
  cursor: pointer;
`;
