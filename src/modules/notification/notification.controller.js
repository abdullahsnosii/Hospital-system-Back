import {Router} from 'express'
import {NotificationModel} from '../../DB/model/notification.model.js'
import {successResponse} from '../../common/utils/index.js'
import {authentication} from '../../middleware/index.js'
import {NotFoundException} from '../../common/exceptions/index.js'
const router=Router()
router.use(authentication)
router.get('/',async(req,res)=>successResponse(res,await NotificationModel.find({userId:req.user._id}).sort({createdAt:-1}).limit(100),'Notifications retrieved'))
router.patch('/:id/read',async(req,res)=>{const n=await NotificationModel.findOneAndUpdate({_id:req.params.id,userId:req.user._id},{$set:{isRead:true}},{new:true});if(!n)throw NotFoundException('Notification not found');return successResponse(res,n,'Notification marked as read')})
router.patch('/read-all',async(req,res)=>{const result=await NotificationModel.updateMany({userId:req.user._id,isRead:false},{$set:{isRead:true}});return successResponse(res,{updated:result.modifiedCount},'Notifications marked as read')})
export default router
