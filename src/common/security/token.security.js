import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_EXPIRES_IN, ACCESS_TOKEN_SECRET } from '../../config.js'
import { UnauthorizedException } from '../exceptions/index.js'

export const createAccessToken = ({ userId, role }) =>
    jwt.sign({ sub: userId.toString(), role }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN })

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET)
    } catch {
        throw UnauthorizedException('Invalid or expired token')
    }
}
