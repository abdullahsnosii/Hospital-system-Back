import { BadRequestException } from '../common/exceptions/index.js'

// schema = z.object({ body: ..., query: ..., params: ... })
export const validation = (schema) => (req, res, next) => {
    const result = schema.safeParse({ body: req.body ?? {}, query: req.query, params: req.params })
    if (!result.success) {
        throw BadRequestException('Validation error', result.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })))
    }
    req.validate = result.data // استخدم req.validate.body في الـ controller
    next()
}
