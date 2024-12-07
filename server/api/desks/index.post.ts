import { DesksCreatePayloadSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  if (user.role !== 'ADMIN') {
    setResponseStatus(event, 401)
    return { message: 'Unauthorized' }
  }

  let payload = await readValidatedBody(event, validateWithSchema(DesksCreatePayloadSchema))

  const db = useDrizzle()

  payload = !Array.isArray(payload) ? [payload] : payload

  const insertResult = await db
    .insert(tables.desks)
    .values(payload)
    .returning()

  return { data: insertResult }
})
