import {Router} from 'express'
import {RoleEnum} from '../../common/enum/user.enum.js'
import {successResponse} from '../../common/utils/index.js'
import {authentication,authorization} from '../../middleware/index.js'
import {AppointmentModel} from '../../DB/model/appointment.model.js'
import {PatientModel} from '../../DB/model/patient.model.js'
import {DoctorModel} from '../../DB/model/doctor.model.js'
const router=Router()
router.get('/dashboard',authentication,authorization(RoleEnum.ADMIN),async(req,res)=>{const [patients,doctors,appointments]=await Promise.all([PatientModel.countDocuments(),DoctorModel.countDocuments(),AppointmentModel.countDocuments()]);return successResponse(res,{patients,doctors,appointments,todayRevenue:(Number.isFinite(Number(process.env.ADMIN_TODAY_REVENUE)) ? Number(process.env.ADMIN_TODAY_REVENUE) : 0),revenueIsStatic:true},'Admin dashboard retrieved')})
export default router
