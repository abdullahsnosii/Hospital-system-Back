import mongoose from 'mongoose'
import { DoctorModel } from '../../DB/model/doctor.model.js'
import { UserModel } from '../../DB/model/user.model.js'
import { NotFoundException, BadRequestException } from '../../common/exceptions/index.js'

const doctorPublicFields = 'userId departmentId specialty consultationFee bio yearsOfExperience'
const userPublicFields = 'fullName'

export const list = async ({ search, departmentId } = {}) => {
    const activeDoctorIds = await UserModel.find({ role: 'doctor', isActive: true }).distinct('_id')
    const filter = { userId: { $in: activeDoctorIds } }
    if (search) {
        const matchingUsers = await UserModel.find({ fullName: { $regex: search, $options: 'i' }, role: 'doctor', isActive: true }).distinct('_id')
        filter.$or = [
            { specialty: { $regex: search, $options: 'i' } },
            { userId: { $in: matchingUsers } },
        ]
    }
    if (departmentId) {
        if (!mongoose.isValidObjectId(departmentId)) throw BadRequestException('Invalid department ID')
        filter.departmentId = departmentId
    }
    return DoctorModel.find(filter)
        .select(doctorPublicFields)
        .populate('userId', userPublicFields)
        .populate('departmentId', 'name')
        .sort({ createdAt: -1 })
}

export const getDoctorById = async (id) => {
    if (!mongoose.isValidObjectId(id)) throw BadRequestException('Invalid doctor ID')
    const activeDoctorIds = await UserModel.find({ role: 'doctor', isActive: true }).distinct('_id')
    const doctor = await DoctorModel.findOne({ _id: id, userId: { $in: activeDoctorIds } })
        .select(doctorPublicFields)
        .populate('userId', userPublicFields)
        .populate('departmentId', 'name')
    if (!doctor) throw NotFoundException('Doctor not found')
    return doctor
}

export const getMyDoctorProfile = async (userId) => {
    const doctor = await DoctorModel.findOne({ userId })
        .populate('userId', userPublicFields)
        .populate('departmentId', 'name')
    if (!doctor) throw NotFoundException('Doctor profile not found')
    return doctor
}

export const updateMyDoctorProfile = async (userId, inputs) => {
    const doctor = await DoctorModel.findOneAndUpdate(
        { userId },
        { $set: inputs },
        { new: true, runValidators: true }
    ).populate('userId', userPublicFields).populate('departmentId', 'name')
    if (!doctor) throw NotFoundException('Doctor profile not found')
    return doctor
}
