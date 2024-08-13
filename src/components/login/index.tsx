'use client';

import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '@/assets/images/sumtimeLogo.png';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEmailValidation } from '@/hooks/auth/useEmailValidation';
import { usePasswordValidation } from '@/hooks/auth/usePasswordValidation';
import * as S from './Login.styled';

function LoginSection() {
  const router = useRouter();

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
    if (isEmailValid && isPasswordValid) {
      try {
        const signInData = await signIn('credentials', {
          email: emailInputRef.current?.value,
          password: passwordInputRef.current?.value,
          redirect: false,
        });
        if (signInData?.status === 200) {
          router.push('/');
        } else alert('일치하는 이메일, 비밀번호가 없습니다');
      } catch (error) {
        console.log(error);
      }
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
          error={!!emailErrorMessage}
          helperText={emailErrorMessage}
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
          error={!!passwordErrorMessage}
          helperText={passwordErrorMessage}
        />
      </S.LoginInputDiv>

      <Button variant="outlined" onClick={() => handleSignIn()}>
        로그인
      </Button>
    </S.LoginSection>
  );
}

export default LoginSection;
