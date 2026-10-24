import mongoose from 'mongoose';
import { CODE_ROLES } from '../../common/enum/user.enum.js';

// كود واحد لكل role (كل الدكاترة بنفس الكود، كل الـ lab بنفس الكود ...). بيتخزن hashed.
const accessCodeSchema = new mongoose.Schema({
    role: { type: String, enum: CODE_ROLES, required: true, unique: true },
    codeHash: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

export const AccessCodeModel = mongoose.models.AccessCode || mongoose.model('AccessCode', accessCodeSchema)
