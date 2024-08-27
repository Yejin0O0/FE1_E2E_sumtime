'use client';

import { PropsWithChildren } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

interface MaterialThemeProviderProps {
  fontFamily: string;
}

function MaterialThemeProvider({ children, fontFamily }: PropsWithChildren<MaterialThemeProviderProps>) {
  const theme = createTheme({
    typography: {
      fontFamily,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export { MaterialThemeProvider };
