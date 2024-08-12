'use client';

import Header from '@/components/Header';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <>
      <Header />
      <p>{status}</p>
      {session && (
        <>
          <p>{session.user?.email}</p>
          <p>{session.user?.name}</p>
        </>
      )}
    </>
  );
}
