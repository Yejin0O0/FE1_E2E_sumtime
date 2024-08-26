// src/types/todo.d.ts
export type TodoModalMode = 'create' | 'update' | '';

export interface TodoDateType {
  categoryId: number;
  startTime: Date | null;
  endTime: Date | null;
  id: number;
  title: string;
  color: string | null;
  date: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}
