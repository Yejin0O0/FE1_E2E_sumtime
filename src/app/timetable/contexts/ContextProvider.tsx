import { ReactNode } from 'react';
import { PopoverType, TimetableType, TaskThemeType } from '../components/Timetable.type';
import { PopoverTypeContext } from './PopoverContext';
import { TaskSlotContext } from './TaskSlotContext';
import { TypeContext } from './TypeContext';
import { TaskThemeContext } from './TaskThemeContext';

interface ContextProviderProps {
  timetableType: TimetableType;
  contextValue: {
    defaultValue: string;
  };
  popoverType: PopoverType;
  taskTheme: TaskThemeType;
  children?: ReactNode;
}

function ContextProvider({ timetableType, contextValue, popoverType, taskTheme, children }: ContextProviderProps) {
  return (
    <TypeContext.Provider value={timetableType}>
      <TaskSlotContext.Provider value={contextValue}>
        <PopoverTypeContext.Provider value={popoverType}>
          <TaskThemeContext.Provider value={taskTheme}>{children}</TaskThemeContext.Provider>
        </PopoverTypeContext.Provider>
      </TaskSlotContext.Provider>
    </TypeContext.Provider>
  );
}

export { ContextProvider };
