import mongoose from 'mongoose'
import { MedicalHistoryModel } from '../../DB/model/medicalhistory.model.js'
import { PatientModel } from '../../DB/model/patient.model.js'
import { DoctorModel } from '../../DB/model/doctor.model.js'
import { AppointmentModel } from '../../DB/model/appointment.model.js'
import { NotFoundException, BadRequestException, ForbiddenException } from '../../common/exceptions/index.js'
import { notify } from '../../common/utils/notifications.js'
import { NotificationType } from '../../common/enum/notification.enum.js'
export const getMyHistory=async userId=>{const p=await PatientModel.findOne({userId});if(!p)throw NotFoundException('Patient profile not found');return MedicalHistoryModel.find({patientId:p._id}).populate('doctorId').sort({createdAt:-1})}
export const getPatientHistory=async (userId,patientId)=>{if(!mongoose.isValidObjectId(patientId))throw BadRequestException('Invalid patient ID');const d=await DoctorModel.findOne({userId});if(!d)throw NotFoundException('Doctor profile not found');const links=await AppointmentModel.exists({doctorId:d._id,patientId});if(!links)throw ForbiddenException('You can only access records of your own patients');return MedicalHistoryModel.find({patientId}).sort({createdAt:-1})}
export const addMedicalNote=async(userId,input)=>{const d=await DoctorModel.findOne({userId});if(!d)throw NotFoundException('Doctor profile not found');const p=await PatientModel.findById(input.patientId);if(!p)throw NotFoundException('Patient not found');if(input.appointmentId){const a=await AppointmentModel.findOne({_id:input.appointmentId,doctorId:d._id,patientId:p._id});if(!a)throw ForbiddenException('Appointment does not match this doctor and patient')}else{const linked=await AppointmentModel.exists({doctorId:d._id,patientId:p._id});if(!linked)throw ForbiddenException('You can only add notes for your own patients')}const note=await MedicalHistoryModel.create({...input,doctorId:d._id});await notify(p.userId,NotificationType.MEDICAL_NOTE_ADDED,'Medical record updated','Your doctor added a medical record.',note._id);return note}
