import { describe, expect, test } from 'bun:test';
import { eq, sql } from 'drizzle-orm';
import { db } from './database';
import { user, type User } from './schemas/user';

const userA: User = {
	id: 1,
	name: 'Martijn Arendsen',
	phone: '0612345678',
	json: {
		_id: 'abcd',
		seed: 1234,
		user: {
			_id: 'abcd',
			bio: 'I am Martin',
			name: 'Martijn',
		},
	},
};

const userB: any = {
	id: 2,
	name: 'Bart de Boer',
	phone: '0688885678',
	json: {
		_id: 'bcde',
		seed: 5678,
		user: {
			_id: 'bcde',
			bio: 'I am Bart',
			name: 'Bart',
			extraA: 'Extra field A',
		},
		extraB: 'Extra field B',
	},
};

function insertUser(newUser: User) {
	return db.insert(user).values(newUser).onConflictDoNothing().run() as unknown as {
		changes: number;
		lastInsertRowid: number;
	};
}

describe('DELETE', async () => {
	test('users', async () => {
		await db.delete(user);
	});
});

describe('INSERT', () => {
	test('userA', () => {
		const result = insertUser(userA);
		expect(result.lastInsertRowid).toEqual(1);
		expect(result.changes).toEqual(1);
	});

	test('userA again', () => {
		const result = insertUser(userA);
		expect(result.lastInsertRowid).toEqual(1);
		expect(result.changes).toEqual(0);
	});

	test('userB', () => {
		const result = insertUser(userB);
		expect(result.lastInsertRowid).toEqual(2);
		expect(result.changes).toEqual(1);
	});
});

describe('SELECT', () => {
	test('userA', () => {
		const result = db.select().from(user).where(eq(user.name, 'Martijn Arendsen')).get();
		expect(result?.id).toBe(1);
	});
	test('userB', () => {
		const result = db.select().from(user).where(eq(user.phone, '0688885678')).get();
		expect(result?.id).toBe(2);
	});
	test('unknown user', () => {
		const result = db.select().from(user).where(eq(user.phone, '121')).get();
		expect(result).toBeUndefined();
	});
});

describe('QUERY', () => {
	test('userA', () => {
		const result = db.query.user.findFirst({ where: eq(user.name, 'Martijn Arendsen') }).sync();
		expect(result?.id).toBe(1);
	});

	test('userB', () => {
		const result = db.query.user.findFirst({ where: eq(user.phone, '0688885678') }).sync();
		expect(result?.id).toBe(2);
	});

	test('unknown user', () => {
		const result = db.query.user.findFirst({ where: eq(user.phone, '212') }).sync();
		expect(result).toBeUndefined();
	});
});

describe('SELECT JSON', () => {
	test('query field', () => {
		const result = db
			.select()
			.from(user)
			.where(sql`json_extract(${user.json}, '$.seed') = 5678`)
			.get();

		expect(result?.id).toBe(2);
	});
});
