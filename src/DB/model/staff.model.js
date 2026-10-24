import mongoose from 'mongoose';

// receptionist and lab only (admin doesn't need a Staff document)
const staffSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    employeeId: { type: String, unique: true, sparse: true },
    jobTitle: String, // Receptionist, Lab Technician, Lab Doctor, ...
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    hireDate: Date,
}, { timestamps: true })

export const StaffModel = mongoose.models.Staff || mongoose.model('Staff', staffSchema)
