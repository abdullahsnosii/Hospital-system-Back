import { createHmac } from 'node:crypto'
import { ACCESS_CODE_SECRET } from '../../config.js'

// hash ثابت (HMAC) عشان ندوّر على الكود في الداتابيس بـ query واحدة
export const hashAccessCode = (code) => createHmac('sha256', ACCESS_CODE_SECRET).update(String(code).trim()).digest('hex')
