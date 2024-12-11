import type { InferSelectModel } from 'drizzle-orm'
import type { z } from 'zod'
import type * as schemas from './validation-schemas'

export type Desk = InferSelectModel<typeof tables.desks>
export type Booking = InferSelectModel<typeof tables.bookings>
export type BookingWithUserWithDesk = Booking & { user: SafeUser, desk: Desk }
export type User = InferSelectModel<typeof tables.users>
export type SafeUser = Omit<User, 'passwordHash'>

export type DeskCreatePayload = z.infer<typeof schemas.DeskCreatePayloadSchema>
export type DeskUpdatePayload = z.infer<typeof schemas.DeskUpdatePayloadSchema>
export type DesksQueryParams = z.infer<typeof schemas.DesksQueryParamsSchema>

export type BookingCreatePayload = z.infer<typeof schemas.BookingCreatePayloadSchema>
export type BookingUpdatePayload = z.infer<typeof schemas.BookingUpdatePayloadSchema>
export type BookingsQueryParams = z.infer<typeof schemas.BookingsQueryParamsSchema>
