import { z } from 'zod';

export const DeskCreatePayloadSchema = z.object({
	label: z.string(),
});

export const DesksCreatePayloadSchema = z.union([
	DeskCreatePayloadSchema,
	z.array(DeskCreatePayloadSchema),
]);

export const DeskUpdatePayloadSchema = DeskCreatePayloadSchema.partial();

export const DesksQueryParamsSchema = z.object({
	start: z.string().date().optional(),
	end: z.string().date().optional(),
});
