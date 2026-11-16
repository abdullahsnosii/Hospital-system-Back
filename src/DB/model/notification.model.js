import mongoose from 'mongoose'
import { NOTIFICATION_TYPES } from '../../common/enum/notification.enum.js'
const notificationSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, type: { type: String, enum: NOTIFICATION_TYPES, required: true }, title: { type: String, required: true, maxlength: 120 }, message: { type: String, required: true, maxlength: 500 }, relatedId: mongoose.Schema.Types.ObjectId, isRead: { type: Boolean, default: false } }, { timestamps: true })
export const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
