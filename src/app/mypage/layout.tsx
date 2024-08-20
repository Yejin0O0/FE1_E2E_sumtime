'use client';

import Header from '@/components/Header';
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

import { signOut } from 'next-auth/react';
import * as S from '@/app/mypage/MyPage.styled';
import { usePathname } from 'next/navigation';

interface MyPageLayoutProps {
  children: ReactNode;
}

const MENU_ITEM = [
  {
    href: '/mypage/account',
    icon: <AccountCircleOutlinedIcon sx={{ color: 'black' }} />,
    text: '계정',
  },
  { href: '/mypage/category', icon: <CategoryOutlinedIcon sx={{ color: 'black' }} />, text: '카테고리' },
  { href: '/mypage/faq', icon: <LiveHelpOutlinedIcon sx={{ color: 'black' }} />, text: 'FAQ' },
];

function MyPageLayout({ children }: MyPageLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <Header />
      <S.Container>
        <Box display="flex" flexDirection="column" gap="30px" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {MENU_ITEM.map((item) => {
            const isActive = pathname === item.href;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton href={item.href} sx={{ bgcolor: isActive ? 'action.hover' : 'inherit' }}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem disablePadding>
            <ListItemButton onClick={() => signOut({ callbackUrl: '/landing' })}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon sx={{ color: 'black' }} />
              </ListItemIcon>
              <ListItemText primary="로그아웃" />
            </ListItemButton>
          </ListItem>
        </Box>
        <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
      </S.Container>
    </>
  );
}

export default MyPageLayout;
