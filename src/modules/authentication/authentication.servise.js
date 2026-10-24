import { AccessCodeModel, DoctorModel, PatientModel, StaffModel, UserModel } from '../../DB/model/index.js'
import { RoleEnum } from '../../common/enum/user.enum.js'
import { ConflictException, ForbiddenException, UnauthorizedException } from '../../common/exceptions/index.js'
import { compare, createAccessToken, hash, hashAccessCode } from '../../common/security/index.js'

// بيعمل البروفايل الفاضي حسب الـ role (الـ admin مفيش له بروفايل)
const createProfile = async ({ userId, role, gender, dateOfBirth }) => {
    switch (role) {
        case RoleEnum.PATIENT:
            return PatientModel.create({ userId, gender, dateOfBirth })
        case RoleEnum.DOCTOR:
            return DoctorModel.create({ userId })
        case RoleEnum.RECEPTIONIST:
        case RoleEnum.LAB:
            return StaffModel.create({ userId })
        default:
            return null
    }
}

export const signup = async ({ fullName, email, phone, password, code, gender, dateOfBirth }) => {
    // 1) الـ role من الكود. من غير كود = patient
    let role = RoleEnum.PATIENT
    if (code) {
        const accessCode = await AccessCodeModel.findOne({ codeHash: hashAccessCode(code), isActive: true })
        if (!accessCode) throw ForbiddenException('Invalid access code')
        role = accessCode.role
    }

    // 2) مفيش تكرار للإيميل / التليفون
    const duplicate = await UserModel.findOne({ $or: [{ email }, { phone }] }).select('email phone')
    if (duplicate) {
        throw ConflictException(duplicate.email === email ? 'Email already exists' : 'Phone already exists')
    }

    // 3) User ثم البروفايل. لو البروفايل فشل نمسح الـ User (من غير transaction عشان يشتغل على أي MongoDB)
    const user = await UserModel.create({ fullName, email, phone, role, password: await hash(password) })
    try {
        await createProfile({ userId: user._id, role, gender, dateOfBirth })
    } catch (error) {
        await UserModel.deleteOne({ _id: user._id })
        throw error
    }

    return { user, role }
}

export const login = async ({ email, password, role }) => {
    const user = await UserModel.findOne({ email }).select('+password')

    // نفس الرسالة في كل الحالات (إيميل غلط / باسورد غلط / role غلط) عشان مفيش حد يعرف إيه الموجود
    const valid = user && user.isActive && user.role === role && await compare(password, user.password)
    if (!valid) throw UnauthorizedException('Invalid email or password')

    return { user, role: user.role, access_token: createAccessToken({ userId: user._id, role: user.role }) }
}
