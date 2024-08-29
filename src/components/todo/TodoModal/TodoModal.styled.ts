import styled from '@emotion/styled';

export const SelectItemLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const SelectItemDescriptionLayout = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface AutocompleteCloseLayoutProps {
  $isOpen: boolean;
}

export const AutocompleteCloseLayout = styled.button<AutocompleteCloseLayoutProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: ${(props) => (props.$isOpen ? '1' : '-1')};
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
`;
