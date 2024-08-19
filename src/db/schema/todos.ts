import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';
import { categoriesTable } from './categories';

export const todosTable = sqliteTable('todos', {
  todoId: integer('todo_id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  startTime: text('start_time'),
  endTime: text('end_time'),
  color: text('color'),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.userId, { onDelete: 'cascade' }),
  categoryId: integer('category_id')
    .notNull()
    .default(0)
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
  todoId: number;
  userId: number;
  id: number;
  taskColor: string | null;
}
