import mongoose from 'mongoose';

// departmentId / specialty / licenseNumber بتتملّى بعد التسجيل (من البروفايل أو من الـ admin)
const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', index: true }, // one department only
    specialty: { type: String, index: true },
    licenseNumber: { type: String, unique: true, sparse: true },
    consultationFee: { type: Number, min: 0 }, // piastres (integer)
    bio: String,
    yearsOfExperience: Number,
}, { timestamps: true })

export const DoctorModel = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema)
