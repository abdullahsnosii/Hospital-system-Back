import { Router } from 'express'
import { RoleEnum } from '../../common/enum/user.enum.js'
import { successResponse } from '../../common/utils/index.js'
import { authentication, authorization, validation } from '../../middleware/index.js'
import { getAvailableSlots, getMySchedule, saveMySchedule } from './schedule.servise.js'
import * as v from './schedule.validation.js'
const router = Router()
router.get('/doctors/:doctorId/available', validation(v.availableSlots), async (req,res) => successResponse(res, await getAvailableSlots(req.validate.params.doctorId, req.validate.query.date), 'Available slots retrieved', 200))
router.get('/me', authentication, authorization(RoleEnum.DOCTOR), async (req,res) => successResponse(res, await getMySchedule(req.user._id), 'Schedule retrieved', 200))
router.put('/me', authentication, authorization(RoleEnum.DOCTOR), validation(v.saveSchedule), async (req,res) => successResponse(res, await saveMySchedule(req.user._id, req.validate.body), 'Schedule saved', 200))
export default router
