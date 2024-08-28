import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectTodo } from '@/db/schema/todos';
import { TODAY } from '@/constants';

interface TodoDataState {
  sessionId: number | undefined;
  displayingDate: Date | null;
  todoId: number;
  todoListData: SelectTodo[];
  isLoading: boolean;
}

console.log('!!!!!!!!!in redux:', TODAY);

const initialState: TodoDataState = {
  sessionId: undefined,
  displayingDate: TODAY,
  todoId: 0,
  todoListData: [],
  isLoading: false,
};

const todoDataSlice = createSlice({
  name: 'todoData',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<number | undefined>) => {
      state.sessionId = action.payload;
    },
    setDisplayingDate: (state, action: PayloadAction<Date | null>) => {
      state.displayingDate = action.payload; // sessionId 및 displayingDate가 외부에서 주입됨
    },
    setTodoId: (state, action: PayloadAction<number>) => {
      state.todoId = action.payload;
    },
    setTodoListData: (state, action: PayloadAction<SelectTodo[]>) => {
      state.todoListData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSessionId, setDisplayingDate, setTodoId, setTodoListData, setLoading } = todoDataSlice.actions;

export const selectTodoData = (state: { todoData: TodoDataState }) => state.todoData;

export default todoDataSlice.reducer;
