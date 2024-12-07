import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})

export const desks = sqliteTable('desks', {
  id: text().$defaultFn(() => createId()),
  label: text().unique().notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
})
