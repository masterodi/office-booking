export default defineEventHandler(async (event) => {
	const db = useDrizzle();

	const qps = getQuery(event);

	const res = await db.query.desks.findMany({
		where: (model, { gte, lte, between }) => {
			if (qps.start && qps.end) {
				return between(
					model.createdAt,
					new Date(qps.start as string).toISOString(),
					new Date(qps.end as string).toISOString(),
				);
			}

			if (qps.end) {
				return lte(
					model.createdAt,
					new Date(qps.end as string).toISOString(),
				);
			}

			if (qps.start) {
				return gte(
					model.createdAt,
					new Date(qps.start as string).toISOString(),
				);
			}

			return;
		},
	});

	return { data: res };
});
