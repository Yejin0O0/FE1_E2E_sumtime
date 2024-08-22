import type { Metadata } from 'next';
import './globals.css';
import ReactQueryProviders from '@/utils/ReactQueryProviders';
import AuthProvider from '@/components/common/AuthProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LocalizationProviders from '@/utils/LocalizationProviders';
import StoreProvider from '@/app/StoreProvider';

export const metadata: Metadata = {
  title: 'sumday',
  description: 'kernel FE E2E project',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="kr">
      <body>
        <AuthProvider session={session}>
          <LocalizationProviders>
            <ReactQueryProviders>
              <StoreProvider>{children}</StoreProvider>
            </ReactQueryProviders>
          </LocalizationProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
