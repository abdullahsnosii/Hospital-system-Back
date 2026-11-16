import {z} from 'zod'
export const id=z.object({params:z.object({id:z.string().regex(/^[0-9a-fA-F]{24}$/)})})
