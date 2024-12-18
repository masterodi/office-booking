import { DesksQueryParamsSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  const { start, end } = await getValidatedQuery(event, validateWithSchema(DesksQueryParamsSchema))

  const db = useDrizzle()

  const getWhere: GetWhere<'desks'> = () => (model, { gte, lte, between }) => {
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
  }

  const res = await db.query.desks.findMany({
    where: getWhere(),
  })

  return { data: res }
})
