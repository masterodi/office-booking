export default defineEventHandler(async (event) => {
  const bookingId = getRouterParam(event, 'id')

  if (!bookingId) return

  const db = useDrizzle()

  const getWhere: GetWhere<'bookings', false> = () => (model, { eq }) => eq(model.id, bookingId)

  const queryResult = await db.query.bookings.findFirst({ where: getWhere() })

  return { data: queryResult }
})
