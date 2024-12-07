import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const bookingId = getRouterParam(event, 'id')

  if (!bookingId) return

  const db = useDrizzle()

  db.delete(tables.bookings).where(eq(tables.bookings.id, bookingId))

  return
})
