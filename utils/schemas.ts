import { z } from 'zod'

export const RegisterPayloadSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const RegisterFormSchema = z.object({
  username: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
})

export const LoginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const LoginPayloadSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const DeskCreatePayloadSchema = z.object({
  label: z.string(),
})

export const DesksCreatePayloadSchema = z.union([
  DeskCreatePayloadSchema,
  z.array(DeskCreatePayloadSchema),
])

export const DeskUpdatePayloadSchema = DeskCreatePayloadSchema.partial()

export const DesksQueryParamsSchema = z.object({
  start: z.string().date().optional(),
  end: z.string().date().optional(),
})
