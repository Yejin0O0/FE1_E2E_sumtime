'use client';

import * as S from '@/components/Header/Header.styled';
import logo from '@/assets/images/sumtimeRowLogo.png';
import { useSession, signOut } from 'next-auth/react';
import signOutIcon from '@/assets/icons/signOut.svg';
import { useRouter } from 'next/navigation';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <S.Container>
      <S.Logo src={logo.src} alt="logo" onClick={() => router.push('/')} />

      <S.ProfileDiv $align="center">
        <S.UserName>{session?.user.name}</S.UserName>
        <S.UserP>님의 하루를 더해보세요!</S.UserP>
        <S.SignOutButton onClick={() => signOut({ callbackUrl: '/' })}>
          <img src={signOutIcon.src} alt="로그아웃" />
        </S.SignOutButton>
      </S.ProfileDiv>
    </S.Container>
  );
}

export default Header;
