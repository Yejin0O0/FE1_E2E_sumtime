import { TableCell, TableHead, TableRow } from '@mui/material';

function CategoryTableHeader() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell align="right">Category Color</TableCell>
        <TableCell align="right">is Reported</TableCell>
        <TableCell align="right" sx={{ paddingRight: '35px' }}>
          수정
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default CategoryTableHeader;
