export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)

  if (!user) return null

  const db = useDrizzle()

  const getWhere: GetWhere<'users', false> = () => (model, { eq }) => eq(model.username, user.username)

  const res = await db.query.users.findFirst({
    where: getWhere(),
  })

  if (!res) {
    setResponseStatus(event, 400)
    return { message: 'Something went wrong' }
  }

  const { passwordHash, ...safeData } = res

  return safeData
})
