import { BookingsQueryParamsSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  const { start, end } = await getValidatedQuery(event, qps => BookingsQueryParamsSchema.parse(qps))

  const db = useDrizzle()

  const queryResult = await db.query.bookings.findMany({
    where: (model, { gte, lte, between }) => {
      if (start && end) {
        return between(
          model.createdAt,
          new Date(start).toISOString(),
          new Date(end).toISOString(),
        )
      }

      if (end) {
        return lte(model.createdAt, new Date(end).toISOString())
      }

      if (start) {
        return gte(model.createdAt, new Date(start).toISOString())
      }

      return
    },
  })

  return { data: queryResult }
})
