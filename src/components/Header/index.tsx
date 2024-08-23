'use client';

import * as S from '@/components/Header/Header.styled';
import logo from '@/assets/images/sumtimeRowLogo.png';
import { useSession } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import HeaderList from './HeaderList';

function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <S.Container>
      <S.Logo src={logo.src} alt="logo" onClick={() => router.push('/')} />
      <S.ProfileDiv $align="center">
        <S.UserName>{session?.user.name}</S.UserName>
        <S.UserP>님의 하루를 더해보세요!</S.UserP>
        <S.MenuButton
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <S.IconWrapper>
            <AccountCircleIcon fontSize="large" />
          </S.IconWrapper>
        </S.MenuButton>
        <HeaderList anchorEl={anchorEl} open={open} onClose={handleClose} />
      </S.ProfileDiv>
    </S.Container>
  );
}

export default Header;
