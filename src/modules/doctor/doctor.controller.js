import { Router } from 'express'
import { RoleEnum } from '../../common/enum/user.enum.js'
import { successResponse } from '../../common/utils/index.js'
import { authentication, authorization, validation } from '../../middleware/index.js'
import * as validators from './doctor.validation.js'
import { getDoctorById, getMyDoctorProfile, list, updateMyDoctorProfile } from './doctor.servise.js'

const router = Router()

// Public doctor directory used by patients to discover doctors.
router.get('/', validation(validators.listDoctors), async (req, res) => {
    const data = await list(req.validate.query)
    return successResponse(res, data, 'Doctors listed successfully', 200)
})

router.get('/profile', authentication, authorization(RoleEnum.DOCTOR), async (req, res) => {
    const data = await getMyDoctorProfile(req.user._id)
    return successResponse(res, data, 'Doctor profile retrieved successfully', 200)
})

router.patch('/profile', authentication, authorization(RoleEnum.DOCTOR), validation(validators.updateProfile), async (req, res) => {
    const data = await updateMyDoctorProfile(req.user._id, req.validate.body)
    return successResponse(res, data, 'Doctor profile updated successfully', 200)
})

router.get('/:id', validation(validators.doctorId), async (req, res) => {
    const data = await getDoctorById(req.validate.params.id)
    return successResponse(res, data, 'Doctor retrieved successfully', 200)
})

export default router
