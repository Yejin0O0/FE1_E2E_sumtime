'use client';

import { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import logo from '@/assets/images/sumtimeLogo.png';
import { useRouter } from 'next/navigation';
import { checkEmailDuplicated } from '@/api/queryFn/userQueryFn';
import { NICKNAME_REG_EXP } from '@/constants/regExp';
import { useCreateUser } from '@/api/hooks/userHooks';
import { useEmailValidation } from '@/hooks/auth/useEmailValidation';
import { usePasswordValidation } from '@/hooks/auth/usePasswordValidation';
import Link from 'next/link';
import { Spinner } from '@/components/common';
import * as S from './Signup.styled';

type EmailCheckStatus = 'inProgress' | 'success' | 'fail';

type FieldErrorsType = {
  confirmPassword: string | null;
  nickname: string | null;
};

function SignupSection() {
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrorsType>({
    confirmPassword: null,
    nickname: null,
  });

  const { emailErrorMessage, validateEmail } = useEmailValidation();
  const { passwordErrorMessage, validatePassword } = usePasswordValidation();

  const [isEmailChecked, setIsEmailChecked] = useState<EmailCheckStatus>('inProgress');

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nicknameInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createUser } = useCreateUser();

  const router = useRouter();

  const handleEmailValidation = () => {
    const email = emailInputRef.current?.value || '';
    return validateEmail(email);
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
    return validatePassword(password);
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
        const isEmailAvailable = await checkEmailDuplicated(email);
        if (isEmailAvailable) {
          setIsEmailChecked('success');
          return true;
        }
        setIsEmailChecked('fail');
        return false;
      } catch (error) {
        console.error(error);
        setIsEmailChecked('fail');
        return false;
      }
    }
    return false;
  };

  const getEmailValidationMessage = () => {
    if (isEmailChecked === 'inProgress') {
      return <S.SignupValidationSpan $color="#d32f2f">이메일 중복 여부를 확인해주세요</S.SignupValidationSpan>;
    }
    if (isEmailChecked === 'success') {
      return <S.SignupValidationSpan $color="#1976d2">사용 가능한 이메일입니다.</S.SignupValidationSpan>;
    }
    return <S.SignupValidationSpan $color="#d32f2f">이미 가입된 이메일입니다.</S.SignupValidationSpan>;
  };

  const handleDuplicateValidation = () => {
    return isEmailChecked === 'success';
  };

  const registerUserHandler = () => {
    const isEmailValid = handleEmailValidation();
    const isPasswordValid = handlePasswordValidation();
    const isNicknameValid = handleNicknameValidation();
    const isConfirmPasswordValid = handleConfirmPasswordValidation();
    const isDuplicationValid = handleDuplicateValidation();

    if (isEmailValid && isPasswordValid && isNicknameValid && isConfirmPasswordValid && isDuplicationValid) {
      setLoading(true);
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
              setLoading(false);
            },
            onSettled: () => {
              setLoading(false);
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
    setIsEmailChecked('inProgress'); // 이메일이 변경되면 중복 확인 상태를 초기화
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <S.SignupSection>
      <Link href="/landing">
        <S.SignupLogo src={logo.src} alt="logo" />
      </Link>

      <>
        <S.SignupInputDiv>
          <TextField
            fullWidth
            id="outlined-error-helper-text"
            label="email"
            variant="standard"
            type="email"
            inputRef={emailInputRef}
            error={!!emailErrorMessage}
            helperText={emailErrorMessage}
            onBlur={handleEmailValidation}
            onChange={handleEmailChange}
            onKeyDown={handleKeyDown}
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
            error={!!passwordErrorMessage}
            helperText={passwordErrorMessage}
            onBlur={handlePasswordValidation}
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
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
            onKeyDown={handleKeyDown}
          />
        </S.SignupInputDiv>

        <Button variant="outlined" onClick={registerUserHandler}>
          회원가입
        </Button>
      </>
    </S.SignupSection>
  );
}

export default SignupSection;
