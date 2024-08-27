import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Spinner() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
}

export { Spinner };
