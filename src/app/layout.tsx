import type { Metadata } from 'next';
import './globals.css';
import ReactQueryProviders from '@/utils/ReactQueryProviders';

export const metadata: Metadata = {
  title: 'sumday',
  description: 'kernel FE E2E project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <body>
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}
