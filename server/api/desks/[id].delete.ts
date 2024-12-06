import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	const db = useDrizzle();

	const deskId = getRouterParam(event, 'id');

	if (!deskId) return;

	await db.delete(tables.desks).where(eq(tables.desks.id, deskId));

	return;
});
