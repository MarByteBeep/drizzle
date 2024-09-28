import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const persons = sqliteTable('person', {
	id: integer('id').primaryKey(),
	fullName: text('full_name'),
	email: text('email'),
});

export type Person = typeof persons.$inferSelect; // return type when queried
export type InsertPerson = typeof persons.$inferInsert; // insert type
