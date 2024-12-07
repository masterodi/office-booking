import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  if (user.role !== 'ADMIN') {
    setResponseStatus(event, 401)
    return { message: 'Unauthorized' }
  }

  const deskId = getRouterParam(event, 'id')

  if (!deskId) return

  const db = useDrizzle()

  await db.delete(tables.desks).where(eq(tables.desks.id, deskId))

  return
})
