import { LoginPayloadSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, validateWithSchema(LoginPayloadSchema))

  const db = useDrizzle()

  const getWhere: GetWhere<'users', false> = () => (model, { eq }) => eq(model.username, payload.username)

  const existingUser = await db.query.users.findFirst({
    where: getWhere(),
  })

  if (!existingUser) {
    const passwordHash = await hashPasswordArgon(payload.password)
    const user = { username: payload.username, passwordHash }
    const insertRes = await db.insert(tables.users).values(user)
      .returning({
        id: tables.users.id,
        username: tables.users.username,
        role: tables.users.role,
      })
    const insertedUser = insertRes[0]
    await replaceUserSession(event, {
      user: { id: insertedUser.id, username: insertedUser.username, role: insertedUser.role },
      loggedInAt: new Date(),
    })
    return
  }

  const doPasswordsMatch = await verifyPasswordHashArgon(
    existingUser.passwordHash,
    payload.password,
  )

  if (!doPasswordsMatch) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  await replaceUserSession(event, {
    user: { id: existingUser.id, username: existingUser.username, role: existingUser.role },
    loggedInAt: new Date(),
  })

  return
})
