export default defineEventHandler(async (event) => {
  const deskId = getRouterParam(event, 'id')

  if (!deskId) return

  const db = useDrizzle()

  const getWhere: GetWhere<'desks', false> = () => (model, { eq }) => {
    return eq(model.id, deskId)
  }

  const res = await db.query.desks.findFirst({
    where: getWhere(),
  })

  if (!res) {
    setResponseStatus(event, 404, 'Desk Not Found')
    return { message: 'Desk Not Found' }
  }

  return { data: res }
})
