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
export type TableName = keyof TSchema
export type QueryConfig<TN extends TableName> = DBQueryConfig<
  'one' | 'many',
  boolean,
  TSchema,
  TSchema[TN]
>
export type TDB = typeof db
export type GetWhere<TN extends TableName, Many extends boolean = true> =
  () => NonNullable<Parameters<TDB['query'][TN][Many extends true ? 'findMany' : 'findFirst']>[0]>['where']
export type GetWith<TN extends TableName, Many extends boolean = true> =
  () => NonNullable<Parameters<TDB['query'][TN][Many extends true ? 'findMany' : 'findFirst']>[0]>['with']
