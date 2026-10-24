import { ForbiddenException, UnauthorizedException } from '../common/exceptions/index.js'
import { verifyAccessToken } from '../common/security/index.js'
import { UserModel } from '../DB/model/index.js'

// Authorization: Bearer <token>
export const authentication = async (req, res, next) => {
    const [scheme, token] = (req.headers.authorization ?? '').split(' ')
    if (scheme !== 'Bearer' || !token) throw UnauthorizedException('Missing bearer token')

    const payload = verifyAccessToken(token)
    const user = await UserModel.findById(payload.sub)
    if (!user || !user.isActive) throw UnauthorizedException('Account not found or disabled')

    req.user = user
    req.role = user.role // الـ role بييجي من الداتابيس مش من الـ token
    next()
}

// authorization(RoleEnum.ADMIN, RoleEnum.DOCTOR)
export const authorization = (...roles) => (req, res, next) => {
    if (!roles.includes(req.role)) throw ForbiddenException('You are not allowed to access this resource')
    next()
}
