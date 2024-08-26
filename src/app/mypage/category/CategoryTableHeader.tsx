import { TableCell, TableHead, TableRow } from '@mui/material';

function CategoryTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>제목</TableCell>
        <TableCell align="right">색상</TableCell>
        <TableCell align="right">차트</TableCell>
        <TableCell align="right" sx={{ paddingRight: '35px' }}>
          수정
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default CategoryTableHeader;
