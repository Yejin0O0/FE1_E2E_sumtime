'use client';

import React from 'react';
import Todo from '@/components/todo';
import { BasicContainer } from '@/components/common';
import TimeTable from '@/components/TimeTable';
import Header from '@/components/Header';
import { TodoDataProvider } from '@/context/TodoDataContext';
import { TodoUIProvider } from '@/context/TodoUIContext';

export default function mainTestPage() {
  return (
    <TodoDataProvider>
      <TodoUIProvider>
        <Header />
        <BasicContainer>
          <TimeTable />
          <Todo />
        </BasicContainer>
      </TodoUIProvider>
    </TodoDataProvider>
  );
}
