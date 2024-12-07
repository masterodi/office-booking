import { BookingsCreatePayloadSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  let payload = await readValidatedBody(event, body => BookingsCreatePayloadSchema.parse(body))

  payload = Array.isArray(payload) ? payload : [payload]

  const db = useDrizzle()

  const insertResult = await db.insert(tables.bookings).values(payload).returning()

  return { data: insertResult }
})