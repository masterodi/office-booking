import { BookingsQueryParamsSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  const { date, start, end, include } = await getValidatedQuery(event, validateWithSchema(BookingsQueryParamsSchema))

  const db = useDrizzle()

  const getWhere: GetWhere<'bookings'> = () => (model, { eq, gte, lte, between }) => {
    if (date) {
      return eq(model.bookedDate, date)
    }

    if (start && end) {
      return between(model.createdAt, start, end)
    }

    if (end) {
      return lte(model.createdAt, end)
    }

    if (start) {
      return gte(model.createdAt, start)
    }

    return
  }

  const getWith: GetWith<'bookings'> = () => {
    let inc: { user?: { columns: { passwordHash: boolean } }, desk?: true } | undefined

    if (include?.includes('user')) {
      inc = { ...inc, user: { columns: { passwordHash: false } } }
    }

    if (include?.includes('desk')) {
      inc = { ...inc, desk: true }
    }

    return inc
  }

  const queryResult = await db.query.bookings.findMany({
    where: getWhere(),
    with: getWith(),
  })

  return { data: queryResult }
})
