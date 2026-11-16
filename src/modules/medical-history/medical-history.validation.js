import { z } from 'zod'
export const patientId=z.object({params:z.object({patientId:z.string().regex(/^[0-9a-fA-F]{24}$/)})})
export const add=z.object({body:z.object({patientId:z.string().regex(/^[0-9a-fA-F]{24}$/),appointmentId:z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),diagnosis:z.string().trim().max(500).optional(),notes:z.string().trim().min(1).max(5000),prescriptions:z.array(z.string().trim().max(500)).max(30).optional()})})
