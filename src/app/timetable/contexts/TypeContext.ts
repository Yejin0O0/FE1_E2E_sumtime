import { createContext } from 'react';
import { TimetableType } from '../components/Timetable.type';

const TypeContext = createContext<TimetableType>('COLUMN');

export { TypeContext };
