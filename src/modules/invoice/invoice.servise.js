import {InvoiceModel} from '../../DB/model/invoice.model.js'
import {PatientModel} from '../../DB/model/patient.model.js'
import {NotFoundException,BadRequestException} from '../../common/exceptions/index.js'
import {InvoiceStatus} from '../../common/enum/invoice.enum.js'
import {notify} from '../../common/utils/notifications.js'
import {NotificationType} from '../../common/enum/notification.enum.js'
export const myInvoices=async userId=>{const p=await PatientModel.findOne({userId});if(!p)throw NotFoundException('Patient profile not found');return InvoiceModel.find({patientId:p._id}).populate('appointmentId').sort({createdAt:-1})}
export const allInvoices=async()=>InvoiceModel.find().populate('patientId').populate('doctorId').populate('appointmentId').sort({createdAt:-1})
export const markPaid=async id=>{const i=await InvoiceModel.findById(id);if(!i)throw NotFoundException('Invoice not found');if(i.status!==InvoiceStatus.UNPAID)throw BadRequestException('Only unpaid invoices can be marked as paid');i.status=InvoiceStatus.PAID;i.paidAt=new Date();await i.save();const p=await PatientModel.findById(i.patientId);if(p)await notify(p.userId,NotificationType.INVOICE_PAID,'Invoice paid','Your invoice has been marked as paid.',i._id);return i}
