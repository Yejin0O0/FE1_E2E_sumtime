'use client';

import { useSession } from 'next-auth/react';
import { Alert, AlertTitle, Button, Snackbar, SnackbarCloseReason, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import * as S from './Account.styled';

function Account() {
  const { data: userData } = useSession();

  if (!userData) {
    return null;
  }

  const { email, name } = userData.user;
  const [isEditState, setIsEditState] = useState(false);
  const [open, setOpen] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    if (isEditState) {
      // 닉네임 수정 후 서버 연동 파트
      const newName = nameRef.current?.value || '';
      console.log('New name:', newName);
    }
    setIsEditState(!isEditState);
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
