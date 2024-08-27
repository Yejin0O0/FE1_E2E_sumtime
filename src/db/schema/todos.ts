import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';
import { categoriesTable } from './categories';

export const todosTable = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  date: text('date').notNull(),
  startTime: text('start_time'),
  endTime: text('end_time'),
  isProgress: integer('is_progress').default(0),
  color: text('color'),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id')
    .notNull()
    .default(1)
    .references(() => categoriesTable.id, { onDelete: 'cascade' }),
});

export type InsertTodo = typeof todosTable.$inferInsert;
export type SelectTodo = typeof todosTable.$inferSelect;

export interface TodoForTimetable {
  startTime: Date | null;
  endTime: Date | null;
  title: string;
  content: string | null;
  color: string | null;
  categoryId: number;
  userId: number;
  id: number;
  taskColor: string | null;
  date: string;
  updatedAt: string;
  createdAt: string;
}
