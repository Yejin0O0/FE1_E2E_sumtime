import React from 'react';
import { Box, Typography } from '@mui/material';
import EmptyTodoListIcon from '@/assets/images/emptyTodoIcon.png';
import * as TodoStyle from './TodoList.styled';
import * as CommonStyle from '../../common';
import OpenCreateTodoModalButton from './OpenCreateTodoModalButton';

const S = { ...TodoStyle, ...CommonStyle };

function EmptyTodoList() {
  return (
    <Box position="relative" width="100%" height="50%">
      <S.TodoComponentsSection>
        <Box paddingTop={2}>
          <S.Flex $direction="column" $align="center" $gap="32px">
            <img src={EmptyTodoListIcon.src} width="240px" height="240px" alt="" />
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
        <OpenCreateTodoModalButton />
      </S.TodoComponentsSection>
    </Box>
  );
}

export default EmptyTodoList;
