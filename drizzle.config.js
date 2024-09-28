import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/schemas/*',
	dbCredentials: {
		url: process.env.DATABASE_PATH,
	},
	url: process.env.DATABASE_PATH,
	dialect: 'sqlite',
	migrations: {
		prefix: 'supabase',
	},
});
