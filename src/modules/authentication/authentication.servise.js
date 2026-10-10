import { PatientModel } from '../../DB/model/patient.model.js'
import { mongoose } from "mongoose"
export const signup = async ({ firstname, lastname, email, password, DOB, gender, salary }) => {

    const patient = await PatientModel.create(
        
        [{ firstname, lastname, email, password, DOB, gender, salary }],//  لازم احط   filds ف array عشان options تشتغل
        {
            validateBeforeSave: false,
            ordered: true, //  عشان لو في غلط يبقا اقف عند غلط و ميكملش حته لو الي بعده صح 
            timestamps: true, // add createdAt and updatedAt fields
        })



















    // const session = await mongoose.startSession() 
    // session.startTransaction()
    // try {
    //     const user = await UserModel.create(
    //         inputs.users,

    //         {
    //             validateBeforeSave: false,
    //             ordered: true, //  عشان لو في غلط يبقا اقف عند غلط و ميكملش حته لو الي بعده صح 
    //             session
    //         })
    //     await session.commitTransaction()
    //     return user
    // }
    // catch (error) {
    //     await session.abortTransaction()
    //     await session.endSession()
    //     throw error
    // }
}


export const login = async ({ email, password }) => {

    return account
}