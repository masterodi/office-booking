import { eq } from 'drizzle-orm'
import { BookingUpdatePayloadSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const bookingId = getRouterParam(event, 'id')

  if (!bookingId) return

  const payload = await readValidatedBody(event, validateWithSchema(BookingUpdatePayloadSchema))

  const db = useDrizzle()

  const updateResult = await db.update(tables.bookings).set(payload).where(eq(tables.bookings.id, bookingId)).returning()

  return { data: updateResult }
})
