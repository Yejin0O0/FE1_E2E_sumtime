'use client';

import { useSession } from 'next-auth/react';
import { Button, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import * as S from './Account.styled';

function Account() {
  const { data: userData } = useSession();

  if (!userData) {
    return null;
  }

  const { email, name } = userData.user;
  const [isEditState, setIsEditState] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    if (isEditState) {
      // 닉네임 수정 후 서버 연동 파트
      const newName = nameRef.current?.value || '';
      console.log('New name:', newName);
    }
    setIsEditState(!isEditState);
  };

  const changePassword = () => {
    // 비밀번호 변경 버튼 클릭 시 서버 연동 파트
    console.log('Change Password');
  };

  const deleteAccount = () => {
    // 탈퇴하기 버튼 클릭 시 서버 연동 파트
    console.log('Delete Account');
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
          <S.SectionTitle>Password Find</S.SectionTitle>
          <Button onClick={changePassword}>비밀번호 바꾸기 or 수정</Button>
        </S.ItemWrapper>
        <S.ItemWrapper>
          <S.SectionTitle>Delete Account</S.SectionTitle>
          <Button onClick={deleteAccount} color="error">
            탈퇴하기
          </Button>
        </S.ItemWrapper>
      </S.Section>
    </S.Container>
  );
}

export default Account;
