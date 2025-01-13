import 'dotenv/config'

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/drizzle/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DB_URL,

    }
})