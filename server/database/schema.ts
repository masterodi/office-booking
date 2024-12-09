import { createId } from '@paralleldrive/cuid2'
import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text({ enum: ['NORMAL', 'ADMIN'] }).notNull().default('NORMAL'),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
})

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}))

export const desks = sqliteTable('desks', {
  id: text().primaryKey().$defaultFn(() => createId()),
  label: text().unique().notNull(),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
})

export const bookings = sqliteTable('bookings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  deskId: text('desk_id').notNull().references(() => desks.id, { onDelete: 'cascade' }),
  createdBy: text('created_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  bookedDate: text('booked_date').notNull(),
  createdAt: text('created_at').notNull().default(sql`(CURRENT_TIMESTAMP)`),
})

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, { fields: [bookings.createdBy], references: [users.id] }),
  desk: one(desks, { fields: [bookings.deskId], references: [desks.id] }),
}))
