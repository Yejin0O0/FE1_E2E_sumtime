import { sqliteTable, AnySQLiteColumn, uniqueIndex, integer, text, foreignKey } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable(
  'users',
  {
    userId: integer('user_id').primaryKey({ autoIncrement: true }).notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    nickname: text('nickname').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (table) => {
    return {
      emailUnique: uniqueIndex('users_email_unique').on(table.email),
    };
  },
);

export const todos = sqliteTable('todos', {
  todoId: integer('todo_id').primaryKey({ autoIncrement: true }).notNull(),
  title: text('title').notNull(),
  content: text('content'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  startTime: text('start_time'),
  endTime: text('end_time'),
  color: text('color'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade' }),
  categoryId: integer('category_id')
    .default(0)
    .notNull()
    .references(() => categories.id, { onDelete: 'cascade' }),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  color: text('color'),
  createdAt: text('created_at').default("sql`(datetime('now'))`").notNull(),
  updatedAt: text('updated_at').default("sql`(datetime('now'))`").notNull(),
});
