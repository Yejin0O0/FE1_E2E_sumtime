import { useState } from 'react';
import { EMAIL_REG_EXP } from '@/constants/regExp';

export const useEmailValidation = () => {
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailErrorMessage('이메일을 입력해주세요');
      return false;
    }
    if (!EMAIL_REG_EXP.test(email)) {
      setEmailErrorMessage('유효한 이메일 주소를 입력해주세요');
      return false;
    }
    setEmailErrorMessage(null);
    return true;
  };

  return { emailErrorMessage, validateEmail };
};
