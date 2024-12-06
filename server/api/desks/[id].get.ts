export default defineEventHandler(async (event) => {
	const db = useDrizzle();

	const deskId = getRouterParam(event, 'id');

	if (!deskId) return;

	const res = await db.query.desks.findFirst({
		where: (model, { eq }) => eq(model.id, deskId),
	});

	if (!res) {
		setResponseStatus(event, 404, 'Desk Not Found');
		return { message: 'Desk Not Found' };
	}

	return { data: res };
});
