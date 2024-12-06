export default defineEventHandler(async (event) => {
	const db = useDrizzle();

	const body = await readBody(event);

	const insertResult = await db.insert(tables.desks).values(body).returning();

	return insertResult[0].id;
});
