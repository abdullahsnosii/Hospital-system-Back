import { z } from 'zod'

export const listDoctors = z.object({
    query: z.object({
        search: z.string().trim().max(100).optional(),
        departmentId: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    }),
})

export const doctorId = z.object({
    params: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid doctor ID') }),
})

export const updateProfile = z.object({
    body: z.strictObject({
        specialty: z.string().trim().min(2).max(100).optional(),
        consultationFee: z.number().int().nonnegative().optional(),
        bio: z.string().trim().max(2000).optional(),
        yearsOfExperience: z.number().int().min(0).max(80).optional(),
    }).refine(data => Object.keys(data).length > 0, 'At least one field is required'),
})
