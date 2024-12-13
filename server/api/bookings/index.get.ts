import type { TDB } from '~/server/utils/drizzle'
import { BookingsQueryParamsSchema } from '~/utils/validation-schemas'

type GetWhere = () => NonNullable<Parameters<TDB['query']['bookings']['findFirst']>[0]>['where']
type GetWith = () => NonNullable<Parameters<TDB['query']['bookings']['findFirst']>[0]>['with']

export default defineEventHandler(async (event) => {
  const { date, start, end, include } = await getValidatedQuery(event, validateWithSchema(BookingsQueryParamsSchema))

  const db = useDrizzle()

  const getWhere: GetWhere = () => (model, { eq, gte, lte, between }) => {
    if (date) {
      return eq(model.bookedDate, date)
    }

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

  const getWith: GetWith = () => {
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
