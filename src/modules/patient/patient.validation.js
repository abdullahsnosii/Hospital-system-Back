import { z } from 'zod'
import { GenderEnum } from '../../common/enum/patient.enum.js'

export const updateProfile = z.object({
    body: z.strictObject({
        dateOfBirth: z.coerce.date().refine(date => date <= new Date(), 'Date of birth cannot be in the future').optional(),
        gender: z.number().int().refine(value => Object.values(GenderEnum).includes(value), 'Invalid gender').optional(),
        address: z.string().trim().max(300).optional(),
        emergencyContact: z.object({
            name: z.string().trim().min(2).max(100).optional(),
            phone: z.string().trim().regex(/^\+?[0-9]{8,15}$/).optional(),
        }).strict().optional(),
        bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
        allergies: z.array(z.string().trim().min(1).max(100)).max(50).optional(),
        chronicConditions: z.array(z.string().trim().min(1).max(100)).max(50).optional(),
    }).refine(data => Object.keys(data).length > 0, 'At least one field is required'),
})
