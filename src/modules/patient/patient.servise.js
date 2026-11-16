import { PatientModel } from '../../DB/model/patient.model.js'
import { NotFoundException } from '../../common/exceptions/index.js'

const patientFields = 'dateOfBirth gender address emergencyContact bloodType allergies chronicConditions'
const userFields = 'fullName email phone'

export const profile = async (userId) => {
    const patient = await PatientModel.findOne({ userId })
        .select(patientFields)
        .populate('userId', userFields)
    if (!patient) throw NotFoundException('Patient profile not found')
    return patient
}

export const updateProfile = async (userId, inputs) => {
    // Update nested emergency-contact fields independently so a partial update
    // (for example, changing only the phone) does not erase the saved name.
    const updates = { ...inputs }
    if (inputs.emergencyContact) {
        delete updates.emergencyContact
        for (const [key, value] of Object.entries(inputs.emergencyContact)) {
            updates[`emergencyContact.${key}`] = value
        }
    }
    const patient = await PatientModel.findOneAndUpdate(
        { userId },
        { $set: updates },
        { new: true, runValidators: true }
    ).select(patientFields).populate('userId', userFields)
    if (!patient) throw NotFoundException('Patient profile not found')
    return patient
}
