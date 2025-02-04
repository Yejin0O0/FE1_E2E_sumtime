import React from 'react';
import { Box, Typography } from '@mui/material';
import EmptyTodoListIcon from '@/assets/images/emptyTodoIcon.png';
import * as TodoStyle from './TodoList.styled';
import * as CommonStyle from '../../common';

const S = { ...TodoStyle, ...CommonStyle };

function EmptyTodoList() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <S.Flex $direction="column" $align="center" $justify="center" $gap="10px">
        <img
          alt="todo list is empty"
          srcSet={`${EmptyTodoListIcon.src} 512w`}
          sizes="(max-width: 1280px) 80px, (max-width: 1600px) 80px, 200px"
        />
        <S.Flex $direction="column" $align="center">
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '500' }}>
            기록된 정보가 없습니다.
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '500' }}>
            당신의 하루를 기록해보세요!
          </Typography>
        </S.Flex>
      </S.Flex>
    </Box>
  );
}

export default EmptyTodoList;
