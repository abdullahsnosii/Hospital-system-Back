import { resolve } from 'node:path'
import { config } from 'dotenv'

export const NODE_ENV = process.env.NODE_ENV ?? 'development'
config({ path: resolve(`.env.${NODE_ENV}`) })

const required = (name) => {
    const value = process.env[name]
    if (!value) throw new Error(`Missing environment variable: ${name}`)
    return value
}

export const PORT = parseInt(process.env.PORT ?? '3000')

export const DB_URI = required('DB_URI')
export const DB_NAME = process.env.DB_NAME // optional

export const ACCESS_TOKEN_SECRET = required('ACCESS_TOKEN_SECRET')
export const ACCESS_TOKEN_EXPIRES_IN = parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN ?? '86400') // seconds (1 day)

export const ACCESS_CODE_SECRET = required('ACCESS_CODE_SECRET') // used to hash the doctor/receptionist/lab/admin codes

export const ORIGINS = (process.env.ORIGINS ?? '').split(',').map(o => o.trim()).filter(Boolean)
export const TRUST_PROXY = parseInt(process.env.TRUST_PROXY ?? '0') // 0 locally, 1 behind one proxy (nginx / render ...)
