'use client';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '@/assets/images/sumtimeLogo.png';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/app/apiTest/calls/userCalls';
import * as S from './Signup.styled';

function SignupSection() {
  // const [validation, setValidation] = useState(true);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const registerUserHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailInputRef.current?.value || '';
    const password = passwordInputRef.current?.value || '';
    const nickname = nicknameInputRef.current?.value || '';

    const userInfo = await createUser(email, password, nickname);

    if (userInfo) {
      alert(`환영합니다, ${nickname}님!`);
      router.push('/login');
    }
  };

  return (
    <S.SignupSection>
      <S.SignupLogo src={logo.src} alt="logo" />

      <S.SignupInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="email"
          // helperText={validation ? '' : '올바른 형식의 이메일을 입력해주세요'}
          variant="standard"
          type="email"
          inputRef={emailInputRef}
        />
      </S.SignupInputDiv>
      <S.SignupInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호"
          // helperText={validation ? '' : '올바른 형식의 비밀번호를 입력해주세요'}
          variant="standard"
          type="password"
          inputRef={passwordInputRef}
        />
      </S.SignupInputDiv>

      <S.SignupInputDiv>
        <TextField
          // error={!validation}
          fullWidth
          id="outlined-error-helper-text"
          label="닉네임"
          // helperText={validation ? '' : '0자 이내만 입력 가능합니다'}
          variant="standard"
          type="text"
          inputRef={nicknameInputRef}
        />
      </S.SignupInputDiv>

      <Button variant="outlined" onClick={(e) => registerUserHandler(e)}>
        회원가입
      </Button>
    </S.SignupSection>
  );
}

export default SignupSection;
