import { pgTable, uuid, text, pgRole, PgUUID } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    refreshToken: text('refresh_token').default('')
});