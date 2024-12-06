import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const desks = sqliteTable('desks', {
	id: text().$defaultFn(() => createId()),
	label: text().notNull().unique(),
	createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
});
