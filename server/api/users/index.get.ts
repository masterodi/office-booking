export default defineEventHandler(async (_event) => {
  const db = useDrizzle()

  const res = await db.query.users.findMany()

  return { data: res }
})
