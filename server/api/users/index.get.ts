export default defineEventHandler(async (_event) => {
  const db = useDrizzle()

  const res = await db.query.users.findMany()

  const safeData = res.map((user) => {
    const { passwordHash, ...safe } = user
    return safe
  })

  return { data: safeData }
})
