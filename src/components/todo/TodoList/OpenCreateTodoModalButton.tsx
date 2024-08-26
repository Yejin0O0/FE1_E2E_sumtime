import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { setTodoId } from '@/lib/todos/todoDataSlice';
import { openModal, openModalByFAB, setModalMode } from '@/lib/todos/todoUISlice';
import * as S from './TodoList.styled';

function OpenCreateTodoModalButton() {
  const dispatch = useDispatch();

  const handleOpenModalByFAB = () => {
    dispatch(setTodoId(0));
    dispatch(openModalByFAB());
    dispatch(openModal());
    dispatch(setModalMode('create'));
  };

  return (
    <S.FloatingButton>
      <Fab color="primary" size="small" aria-label="add" onClick={handleOpenModalByFAB}>
        <AddIcon />
      </Fab>
    </S.FloatingButton>
  );
}

export default OpenCreateTodoModalButton;
