import React, { createContext, useMemo, useState } from 'react';
import { useGetTodosMatchingDate } from '@/api/hooks/todoHooks';
import { useSession } from 'next-auth/react';
import { SelectTodo } from '@/db/schema/todos';
import { useParams } from 'next/navigation';

interface ContextType {
  // 세션
  sessionId: number | undefined;
  // 데이터
  displayingDate: Date;
  setDisplayingDate: (date: Date) => void;
  todoId: number;
  setTodoId: (id: number) => void;
  todoListData: SelectTodo[];
  isLoading: boolean; // 로딩 상태 추가
}
const initialValue = {
  // 세션
  sessionId: undefined,
  // 데이터
  displayingDate: new Date(),
  setDisplayingDate: () => {},
  todoId: 0,
  setTodoId: () => {},
  todoListData: [],
  isLoading: false,
};

export const TodoDataContext = createContext<ContextType>(initialValue);

export function TodoDataProvider({ children }: React.PropsWithChildren) {
  // 세션
  const { data: session } = useSession();
  const sessionId = session?.user?.id;
  // 사용자가 선택한 날짜
  const params = useParams();
  const { year, month, day } = params;
  const [displayingDate, setDisplayingDate] = useState<Date>(new Date(Number(year), Number(month) - 1, Number(day)));
  // 데이터
  const [todoId, setTodoId] = useState<number>(0);
  const { data: todoListData = [], isLoading = false } = sessionId
    ? useGetTodosMatchingDate(sessionId, displayingDate)
    : { data: [] };

  const value = useMemo(
    () => ({
      // 세션
      sessionId,
      // 데이터
      displayingDate,
      setDisplayingDate,
      todoId,
      setTodoId,
      todoListData,
      isLoading,
    }),
    [sessionId, displayingDate, todoId, todoListData, isLoading],
  );

  return <TodoDataContext.Provider value={value}>{children}</TodoDataContext.Provider>;
}
