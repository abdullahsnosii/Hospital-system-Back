import { Router } from 'express';
import { signup, login } from './authentication.servise.js';
import * as validators from './authentication.validation.js';
import { successResponse, generateLimiter } from '../../common/utils/index.js';
import { validation } from '../../middleware/index.js';
const router = Router();

router.post('/signup', generateLimiter({ limit: 20 }), validation(validators.signup), async (req, res, next) => {
    const data = await signup(req.validate.body)
    return successResponse(res, data, 'Account created successfully', 201)
})

// بيحسب بس المحاولات الفاشلة
router.post('/login', generateLimiter({ limit: 10, skipSuccessfulRequests: true }), validation(validators.login), async (req, res, next) => {
    const data = await login(req.validate.body)
    return successResponse(res, data, 'Login successful', 200)
})

export default router
