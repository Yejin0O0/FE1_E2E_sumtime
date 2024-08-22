import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoModalMode } from '@/types/todo';
import type { RootState } from '@/lib/store';

interface TodoUIState {
  isCalendarOpen: boolean;
  isModalOpen: boolean;
  isModalOpenedByFAB: boolean;
  mode: TodoModalMode;
}

const initialState: TodoUIState = {
  isCalendarOpen: false,
  isModalOpen: false,
  isModalOpenedByFAB: false,
  mode: '',
};

const todoUISlice = createSlice({
  name: 'todoUI',
  initialState,
  reducers: {
    toggleCalendar: (state) => {
      state.isCalendarOpen = !state.isCalendarOpen;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setModalMode: (state, action: PayloadAction<TodoModalMode>) => {
      state.mode = action.payload;
    },
    openModalByFAB: (state) => {
      state.isModalOpenedByFAB = true;
    },
    closeModalByFAB: (state) => {
      state.isModalOpenedByFAB = false;
    },
  },
});

export const { toggleCalendar, openModal, closeModal, setModalMode, openModalByFAB, closeModalByFAB } = todoUISlice.actions;

export const selectTodoUI = (state: RootState) => state.todoUI;

export default todoUISlice.reducer;
