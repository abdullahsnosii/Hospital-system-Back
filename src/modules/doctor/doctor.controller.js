import {Router} from 'express';
import {successResponse} from '../../common/utils/index.js';
import { create , list  } from './doctor.servise.js';
 const router = Router();

 router.get('/', async (req, res, next) => {
   const data = await list(req.query)
    return successResponse(res, data, "Doctors listed successfully", 200)
 })

 router.post('/', async (req, res, next) => {
   const data = await create(req.body)
    return successResponse(res, data, "Doctor created successfully", 201)
 })



 
export default router