import { DesksQueryParamsSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  const db = useDrizzle()

  const { start, end } = await getValidatedQuery(event, value =>
    DesksQueryParamsSchema.parse(value),
  )

  const res = await db.query.desks.findMany({
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

  return { data: res }
})
