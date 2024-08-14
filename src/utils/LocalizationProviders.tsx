'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ko } from 'date-fns/locale/ko';

export default function LocalizationProviders({ children }: React.PropsWithChildren) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      {children}
    </LocalizationProvider>
  );
}
