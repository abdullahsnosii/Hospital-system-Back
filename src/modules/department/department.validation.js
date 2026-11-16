
import { z } from 'zod';

export const getDepartments = z.object({
    query: z.object({
        search: z.string().trim().optional()
    })
});

export const getDepartmentById = z.object({
    params: z.object({
        id: z.string().regex(
            /^[0-9a-fA-F]{24}$/,
            'Invalid department ID'
        )
    })
});
