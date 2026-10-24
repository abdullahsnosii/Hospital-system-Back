import { z } from 'zod'
import { RoleEnum } from './enum/user.enum.js'
import { GenderEnum } from './enum/patient.enum.js'

export const generalFields = {
    fullName: z.string().trim().min(3, 'Full name must be at least 3 characters').max(60, 'Full name must not exceed 60 characters'),
    email: z.string().trim().toLowerCase().pipe(z.email('Invalid email format')),
    phone: z.string().trim().regex(/^\+?[0-9]{8,15}$/, 'Invalid phone number'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(64, 'Password must not exceed 64 characters')
        .regex(/[a-z]/, 'Password must contain a lowercase letter')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter')
        .regex(/[0-9]/, 'Password must contain a number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
    role: z.enum(Object.values(RoleEnum), 'Invalid role'),
    code: z.string().trim().min(4).max(64),
    gender: z.number().int().refine(v => Object.values(GenderEnum).includes(v), 'Invalid gender'),
    dateOfBirth: z.coerce.date().refine(d => d <= new Date(), 'Date of birth cannot be in the future'),
}
