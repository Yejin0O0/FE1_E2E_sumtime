import { useState } from 'react';
import { PASSWORD_REG_EXP } from '@/constants/regExp';

export const usePasswordValidation = () => {
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordErrorMessage('비밀번호를 입력해주세요');
      return false;
    }
    if (password.length < 8 || password.length > 15) {
      setPasswordErrorMessage('비밀번호는 8자 이상 15자 이하여야 합니다');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordErrorMessage('비밀번호에 최소 하나의 대문자가 포함되어야 합니다');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordErrorMessage('비밀번호에 최소 하나의 소문자가 포함되어야 합니다');
      return false;
    }
    if (!/\d/.test(password)) {
      setPasswordErrorMessage('비밀번호에 최소 하나의 숫자가 포함되어야 합니다');
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordErrorMessage('! @ % ^ & * 중 최소 하나의 특수 문자가 포함되어야 합니다');
      return false;
    }
    if (!PASSWORD_REG_EXP.test(password)) {
      setPasswordErrorMessage('비밀번호가 규칙에 맞지 않습니다');
      return false;
    }

    setPasswordErrorMessage(null);
    return true;
  };

  return { passwordErrorMessage, validatePassword };
};
