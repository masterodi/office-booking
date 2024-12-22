import { DesksQueryParamsSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  const { available, start, end, date } = await getValidatedQuery(event, validateWithSchema(DesksQueryParamsSchema))

  const db = useDrizzle()

  const getBookingsWhere: GetWhere<'bookings'> = () => (model, { eq, lte, gte, between }) => {
    if (date) {
      return eq(model.bookedDate, date)
    }

    if (start && end) {
      return between(model.bookedDate, start, end)
    }

    if (start) {
      return gte(model.bookedDate, start)
    }

    if (end) {
      return lte(model.bookedDate, end)
    }
  }

  const res = await db.query.desks.findMany({
    with: {
      bookings: {
        where: getBookingsWhere(),
        columns: { bookedDate: true },
      },
    },
  })

  const desks = available === true
    ? res.filter(desk => desk.bookings.length === 0)
    : available === false
      ? res.filter(desk => desk.bookings.length !== 0)
      : res

  return { data: desks.map(desk => ({ id: desk.id, label: desk.label, createdAt: desk.createdAt })) }
})
