import { configureStore } from '@reduxjs/toolkit';
import todoDataReducer from '@/lib/todos/todoDataSlice';
import todoUIReducer from '@/lib/todos/todoUISlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      todoData: todoDataReducer,
      todoUI: todoUIReducer,
    },
    // useGetTodosMatchingDate 호출시 인수로 Date 넣어줄 수 있도록 middleware 설정
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Date 객체를 직렬화 가능한 값으로 간주
          ignoredActions: ['todoData.displayingDate', 'todoData/setDisplayingDate', 'payload'],
          ignoredPaths: ['todoData.displayingDate', 'todoData.setDisplayingDate', 'payload'],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
