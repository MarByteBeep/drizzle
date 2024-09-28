import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/schemas/*',
	url: process.env.DATABASE_PATH,
	dialect: 'sqlite',
	migrations: {
		prefix: 'supabase',
	},
});
