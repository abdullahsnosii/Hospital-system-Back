import { z } from 'zod'

export const listDepartments = z.object({
    query: z.object({ search: z.string().trim().max(100).optional() }),
})

export const getDepartment = z.object({
    params: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid department ID') }),
})
