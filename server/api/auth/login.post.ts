import { LoginPayloadSchema } from '~/utils/schemas';

export default defineEventHandler(async (event) => {
	const db = useDrizzle();

	const payload = await readValidatedBody(event, (body) =>
		LoginPayloadSchema.parse(body),
	);

	const existingUser = await db.query.users.findFirst({
		where: (model, { eq }) => eq(model.username, payload.username),
	});

	if (!existingUser) {
		setResponseStatus(event, 401);
		return { message: 'Bad credentials' };
	}

	const doPasswordsMatch = await verifyPasswordHashArgon(
		existingUser.passwordHash,
		payload.password,
	);

	if (!doPasswordsMatch) {
		setResponseStatus(event, 401);
		return { message: 'Bad credentials' };
	}

	await replaceUserSession(event, {
		user: { username: existingUser.username },
		loggedInAt: new Date(),
	});

	return true;
});
