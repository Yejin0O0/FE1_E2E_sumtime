'use client';

import { useSession } from 'next-auth/react';
import { Alert, AlertTitle, Button, Snackbar, SnackbarCloseReason, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { NICKNAME_REG_EXP } from '@/constants/regExp';
import * as S from './Account.styled';

function Account() {
  const { data: userData, update } = useSession();

  if (!userData) {
    return null;
  }
  const [fieldErrors, setFieldErrors] = useState<string | null>('');

  const handleNicknameValidation = (nickname: string) => {
    if (!nickname) {
      setFieldErrors('닉네임을 입력해주세요');
      return false;
    }
    if (!NICKNAME_REG_EXP.test(nickname)) {
      setFieldErrors('닉네임은 1~20자의 한글, 알파벳, 숫자만 사용 가능합니다');
      return false;
    }
    setFieldErrors(null);
    return true;
  };

  const { email, name } = userData.user;
  const [isEditState, setIsEditState] = useState(false);
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleEditClick = async () => {
    if (isEditState) {
      const newName = nameRef.current?.value || '';

      if (handleNicknameValidation(newName)) {
        try {
          await update({ ...userData, user: { ...userData.user, name: newName } });
          setIsEditState(!isEditState);
        } catch (error) {
          console.error('Update failed:', error);
        }
      }
    } else {
      setIsEditState(true);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <S.Container>
      <S.Title>Account</S.Title>
      <S.Section>
        <S.ItemWrapper>
          <S.SectionTitle>E-mail</S.SectionTitle>
          <TextField
            disabled
            id="standard-disabled"
            defaultValue={email}
            InputProps={{
              style: {
                width: 'fit-content',
                maxWidth: '100%',
              },
            }}
          />
        </S.ItemWrapper>
        <S.ItemWrapper>
          <S.SectionTitle>Nickname</S.SectionTitle>
          <S.InputWrapper>
            <TextField inputRef={nameRef} disabled={!isEditState} defaultValue={name} />
            <Button onClick={handleEditClick}>{isEditState ? '저장' : '수정'}</Button>
          </S.InputWrapper>
          <S.ValidationSpan $color="#d32f2f">{fieldErrors}</S.ValidationSpan>
        </S.ItemWrapper>

        <S.ItemWrapper>
          <S.SectionTitle>Delete Account</S.SectionTitle>
          <Button onClick={handleClick} color="warning">
            탈퇴하기
          </Button>
        </S.ItemWrapper>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="warning">
            <AlertTitle> 문의 부탁드립니다</AlertTitle>
            탈퇴를 원하신다면 아래 이메일로 문의 부탁드립니다.
            <br />
            ~~~@~~~.com
          </Alert>
        </Snackbar>
      </S.Section>
    </S.Container>
  );
}

export default Account;
