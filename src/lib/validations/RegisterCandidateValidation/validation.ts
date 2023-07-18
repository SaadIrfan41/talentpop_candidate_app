import { z } from 'zod'

export const Create_Account_Schema = z.object({
  company_name: z
    .string()
    .trim()
    .min(2, 'Company Name must contain at least 2 character(s)')
    .max(30, 'Company Name must contain at most 30 character(s)'),
  phone_number: z
    .string()
    .trim()
    .min(10, 'PhoneNumber must contain at least 10 Digit(s)')
    .max(20, 'PhoneNumber must contain at least 30 Digit(s)')
    .regex(/^\d+$/, { message: 'Invalid Number' }),
  password: z
    .string()
    .trim()
    .min(7, 'Password must contain at least 7 character(s)')
    .max(30, 'Password must contain at most 30 character(s)'),

  // .refine(
  //   (text) => {
  //     if (text.replace(/\s/g, '').length < 7) {
  //       text.replace(/\s/g, '')
  //       return text.replace(/\s/g, '')
  //     }
  //     return true
  //   },
  //   { message: 'Password must contain at least 7 character(s)' }
  // )
  // .refine(
  //   (text) => {
  //     if (text.replace(/\s/g, '').length > 30) {
  //       return false
  //     }
  //     return true
  //   },
  //   { message: 'Password must contain at most 30 character(s)' }
  // ),
})

export type RegisterUserTypes = z.infer<typeof Create_Account_Schema>
