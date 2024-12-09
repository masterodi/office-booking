import type { InferSelectModel } from 'drizzle-orm'

export type Desk = InferSelectModel<typeof tables.desks>
export type Booking = InferSelectModel<typeof tables.bookings>
export type User = InferSelectModel<typeof tables.users>
export type SafeUser = Omit<User, 'passwordHash'>
