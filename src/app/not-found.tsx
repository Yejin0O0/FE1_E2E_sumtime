'use client';

import logo from '@/assets/images/sumtimeLogo.png';
import { Button } from '@mui/material';
import Link from 'next/link';
import * as S from './(auth)/Auth.styled';

function PageNotFound() {
  return (
    <S.logoCenterPage>
      <S.logoCenterSection>
        <Link href="/">
          <S.logoCenterLogo src={logo.src} alt="logo" />
        </Link>
        <S.NotFoundExplainDiv>
          <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다. </p>
          <Link href="/">
            <Button variant="outlined" style={{ textTransform: 'none' }}>
              SumTime 홈으로 이동하기
            </Button>
          </Link>
        </S.NotFoundExplainDiv>
      </S.logoCenterSection>
    </S.logoCenterPage>
  );
}

export default PageNotFound;
