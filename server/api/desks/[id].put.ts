import { eq } from 'drizzle-orm'
import { DeskUpdatePayloadSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  const db = useDrizzle()

  const deskId = getRouterParam(event, 'id')

  if (!deskId) return

  const payload = await readValidatedBody(event, body =>
    DeskUpdatePayloadSchema.parse(body),
  )

  const updateResult = await db
    .update(tables.desks)
    .set(payload)
    .where(eq(tables.desks.id, deskId))
    .returning()

  return { data: updateResult[0] }
})
