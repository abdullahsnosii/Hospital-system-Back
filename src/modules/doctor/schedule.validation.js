import { z } from 'zod'
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)
export const saveSchedule = z.object({ body: z.object({ weeklyHours: z.array(z.object({ dayOfWeek: z.number().int().min(0).max(6), startTime: time, endTime: time })).max(7), slotDurationMinutes: z.number().int().min(10).max(120).default(30) }) })
export const availableSlots = z.object({ query: z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }), params: z.object({ doctorId: z.string().regex(/^[0-9a-fA-F]{24}$/) }) })
