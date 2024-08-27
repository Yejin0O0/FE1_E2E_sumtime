'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Button, TextField } from '@mui/material';
import logo from '@/assets/images/sumtimeLogo.png';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEmailValidation } from '@/hooks/auth/useEmailValidation';
import { usePasswordValidation } from '@/hooks/auth/usePasswordValidation';
import { Spinner } from '@/components/common';
import * as S from './Login.styled';

function LoginSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { emailErrorMessage, validateEmail } = useEmailValidation();
  const { passwordErrorMessage, validatePassword } = usePasswordValidation();

  const handleEmailValidation = () => {
    const email = emailInputRef.current?.value || '';
    return validateEmail(email);
  };

  const handlePasswordValidation = () => {
    const password = passwordInputRef.current?.value || '';
    return validatePassword(password);
  };

  const handleSignIn = async () => {
    const isEmailValid = handleEmailValidation();
    const isPasswordValid = handlePasswordValidation();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    const signInData = await signIn('credentials', {
      email: emailInputRef.current?.value,
      password: passwordInputRef.current?.value,
      redirect: false,
    });

    if (signInData?.status === 200) {
      router.push('/');
    } else {
      setIsLoading(false);
      alert('일치하는 이메일, 비밀번호가 없습니다');
    }
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <S.LoginSection>
      <Link href="/landing">
        <S.LoginLogo src={logo.src} alt="logo" />
      </Link>

      <S.LoginInputDiv>
        <TextField
          fullWidth
          label="email"
          variant="standard"
          type="email"
          inputRef={emailInputRef}
          onBlur={handleEmailValidation}
          error={!!emailErrorMessage}
          helperText={emailErrorMessage}
        />
      </S.LoginInputDiv>
      <S.LoginInputDiv>
        <TextField
          fullWidth
          label="비밀번호"
          variant="standard"
          type="password"
          inputRef={passwordInputRef}
          onBlur={handlePasswordValidation}
          error={!!passwordErrorMessage}
          helperText={passwordErrorMessage}
        />
      </S.LoginInputDiv>

      <Button variant="outlined" onClick={handleSignIn}>
        로그인
      </Button>
    </S.LoginSection>
  );
}

export default LoginSection;
