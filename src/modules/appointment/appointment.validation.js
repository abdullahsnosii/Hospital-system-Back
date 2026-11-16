import { z } from 'zod'
export const book = z.object({ body: z.object({ doctorId: z.string().regex(/^[0-9a-fA-F]{24}$/), startAt: z.string().datetime(), reason: z.string().trim().max(500).optional() }) })
export const id = z.object({ params: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/) }) })
export const status = z.object({ params: z.object({ id: z.string().regex(/^[0-9a-fA-F]{24}$/) }), body: z.object({ status: z.enum(['confirmed','completed','no_show','cancelled']) }) })
