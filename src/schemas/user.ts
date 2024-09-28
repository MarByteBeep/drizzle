import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

type jsonSchema = {
	_id: string;
	seed: number;
	user: {
		_id: string;
		bio: string;
		name: string;
	};
};

export const user = sqliteTable(
	'user',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		name: text('name').unique(),
		phone: text('phone'),
		json: text('json', { mode: 'json' }).$type<jsonSchema>(),
	},
	(t) => {
		return {
			// FIXME: Find out how to create normal indices
			//nameIdx: index("name_idx").on(t.phone),
			phoneIdx: unique().on(t.phone),
		};
	}
);

export type User = typeof user.$inferSelect; // return type when queried
export type InsertUser = typeof user.$inferInsert; // insert type
