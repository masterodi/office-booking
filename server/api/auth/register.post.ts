import { RegisterPayloadSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, validateWithSchema(RegisterPayloadSchema))

  const passwordHash = await hashPasswordArgon(payload.password)

  const user = { username: payload.username, passwordHash }

  const db = useDrizzle()

  const insertRes = await db.insert(tables.users).values(user)
    .returning({
      id: tables.users.id,
      username: tables.users.username,
      role: tables.users.role,
    })
  const insertedUser = insertRes[0]

  await setUserSession(event, {
    user: { id: insertedUser.id, username: insertedUser.username, role: insertedUser.role },
    loggedInAt: new Date(),
  })

  return { message: 'Account created' }
})
