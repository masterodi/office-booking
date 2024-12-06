import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	const db = useDrizzle();

	const deskId = getRouterParam(event, 'id');
	const body = await readBody(event);

	if (!deskId) return;

	const updateResult = await db
		.update(tables.desks)
		.set(body)
		.where(eq(tables.desks.id, deskId))
		.returning();

	return { data: updateResult[0] };
});
