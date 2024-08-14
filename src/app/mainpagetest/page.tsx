'use client';

import React from 'react';
import Todo from '@/components/todo';
import { BasicContainer } from '@/components/common';
import TimeTable from '@/components/TimeTable';
import Header from '@/components/Header';

export default function mainTestPage() {
  return (
    <>
      <Header />
      <BasicContainer>
        <TimeTable />
        <Todo />
      </BasicContainer>
    </>
  );
}
