'use client';

import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '@/assets/images/sumtimeLogo.png';
import { useRouter } from 'next/navigation';
import { emailValidation } from '@/api/queryFn/userQueryFn';
import { EMAIL_REG_EXP, NICKNAME_REG_EXP } from '@/constants/regExp'; // 이메일 정규식 상수
import { useCreateUser } from '@/api/hooks/userHooks';
import * as S from './Signup.styled';

type FieldErrorsType = {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  nickname: string | null;
};

function SignupSection() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrorsType>({
    email: null,
    password: null,
    confirmPassword: null,
    nickname: null,
  });

  const [isEmailChecked, setIsEmailChecked] = useState<boolean | null>(null);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createUser } = useCreateUser();

  const router = useRouter();

  const handleEmailValidation = () => {
    const email = emailInputRef.current?.value || '';
    if (!email) {
      setFieldErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요' }));
      return false;
    }
    if (!EMAIL_REG_EXP.test(email)) {
      setFieldErrors((prev) => ({ ...prev, email: '유효한 이메일 주소를 입력해주세요' }));
      return false;
    }
    setFieldErrors((prev) => ({ ...prev, email: null }));
    return true;
  };

  const handleConfirmPasswordValidation = () => {
    const password = passwordInputRef.current?.value || '';
    const confirmPassword = confirmPasswordInputRef.current?.value || '';
    if (password !== confirmPassword) {
      setFieldErrors((prev) => ({ ...prev, confirmPassword: '비밀번호가 일치하지 않습니다' }));
      return false;
    }
    setFieldErrors((prev) => ({ ...prev, confirmPassword: null }));
    return true;
  };

  const handlePasswordValidation = () => {
    const password = passwordInputRef.current?.value || '';
    if (password.length < 8 || password.length > 15) {
      setFieldErrors((prev) => ({ ...prev, password: '비밀번호는 8자 이상 15자 이하여야 합니다' }));
      return false;
    }
    setFieldErrors((prev) => ({ ...prev, password: null }));
    handleConfirmPasswordValidation();

    return true;
  };

  const handleNicknameValidation = () => {
    const nickname = nicknameInputRef.current?.value || '';
    if (!nickname) {
      setFieldErrors((prev) => ({ ...prev, nickname: '닉네임을 입력해주세요' }));
      return false;
    }
    if (!NICKNAME_REG_EXP.test(nickname)) {
      setFieldErrors((prev) => ({ ...prev, nickname: '닉네임은 1~20자의 한글, 알파벳, 숫자만 사용 가능합니다' }));
      return false;
    }
    setFieldErrors((prev) => ({ ...prev, nickname: null }));
    return true;
  };

  const checkEmailDuplication = async () => {
    const email = emailInputRef.current?.value || '';
    if (handleEmailValidation()) {
      try {
        const isEmailAvailable = await emailValidation(email);
        if (isEmailAvailable) {
          setIsEmailChecked(true);
          return true;
        }
        setIsEmailChecked(false);
        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    return false;
  };

  const getEmailValidationMessage = () => {
    if (isEmailChecked === null) {
      return <S.SignupValidationSpan>이메일 중복 여부를 확인해주세요</S.SignupValidationSpan>;
    }
    if (isEmailChecked) {
      return <S.SignupValidationSpan>사용 가능한 이메일입니다.</S.SignupValidationSpan>;
    }
    return <S.SignupValidationSpan $color="red">이미 가입된 이메일입니다.</S.SignupValidationSpan>;
  };

  const handleDuplicateValidation = () => {
    if (isEmailChecked) {
      return true;
    }
    return false;
  };

  const registerUserHandler = () => {
    const isEmailValid = handleEmailValidation();
    const isPasswordValid = handlePasswordValidation();
    const isNicknameValid = handleNicknameValidation();
    const isConfirmPasswordValid = handleConfirmPasswordValidation();
    const isDuplicationValid = handleDuplicateValidation();

    if (isEmailValid && isPasswordValid && isNicknameValid && isConfirmPasswordValid && isDuplicationValid) {
      const email = emailInputRef.current?.value || '';
      const password = passwordInputRef.current?.value || '';
      const nickname = nicknameInputRef.current?.value || '';

      try {
        createUser(
          {
            email,
            password,
            nickname,
          },
          {
            onSuccess: () => {
              alert(`환영합니다, ${nickname}님!`);
              router.push('/login');
            },
            onError: () => {
              alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
            },
          },
        );
      } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleEmailChange = () => {
    setIsEmailChecked(null); // 이메일이 변경되면 중복 확인 상태를 초기화
  };

  return (
    <S.SignupSection>
      <S.SignupLogo src={logo.src} alt="logo" />

      <S.SignupInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="email"
          variant="standard"
          type="email"
          inputRef={emailInputRef}
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
          onBlur={handleEmailValidation}
          onChange={handleEmailChange}
        />
        <S.SignupValidationDiv $align="center" $justify="space-between">
          {getEmailValidationMessage()}

          <Button size="small" onClick={checkEmailDuplication}>
            중복검사
          </Button>
        </S.SignupValidationDiv>
      </S.SignupInputDiv>

      <S.SignupInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호"
          variant="standard"
          type="password"
          inputRef={passwordInputRef}
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
          onBlur={handlePasswordValidation}
        />
      </S.SignupInputDiv>

      <S.SignupInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="비밀번호 확인"
          variant="standard"
          type="password"
          inputRef={confirmPasswordInputRef}
          error={!!fieldErrors.confirmPassword}
          helperText={fieldErrors.confirmPassword}
          onBlur={handleConfirmPasswordValidation}
        />
      </S.SignupInputDiv>

      <S.SignupInputDiv>
        <TextField
          fullWidth
          id="outlined-error-helper-text"
          label="닉네임"
          variant="standard"
          type="text"
          inputRef={nicknameInputRef}
          error={!!fieldErrors.nickname}
          helperText={fieldErrors.nickname}
          onBlur={handleNicknameValidation}
        />
      </S.SignupInputDiv>

      <Button variant="outlined" onClick={registerUserHandler}>
        회원가입
      </Button>
    </S.SignupSection>
  );
}

export default SignupSection;
