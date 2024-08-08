'use client';

import React from 'react';
import Todo from '@/components/todo';
import { BasicContainer } from '@/components/common';
import TimeTable from '@/components/TimeTable';

export default function mainTestPage() {
  return (
    <BasicContainer>
      <TimeTable />
      <Todo />
    </BasicContainer>
  );
}
