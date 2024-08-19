import { relations } from 'drizzle-orm/relations';
import { categories, todos, users } from './schema';

export const todosRelations = relations(todos, ({ one }) => ({
  category: one(categories, {
    fields: [todos.categoryId],
    references: [categories.id],
  }),
  user: one(users, {
    fields: [todos.userId],
    references: [users.userId],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  todos: many(todos),
}));

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));
