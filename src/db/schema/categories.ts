import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const categoriesTable = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  color: text('color'),
  isDisplayed: integer('is_displayed').notNull().default(1),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  userId: integer('user_id').notNull(),
});

export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;
