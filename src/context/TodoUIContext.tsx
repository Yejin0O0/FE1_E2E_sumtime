import React, { createContext, useMemo, useState } from 'react';
import useBooleanState from '@/hooks/utils/useBooleanState';
import { TodoModalMode } from '@/types/todo';

interface ContextType {
  // 달력
  isCalendarOpen: boolean;
  toggleIsCalendarOpen: () => void;
  // 모달
  isModalOpen: boolean;
  setIsModalOpenTrue: () => void;
  setIsModalOpenFalse: () => void;
  isModalOpenedByFAB: boolean;
  setIsModalOpenedByFABTrue: () => void;
  setIsModalOpenedByFABFalse: () => void;
  mode: string;
  setTodoModalMode: (mode: TodoModalMode) => void;
}
const initialValue = {
  // 달력
  isCalendarOpen: false,
  toggleIsCalendarOpen: () => {},
  // 모달
  isModalOpen: false,
  setIsModalOpenTrue: () => {},
  setIsModalOpenFalse: () => {},
  isModalOpenedByFAB: false,
  setIsModalOpenedByFABTrue: () => {},
  setIsModalOpenedByFABFalse: () => {},
  mode: '',
  setTodoModalMode: () => {},
};

export const TodoUIContext = createContext<ContextType>(initialValue);

export function TodoUIProvider({ children }: React.PropsWithChildren) {
  // 달력
  const { value: isCalendarOpen, toggle: toggleIsCalendarOpen } = useBooleanState();
  // 모달
  const [mode, setTodoModalMode] = useState<TodoModalMode>('');
  const { value: isModalOpen, setTrue: setIsModalOpenTrue, setFalse: setIsModalOpenFalse } = useBooleanState();
  const {
    value: isModalOpenedByFAB,
    setTrue: setIsModalOpenedByFABTrue,
    setFalse: setIsModalOpenedByFABFalse,
  } = useBooleanState();

  const value = useMemo(
    () => ({
      // 달력
      isCalendarOpen,
      toggleIsCalendarOpen,
      // 모달
      mode,
      setTodoModalMode,
      isModalOpen,
      setIsModalOpenTrue,
      setIsModalOpenFalse,
      isModalOpenedByFAB,
      setIsModalOpenedByFABTrue,
      setIsModalOpenedByFABFalse,
    }),
    [isCalendarOpen, isModalOpen, isModalOpenedByFAB, mode],
  );

  return <TodoUIContext.Provider value={value}>{children}</TodoUIContext.Provider>;
}
