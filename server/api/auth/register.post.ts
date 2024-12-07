import { RegisterPayloadSchema } from '~/utils/schemas'

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, body =>
    RegisterPayloadSchema.parse(body),
  )

  const passwordHash = await hashPasswordArgon(payload.password)

  const user = { username: payload.username, passwordHash }

  const db = useDrizzle()

  await db.insert(tables.users).values(user)

  await setUserSession(event, {
    user: { username: payload.username },
    loggedInAt: new Date(),
  })

  return { message: 'Account created' }
})
