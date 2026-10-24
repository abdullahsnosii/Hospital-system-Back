import { z } from 'zod'
import { generalFields } from '../../common/validation.js'

export const signup = z.object({
    body: z.strictObject({
        fullName: generalFields.fullName,
        email: generalFields.email,
        phone: generalFields.phone,
        password: generalFields.password,
        confirmPassword: z.string(),
        code: generalFields.code.optional(), // من غير كود = patient
        // للـ patient بس (بيتتجاهلوا لو الـ role تاني)
        gender: generalFields.gender.optional(),
        dateOfBirth: generalFields.dateOfBirth.optional(),
    }).superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({ code: 'custom', path: ['confirmPassword'], message: 'Passwords do not match' })
        }
    })
})

export const login = z.object({
    body: z.strictObject({
        email: generalFields.email,
        password: z.string().min(1, 'Password is required'),
        role: generalFields.role, // الصفحة اللي المستخدم واقف فيها (patient / doctor / receptionist / lab / admin)
    })
})
