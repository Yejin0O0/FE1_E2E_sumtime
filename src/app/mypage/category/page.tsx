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
          <Paper sx={{ width: '100%', height: '100%' }}>
            <TableContainer sx={{ height: 468, display: 'flex', flexDirection: 'column' }}>
              <Table sx={{ minWidth: 750, flex: '1 1 auto' }} stickyHeader>
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
