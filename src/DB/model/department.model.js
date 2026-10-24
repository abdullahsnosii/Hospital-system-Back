import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    description: String,
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const DepartmentModel = mongoose.models.Department || mongoose.model('Department', departmentSchema)
