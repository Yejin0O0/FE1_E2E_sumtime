/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

interface FlexProps {
  $display?: string;
  $direction?: string;
  $justify?: string;
  $align?: string;
  $gap?: string | number;
  $wrap?: string;
}

const Flex = styled.div<FlexProps>`
  display: ${(props) => (props?.$display ? props.$display : 'flex')};
  flex-direction: ${(props) => (props?.$direction ? props.$direction : 'row')};
  justify-content: ${(props) => (props?.$justify ? props.$justify : 'start')};
  align-items: ${(props) => (props?.$align ? props.$align : 'start')};
  gap: ${(props) => (props?.$gap ? props.$gap : 0)};
  flex-wrap: ${(props) => (props?.$wrap ? props.$wrap : 'nowrap')};
`;

export { Flex };
export type { FlexProps };
