import mongoose from 'mongoose';
import { RoleEnum } from '../../common/enum/user.enum.js';

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true, minlength: 3, maxlength: 60 },
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true }, // optional for walk-in patients
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(RoleEnum), default: RoleEnum.PATIENT, required: true },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password
            delete ret.__v
            return ret
        }
    }
})

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema)
