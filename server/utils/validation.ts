import type { ZodSchema } from 'zod'

export const validateWithSchema = <T>(schema: ZodSchema<T>) => (data: unknown) => {
  const result = schema.safeParse(data)

  if (result.error) {
    throw result.error.format()
  }

  return result.data
}
