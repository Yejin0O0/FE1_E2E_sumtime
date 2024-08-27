'use client';

import React from 'react';
import Todo from '@/components/todo';
import { BasicContainer } from '@/components/common';
import TimeTable from '@/components/TimeTable';
import Header from '@/components/Header';
import { notFound } from 'next/navigation';
import { isValidDate } from '@/utils/timeUtils';

export default function DayPage({ params }: { params: { year: string; month: string; day: string } }) {
  if (!isValidDate(params.year, params.month, params.day)) {
    return notFound();
  }

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
