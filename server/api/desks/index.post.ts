import { DesksCreatePayloadSchema } from '~/utils/schemas';

export default defineEventHandler(async (event) => {
	const db = useDrizzle();

	let payload = await readValidatedBody(event, (body) =>
		DesksCreatePayloadSchema.parse(body),
	);

	payload = !Array.isArray(payload) ? [payload] : payload;

	const insertResult = await db
		.insert(tables.desks)
		.values(payload)
		.returning();

	return { data: insertResult };
});
