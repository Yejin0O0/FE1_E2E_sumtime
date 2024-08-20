import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const categoriesTable = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  color: text('color'),
  isReported: integer('is_reported').notNull().default(1),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;
