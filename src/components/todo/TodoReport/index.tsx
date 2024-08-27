import React from 'react';
import { PieChart } from '@mui/x-charts';
import { convertTodosForTimetable as convertDateStringToDate } from '@/utils/timetable/convertTodosForTimetable';
import { Grid } from '@mui/material';
import useGetCategoryList from '@/api/hooks/categoryHooks/useGetCategoryList';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import * as S from './TodoReport.styled';
import { formatToChartData, formatMinutesToTime } from './util';

function TodoReport() {
  const categoryList = useGetCategoryList();
  const { todoListData } = useSelector((state: RootState) => state.todoData);
  const todoList = convertDateStringToDate(todoListData);
  const chartDataList = formatToChartData(todoList, categoryList);

  return (
    <Grid
      container
      spacing={1}
      borderRadius={2}
      boxShadow="1px 1px 10px lightgray"
      height="300px"
      marginTop={2}
      width="100%"
      sx={{ margin: '16px auto', display: 'flex' }}
      padding={1}
    >
      <Grid item xs={8}>
        <PieChart
          height={280}
          series={[
            {
              data: chartDataList,
              valueFormatter: ({ value }) => formatMinutesToTime(value),
              innerRadius: 30,
              cornerRadius: 2,
              paddingAngle: 1,
              cx: '60%',
            },
          ]}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </Grid>

      <Grid item xs={4}>
        <S.ChartLegendLayout>
          {chartDataList.map((chartData) => {
            const label = typeof chartData.label === 'string' ? chartData.label : '';

            return (
              <S.LegendBox key={chartData.id}>
                <S.LegendColor $backgroundColor={chartData.color} />
                <S.LegendContentLayout>{label}</S.LegendContentLayout>
              </S.LegendBox>
            );
          })}
        </S.ChartLegendLayout>
      </Grid>
    </Grid>
  );
}

export default TodoReport;
