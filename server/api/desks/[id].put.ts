import { eq } from 'drizzle-orm'
import { DeskUpdatePayloadSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  if (user.role !== 'ADMIN') {
    setResponseStatus(event, 401)
    return { message: 'Unauthorized' }
  }

  const deskId = getRouterParam(event, 'id')

  if (!deskId) return

  const payload = await readValidatedBody(event, validateWithSchema(DeskUpdatePayloadSchema))

  const db = useDrizzle()

  const updateResult = await db
    .update(tables.desks)
    .set(payload)
    .where(eq(tables.desks.id, deskId))
    .returning()

  return { data: updateResult[0] }
})
