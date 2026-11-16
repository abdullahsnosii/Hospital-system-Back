import {Router} from 'express'
import {RoleEnum} from '../../common/enum/user.enum.js'
import {successResponse} from '../../common/utils/index.js'
import {authentication,authorization,validation} from '../../middleware/index.js'
import * as s from './medical-history.servise.js'
import * as v from './medical-history.validation.js'
const router=Router()
router.get('/mine',authentication,authorization(RoleEnum.PATIENT),async(req,res)=>successResponse(res,await s.getMyHistory(req.user._id),'Medical history retrieved'))
router.get('/patient/:patientId',authentication,authorization(RoleEnum.DOCTOR),validation(v.patientId),async(req,res)=>successResponse(res,await s.getPatientHistory(req.user._id,req.validate.params.patientId),'Patient medical history retrieved'))
router.post('/',authentication,authorization(RoleEnum.DOCTOR),validation(v.add),async(req,res)=>successResponse(res,await s.addMedicalNote(req.user._id,req.validate.body),'Medical note added',201))
export default router
