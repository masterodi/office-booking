import { BookingsCreatePayloadSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  let payload = await readValidatedBody(event, validateWithSchema(BookingsCreatePayloadSchema))

  payload = Array.isArray(payload) ? payload : [payload]

  const db = useDrizzle()

  const insertResult = await db.insert(tables.bookings).values(payload).returning()

  return { data: insertResult }
})
