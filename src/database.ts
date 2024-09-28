import Database from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import * as personSchema from './schemas/person';
import * as userSchema from './schemas/user';

const sqlite = new Database(process.env.DATABASE_PATH);

export const db = drizzle(sqlite, { schema: { ...userSchema, ...personSchema } });
