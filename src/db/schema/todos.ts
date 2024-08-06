import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './users';

export const todosTable = sqliteTable('todos', {
  todoId: integer('todo_id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content'),
  startTime: text('start_time'),
  endTime: text('end_time'),
  color: text('color'),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.userId, { onDelete: 'cascade' }),
});

export type InsertTodo = typeof todosTable.$inferInsert;
export type SelectTodo = typeof todosTable.$inferSelect;

// type MySelect = Pick<SelectTodo, 'userId' | 'title'>;
