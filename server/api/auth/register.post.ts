import { RegisterPayloadSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, validateWithSchema(RegisterPayloadSchema))

  const passwordHash = await hashPasswordArgon(payload.password)

  const user = { username: payload.username, passwordHash }

  const db = useDrizzle()

  const insertRes = await db.insert(tables.users).values(user).returning({ username: tables.users.username, role: tables.users.role })
  const insertedUser = insertRes[0]

  await setUserSession(event, {
    user: { username: insertedUser.username, role: insertedUser.role },
    loggedInAt: new Date(),
  })

  return { message: 'Account created' }
})
