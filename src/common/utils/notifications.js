import { NotificationModel } from '../../DB/model/notification.model.js'
export const notify = (userId, type, title, message, relatedId) => NotificationModel.create({ userId, type, title, message, relatedId })
