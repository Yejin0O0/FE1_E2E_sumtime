'use client';

import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '@/assets/images/sumtimeLogo.png';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EMAIL_REG_EXP } from '@/constants/regExp';
import * as S from './Login.styled';

function LoginSection() {
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleEmailValidation = () => {
    if (!emailInputRef.current?.value || !EMAIL_REG_EXP.test(emailInputRef.current.value)) {
      setEmailError('유효한 이메일 주소를 입력해주세요');
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordValidation = () => {
    if (!passwordInputRef.current?.value) {
      setPasswordError('비밀번호를 입력해주세요');
    } else {
      setPasswordError(null);
    }
  };

  const handleSignIn = async () => {
    handleEmailValidation();
    handlePasswordValidation();

    if (!emailError && !passwordError) {
      try {
        const signInData = await signIn('credentials', {
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value,
          redirect: false,
        });
        if (signInData?.status === 200) {
          router.push('/todo');
        } else alert('일치하는 이메일, 비밀번호가 없습니다');
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('유효한 이메일 주소와 비밀번호를 입력해주세요');
    }
  };

  return (
    <S.LoginSection>
      <S.LoginLogo src={logo.src} alt="logo" />

      <S.LoginInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="email"
          variant="standard"
          type="email"
          inputRef={emailInputRef}
          onBlur={handleEmailValidation}
          error={!!emailError}
          helperText={emailError}
        />
      </S.LoginInputDiv>
      <S.LoginInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호"
          variant="standard"
          type="password"
          inputRef={passwordInputRef}
          onBlur={handlePasswordValidation}
          error={!!passwordError}
          helperText={passwordError}
        />
      </S.LoginInputDiv>

      <Button variant="outlined" onClick={() => handleSignIn()}>
        로그인
      </Button>

      <Button variant="outlined" onClick={() => signIn('google', { redirect: true, callbackUrl: '/todo' })} type="button">
        구글 로그인
      </Button>
    </S.LoginSection>
  );
}

export default LoginSection;
