import type { Metadata } from 'next';
import ReactQueryProviders from '@/utils/ReactQueryProviders';
import AuthProvider from '@/components/common/AuthProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LocalizationProviders from '@/utils/LocalizationProviders';
import StoreProvider from '@/app/StoreProvider';
import { Noto_Sans } from 'next/font/google';
import { GlobalStyle, MaterialThemeProvider } from '@/themes';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'block',
});

export const metadata: Metadata = {
  title: 'sumtime',
  description: 'kernel FE E2E project',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="kr" className={notoSans.className}>
      <body>
        <AuthProvider session={session}>
          <LocalizationProviders>
            <ReactQueryProviders>
              <StoreProvider>
                <GlobalStyle />
                <MaterialThemeProvider fontFamily={notoSans.style.fontFamily}>{children}</MaterialThemeProvider>
              </StoreProvider>
            </ReactQueryProviders>
          </LocalizationProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
