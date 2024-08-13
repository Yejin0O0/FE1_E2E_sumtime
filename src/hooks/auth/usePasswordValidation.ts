import { useState } from 'react';

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
    setPasswordErrorMessage(null);
    return true;
  };

  return { passwordErrorMessage, validatePassword };
};
