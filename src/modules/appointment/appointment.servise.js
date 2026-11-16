import mongoose from 'mongoose'
import { AppointmentModel } from '../../DB/model/appointment.model.js'
import { PatientModel } from '../../DB/model/patient.model.js'
import { DoctorModel } from '../../DB/model/doctor.model.js'
import { InvoiceModel } from '../../DB/model/invoice.model.js'
import { AppointmentStatus } from '../../common/enum/appointment.enum.js'
import { NotificationType } from '../../common/enum/notification.enum.js'
import { InvoiceStatus } from '../../common/enum/invoice.enum.js'
import { BadRequestException, ConflictException, NotFoundException, ForbiddenException } from '../../common/exceptions/index.js'
import { notify } from '../../common/utils/notifications.js'
const populate = q => q.populate({ path:'patientId', populate:{ path:'userId', select:'fullName phone' } }).populate({ path:'doctorId', populate:{ path:'userId', select:'fullName' } })
export const bookAppointment = async (userId, { doctorId, startAt, reason }) => {
 const patient = await PatientModel.findOne({ userId }); if (!patient) throw NotFoundException('Patient profile not found')
 if (!mongoose.isValidObjectId(doctorId)) throw BadRequestException('Invalid doctor ID')
 const doctor = await DoctorModel.findById(doctorId).populate('userId','fullName isActive'); if (!doctor || !doctor.userId?.isActive) throw NotFoundException('Doctor not found')
 const start = new Date(startAt); if (Number.isNaN(start.getTime()) || start <= new Date()) throw BadRequestException('Appointment must be in the future')
 const schedule = await (await import('../../DB/model/schedule.model.js')).ScheduleModel.findOne({ doctorId })
 if (!schedule) throw BadRequestException('Doctor has not configured a schedule')
 const available = await (await import('../doctor/schedule.servise.js')).getAvailableSlots(doctorId, start.toISOString().slice(0,10))
 const slot = available.find(x => x.startAt.getTime() === start.getTime()); if (!slot) throw ConflictException('Selected time slot is not available')
 let appointment
 try { appointment = await AppointmentModel.create({ patientId: patient._id, doctorId, startAt: slot.startAt, endAt: slot.endAt, reason }) } catch (e) { if (e.code === 11000) throw ConflictException('Selected time slot has already been booked'); throw e }
 await notify(userId, NotificationType.APPOINTMENT_BOOKED, 'Appointment booked', 'Your appointment has been booked.', appointment._id)
 await notify(doctor.userId._id, NotificationType.APPOINTMENT_BOOKED, 'New appointment', 'A patient booked an appointment.', appointment._id)
 return populate(AppointmentModel.findById(appointment._id))
}
export const listMyAppointments = async userId => { const p=await PatientModel.findOne({userId}); if(!p) throw NotFoundException('Patient profile not found'); return populate(AppointmentModel.find({patientId:p._id}).sort({startAt:-1})) }
export const listDoctorAppointments = async userId => { const d=await DoctorModel.findOne({userId}); if(!d) throw NotFoundException('Doctor profile not found'); return populate(AppointmentModel.find({doctorId:d._id}).sort({startAt:1})) }
export const listAllAppointments = async () => populate(AppointmentModel.find().sort({startAt:-1}))
export const cancelAppointment = async (userId, id) => { const p=await PatientModel.findOne({userId}); if(!p) throw NotFoundException('Patient profile not found'); const a=await AppointmentModel.findOne({_id:id,patientId:p._id}); if(!a) throw NotFoundException('Appointment not found'); if(![AppointmentStatus.BOOKED,AppointmentStatus.CONFIRMED].includes(a.status)) throw BadRequestException('Only active appointments can be cancelled'); if(a.startAt <= new Date()) throw BadRequestException('Past appointments cannot be cancelled'); a.status=AppointmentStatus.CANCELLED; await a.save(); const d=await DoctorModel.findById(a.doctorId); if(d) await notify(d.userId,NotificationType.APPOINTMENT_CANCELLED,'Appointment cancelled','A patient cancelled an appointment.',a._id); await notify(userId,NotificationType.APPOINTMENT_CANCELLED,'Appointment cancelled','Your appointment was cancelled.',a._id); return a }
export const updateAppointmentStatus = async (userId, role, id, status) => {
 const a=await AppointmentModel.findById(id); if(!a) throw NotFoundException('Appointment not found')
 if(role==='doctor'){ const d=await DoctorModel.findOne({userId}); if(!d || !d._id.equals(a.doctorId)) throw ForbiddenException('This appointment does not belong to you') }
 if(!['confirmed','completed','no_show','cancelled'].includes(status)) throw BadRequestException('Invalid appointment status')
 if([AppointmentStatus.CANCELLED, AppointmentStatus.COMPLETED, AppointmentStatus.NO_SHOW].includes(a.status)) throw BadRequestException('This appointment is already in a final status')
 if(status==='confirmed' && a.status!==AppointmentStatus.BOOKED) throw BadRequestException('Only booked appointments can be confirmed')
 a.status=status; await a.save()
 if(status===AppointmentStatus.COMPLETED){ const d=await DoctorModel.findById(a.doctorId); const fee=d?.consultationFee ?? 0; const invoice=await InvoiceModel.findOneAndUpdate({appointmentId:a._id},{$setOnInsert:{appointmentId:a._id,patientId:a.patientId,doctorId:a.doctorId,amount:fee,status:InvoiceStatus.UNPAID,currency:'EGP'}},{upsert:true,new:true}); const p=await PatientModel.findById(a.patientId); if(p) await notify(p.userId,NotificationType.INVOICE_CREATED,'Invoice created','An invoice was created for your completed appointment.',invoice._id) }
 const p=await PatientModel.findById(a.patientId); if(p) await notify(p.userId,NotificationType.APPOINTMENT_UPDATED,'Appointment updated',`Your appointment status is now ${status}.`,a._id)
 return a
}
