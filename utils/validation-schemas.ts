import { z } from 'zod'

const RequiredMessage = (field: string) => `${field} is required`
const MinLengthMessage = (field: string, length: number) => `${field} must have at least ${length} characters`

export const RegisterPayloadSchema = z.object({
  username: z.string().trim().min(3, { message: MinLengthMessage('Username', 3) }),
  password: z.string().trim().min(8, { message: MinLengthMessage('Password', 8) }),
})

export const RegisterFormSchema = z.object({
  username: z.string().trim().min(3, { message: MinLengthMessage('Username', 3) }),
  password: z.string().trim().min(8, { message: MinLengthMessage('Password', 8) }),
  passwordConfirm: z.string().trim().min(8, { message: MinLengthMessage('Password', 8) }),
})

export const LoginPayloadSchema = z.object({
  username: z.string().trim().min(3, { message: MinLengthMessage('Username', 3) }),
  password: z.string().trim().min(8, { message: MinLengthMessage('Password', 8) }),
})

export const LoginFormSchema = z.object({
  username: z.string().trim().min(3, { message: MinLengthMessage('Username', 3) }),
  password: z.string().trim().min(8, { message: MinLengthMessage('Password', 8) }),
})

export const DeskCreatePayloadSchema = z.object({
  label: z.string().trim().min(1, { message: RequiredMessage('Desk Label') }),
})

export const DesksCreatePayloadSchema = z.union([
  DeskCreatePayloadSchema,
  z.array(DeskCreatePayloadSchema),
])

export const DeskUpdatePayloadSchema = DeskCreatePayloadSchema.partial()

export const DesksQueryParamsSchema = z.object({
  start: z.string().date(),
  end: z.string().date(),
}).partial()

export const BookingCreatePayloadSchema = z.object({
  deskId: z.string(),
  createdBy: z.string(),
  bookedDate: z.coerce.date(),
})

export const BookingsCreatePayloadSchema = z.union([
  BookingCreatePayloadSchema,
  z.array(BookingCreatePayloadSchema),
])

export const BookingUpdatePayloadSchema = BookingCreatePayloadSchema.partial()

export const BookingsQueryParamsSchema = z.object({
  start: z.string().date(),
  end: z.string().date(),
  include: z.array(z.enum(['user', 'desk'])),
}).partial()
