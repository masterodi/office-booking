import { LoginPayloadSchema } from '~/utils/validation-schemas'

export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, validateWithSchema(LoginPayloadSchema))

  const db = useDrizzle()

  const existingUser = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.username, payload.username),
  })

  if (!existingUser) {
    setResponseStatus(event, 401)
    return { message: 'Bad credentials' }
  }

  const doPasswordsMatch = await verifyPasswordHashArgon(
    existingUser.passwordHash,
    payload.password,
  )

  if (!doPasswordsMatch) {
    setResponseStatus(event, 401)
    return { message: 'Bad credentials' }
  }

  await replaceUserSession(event, {
    user: { username: existingUser.username, role: existingUser.role },
    loggedInAt: new Date(),
  })

  return true
})
