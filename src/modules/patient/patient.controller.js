import { Router } from 'express'
import { RoleEnum } from '../../common/enum/user.enum.js'
import { successResponse } from '../../common/utils/index.js'
import { authentication, authorization, validation } from '../../middleware/index.js'
import { profile, updateProfile } from './patient.servise.js'
import * as validators from './patient.validation.js'

const router = Router()
router.use(authentication, authorization(RoleEnum.PATIENT))

router.get('/profile', async (req, res) => {
    const data = await profile(req.user._id)
    return successResponse(res, data, 'Patient profile retrieved successfully', 200)
})

router.patch('/profile', validation(validators.updateProfile), async (req, res) => {
    const data = await updateProfile(req.user._id, req.validate.body)
    return successResponse(res, data, 'Patient profile updated successfully', 200)
})

export default router
