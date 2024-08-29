'use client';

import SignupSection from '@/components/signup';
import * as S from '../Auth.styled';

export default function Signup() {
  return (
    <S.logoCenterPage>
      <SignupSection />
    </S.logoCenterPage>
  );
}
