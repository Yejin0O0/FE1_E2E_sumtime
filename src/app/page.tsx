'use client';

import Link from 'next/link';
import Button from '@mui/material/Button';
import logo from '@/assets/images/sumtimeLogo.png';
import { Flex } from '@/components/common';
import * as S from './HomePage.styled';

export default function Home() {
  return (
    <S.HomePage>
      <Flex $direction="column" $gap="30px" $justify="center" $align="center">
        <S.HomeLogo src={logo.src} alt="logo" />
        <div>
          <p>당신의 하루를 더하세요</p>
        </div>
        <Flex>
          <Link href="/login">
            <Button variant="text">로그인</Button>
          </Link>
          <Link href="/signup">
            <Button variant="text">회원가입하기</Button>
          </Link>
        </Flex>
      </Flex>
    </S.HomePage>
  );
}
