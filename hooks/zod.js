import { z } from 'zod'
export const registerSchema = z.object({
  email: z.string().email({ message: 'Email 格式錯誤' }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message: '密碼至少需要 8 位，且包含大小寫字母',
  }),
  name: z
    .string()
    .min(2, { message: '姓名至少需要 2 個字' })
    .regex(/^[\u4e00-\u9fa5]+$/, { message: '姓名只能包含中文字' }),
  phone: z.string().regex(/^09\d{8}$/, {
    message: '手機號碼格式錯誤',
  }),
})

export const emailSchema = z.object({
  email: z.string().email({ message: 'Email 格式錯誤' }),
})

export const otpSchema = z
  .object({
    otp0: z.string().min(1, { message: '驗證碼須為五碼' }),
    otp1: z.string().min(1, { message: '驗證碼須為五碼' }),
    otp2: z.string().min(1, { message: '驗證碼須為五碼' }),
    otp3: z.string().min(1, { message: '驗證碼須為五碼' }),
    otp4: z.string().min(1, { message: '驗證碼須為五碼' }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message: '密碼至少需要 8 位，且包含大小寫字母',
    }),
    confirmPassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
      message: '密碼不一致',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '密碼不一致',
    path: ['confirmPassword'],
  })
