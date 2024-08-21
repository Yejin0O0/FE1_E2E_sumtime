'use client';

import * as S from '@/components/Header/Header.styled';
import logo from '@/assets/images/sumtimeRowLogo.png';
import { useSession } from 'next-auth/react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <S.Container>
      <S.Logo src={logo.src} alt="logo" onClick={() => router.push('/')} />
      <S.ProfileDiv $align="center">
        <S.UserName>{session?.user.name}</S.UserName>
        <S.UserP>님의 하루를 더해보세요!</S.UserP>
        <Link href="/mypage/account">
          <S.IconWrapper>
            <SettingsOutlinedIcon />
          </S.IconWrapper>
        </Link>
      </S.ProfileDiv>
    </S.Container>
  );
}

export default Header;
