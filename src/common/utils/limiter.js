import { rateLimit } from 'express-rate-limit'
import { TooManyRequestsException } from '../exceptions/index.js'

// in-memory store: كفاية للـ development. لو شغّلت أكتر من instance (pm2 cluster) نحط Redis.
export const generateLimiter = ({ windowMinutes = 15, limit = 100, skipSuccessfulRequests = false } = {}) =>
    rateLimit({
        windowMs: windowMinutes * 60 * 1000,
        limit,
        standardHeaders: 'draft-7',
        legacyHeaders: false,
        skipSuccessfulRequests,
        handler: (req, res, next) => next(TooManyRequestsException('Too many requests, please try again later'))
    })
