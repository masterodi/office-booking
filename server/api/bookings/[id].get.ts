export default defineEventHandler(async (event) => {
  const bookingId = getRouterParam(event, 'id')

  if (!bookingId) return

  const db = useDrizzle()

  const queryResult = await db.query.bookings.findFirst({ where: (model, { eq }) => eq(model.id, bookingId) })

  return { data: queryResult }
})
