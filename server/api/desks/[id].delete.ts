import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const deskId = getRouterParam(event, 'id')

  if (!deskId) return

  const db = useDrizzle()

  await db.delete(tables.desks).where(eq(tables.desks.id, deskId))

  return
})
