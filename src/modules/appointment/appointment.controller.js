import { Router } from 'express'
import { RoleEnum } from '../../common/enum/user.enum.js'
import { successResponse } from '../../common/utils/index.js'
import { authentication, authorization, validation } from '../../middleware/index.js'
import * as s from './appointment.servise.js'
import * as v from './appointment.validation.js'
const router=Router()
router.post('/',authentication,authorization(RoleEnum.PATIENT),validation(v.book),async(req,res)=>successResponse(res,await s.bookAppointment(req.user._id,req.validate.body),'Appointment booked',201))
router.get('/mine',authentication,authorization(RoleEnum.PATIENT),async(req,res)=>successResponse(res,await s.listMyAppointments(req.user._id),'Appointments retrieved'))
router.get('/doctor',authentication,authorization(RoleEnum.DOCTOR),async(req,res)=>successResponse(res,await s.listDoctorAppointments(req.user._id),'Appointments retrieved'))
router.get('/',authentication,authorization(RoleEnum.ADMIN,RoleEnum.RECEPTIONIST),async(req,res)=>successResponse(res,await s.listAllAppointments(),'Appointments retrieved'))
router.patch('/:id/status',authentication,authorization(RoleEnum.DOCTOR,RoleEnum.ADMIN,RoleEnum.RECEPTIONIST),validation(v.status),async(req,res)=>successResponse(res,await s.updateAppointmentStatus(req.user._id,req.role,req.validate.params.id,req.validate.body.status),'Appointment updated'))
router.patch('/:id/cancel',authentication,authorization(RoleEnum.PATIENT),validation(v.id),async(req,res)=>successResponse(res,await s.cancelAppointment(req.user._id,req.validate.params.id),'Appointment cancelled'))
export default router
