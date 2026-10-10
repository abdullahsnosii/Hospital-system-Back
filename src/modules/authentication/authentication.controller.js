import {Router} from 'express';
import {signup} from './authentication.servise.js';
import {login} from './authentication.servise.js';
import {successResponse} from '../../common/utils/index.js';
const router = Router();

router.post("/signup", async (req, res, next) => {
    const data =await signup(req.body)
    return successResponse(res, data,  "Patient created successfully",  201 )
}
)
 router.post("/login", async (req, res, next) => {
    const data =await login(req.body)
    return successResponse(res, data, "Login successful"  ,200)
 }
 )



export default router