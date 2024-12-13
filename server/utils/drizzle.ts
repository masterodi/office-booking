import { createClient } from '@libsql/client'
import type { DBQueryConfig, ExtractTablesWithRelations } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '../database/schema'

export const tables = schema

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const db = drizzle(turso, { schema })

export function useDrizzle() {
  return db
}

export type TSchema = ExtractTablesWithRelations<typeof schema>
export type QueryConfig<TableName extends keyof TSchema> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TableName]
>
export type TDB = typeof db
