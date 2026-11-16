import {Router} from 'express'
import {RoleEnum} from '../../common/enum/user.enum.js'
import {successResponse} from '../../common/utils/index.js'
import {authentication,authorization,validation} from '../../middleware/index.js'
import * as s from './invoice.servise.js'
import * as v from './invoice.validation.js'
const router=Router()
router.get('/mine',authentication,authorization(RoleEnum.PATIENT),async(req,res)=>successResponse(res,await s.myInvoices(req.user._id),'Invoices retrieved'))
router.get('/',authentication,authorization(RoleEnum.ADMIN,RoleEnum.RECEPTIONIST),async(req,res)=>successResponse(res,await s.allInvoices(),'Invoices retrieved'))
router.patch('/:id/pay',authentication,authorization(RoleEnum.ADMIN,RoleEnum.RECEPTIONIST),validation(v.id),async(req,res)=>successResponse(res,await s.markPaid(req.validate.params.id),'Invoice marked as paid'))
export default router
