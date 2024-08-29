import styled from '@emotion/styled';

export const ChartLegendLayout = styled.div`
  height: 200px;
  overflow-y: auto;
`;

export const LegendBox = styled.div`
  display: flex;
  gap: 12px;
  margin: 10px 0px;
`;

export const LegendColor = styled.div<{ $backgroundColor?: string }>`
  background-color: ${(props) => props.$backgroundColor ?? 'transport'};
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

export const LegendContentLayout = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
`;

export const TodoReportLayout = styled.div`
  margin: 16px auto;
  display: flex;
`;
