// how can create schima and model in mongoose
import mongoose from 'mongoose';
import { GenderEnum } from '../../common/enum/patient.enum.js';
const patientSchema = new mongoose.Schema({                        // fildes
    firstname: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        maxlength: [30, "First name cannot exceed 30 characters"],
        validate: {
            validator: function (value) {
                console.log(value) 
                if (value == "admain") {
                    return false
                }
                return true
            },
            message: function (props) {
                console.log(props)
                return `${props.value} is not a valid first name`

            }
        }
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, "Last name must be at least 3 characters long"],
            maxlength: [30, "Last name cannot exceed 30 characters"]
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        DOB: { type: Date },
        confirmEmailAt: { type: Date },
        gender: {
            type: Number,
            enum: [Object.values(GenderEnum)],  //object.بترجع array  .مش محتاج اعمل ... عشان هي جايه array 
            default: GenderEnum.male
        },
        salary: { type: Number, },
    }, {                                                          // options 
    collection: "ShopApp_users", // specify the collection
     validateBeforeSave: true, // stop validate لو false
    timestamps: true, // add createdAt and updatedAt fields
    autoIndex: true, // automatically create indexes 
})
// // const userSchema2 = new mongoose.Schema({                        // fildes
//     firstname: {
//         type: String
//     },
//     lastname: {
//         type: String,
//         required: true,
//         minlength: 3,
//         maxlength: 30
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     DOB: { type: Date },
//     confirmEmailAt: { type: Date },
//     gender: {
//         type:Number,
//         enum: [Object.values(GenderEnum)],  //object.بترجع array  .مش محتاج اعمل ... عشان هي جايه array 
//         default: GenderEnum.male
//     },
//     salary: { type: Number,},
// //}, {                                                          // options 
//     collection: "ShopApp_users", // specify the collection
//     timestamps: true, // add createdAt and updatedAt fields
//     autoIndex: true, // automatically create indexes 
// // })


export const PatientModel = mongoose.models.Patient || mongoose.model('Patient', patientSchema  ) //create model , بحط user مفرد وبيعمل collection بالجمع users

