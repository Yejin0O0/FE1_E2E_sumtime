'use client';

import Paper from '@mui/material/Paper';
import { Table, TableContainer } from '@mui/material';

import * as S from './Category.styled';
import CategoryTableHeader from './CategoryTableHeader';
import CategoryTableBody from './CategoryTableBody';
import CategoryTableFooter from './CategoryTableFooter';

function Category() {
  return (
    <S.Container>
      <S.Title>Category</S.Title>
      <S.Section>
        <S.ItemWrapper>
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table sx={{ minWidth: 750 }} stickyHeader>
                <CategoryTableHeader />
                <CategoryTableBody />
                <CategoryTableFooter />
              </Table>
            </TableContainer>
          </Paper>
        </S.ItemWrapper>
      </S.Section>
    </S.Container>
  );
}

export default Category;
