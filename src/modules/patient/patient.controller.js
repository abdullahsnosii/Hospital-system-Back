import {Router} from 'express';
import {successResponse} from '../../common/utils/index.js';
import { profile ,updateProfile ,deleteProfile,list} from './patient.servise.js';
 const router = Router();

 router.get('/', async (req, res, next) => {
   const data = await list(req.query)
   return successResponse(res, data, "Patients listed successfully", 200)
 })

 router.get('/:userId',async (req, res, next) => {
  const data = await profile(req.params.userid)
  return successResponse(res, data, "Patient profile retrieved successfully", 200)
})

router.patch('/:userId', async (req, res, next) => {
    const data = await updateProfile(req.params, req.body)
    return successResponse(res, data, "Patient profile updated successfully", 200)
})

router.delete('/:userId', async (req, res, next) => {
    const data = await deleteProfile(req.params)
    return successResponse(res, data, "Patient profile deleted successfully", 200)
})
 
export default router