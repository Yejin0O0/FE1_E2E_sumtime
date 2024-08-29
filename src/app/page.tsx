'use client';

import Header from '@/components/Header';
import Todo from '@/components/todo';
import { BasicContainer } from '@/components/common';
import TimeTable from '@/components/TimeTable';

export default function Home() {
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
