import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SectionTitle = styled.div`
  font-size: 18px;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ColorState = styled.div<{ hexColor: string | null }>`
  margin-left: auto;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ hexColor }) => hexColor};
`;

export const ColorCode = styled.div`
  width: 70px;
`;
