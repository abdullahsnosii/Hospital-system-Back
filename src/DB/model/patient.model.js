import mongoose from 'mongoose';
import { GenderEnum } from '../../common/enum/patient.enum.js';

const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    nationalId: { type: String, unique: true, sparse: true },
    dateOfBirth: Date,
    gender: { type: Number, enum: Object.values(GenderEnum) },
    address: String,
    emergencyContact: {
        name: String,
        phone: String
    },
    bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    allergies: [String],
    chronicConditions: [String],
}, { timestamps: true })

export const PatientModel = mongoose.models.Patient || mongoose.model('Patient', patientSchema)
