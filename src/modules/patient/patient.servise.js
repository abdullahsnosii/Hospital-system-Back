
import { ObjectId } from 'mongodb';


export const list = async ({page = 1, limit = 5}) => {
    page = Math.floor(page < 1 ? 1 : page)
    limit = Math.floor(limit <1 ? 5 : limit)
    const skip = (page - 1) * limit
    const total = await patientModel.countDocuments({},{ projection: { password: 0 } })
    const accounts = await patientModel.find({},{ projection: { password: 0 } }).sort({ gender: 1 }).skip(skip).limit(limit).toArray()
    const pages = Math.ceil(total / limit)
    return {total , page, limit, pages, accounts}
}
export const profile = async ({ userId }) => {
    const account = await patientModel.findOne(
        { _id: ObjectId.createFromHexString(userId) },
        {
            projection: {
                password: 0
            }``
        }

    )
    if (!account) {
        throw new Error('Invalid userId', { cause: { status: 404 } })
    }
    return account
}

export const updateProfile = async ({ userId }, inputs) => {
    const account = await userModel.updateOne(
        { _id: ObjectId.createFromHexString(userId) },
        {
            $set: inputs
        }
    )
    if (!account.matchedCount) {
        throw new Error('Invalid userId', { cause: { status: 404 } })
    }
    return account
}


export const deleteProfile = async ({ userId }) => {
    const account = await userModel.deleteOne(
        { _id: ObjectId.createFromHexString(userId) },
    )
    if (!account.deletedCount) {
        throw new Error('Invalid userId', { cause: { status: 404 } })
    }
    return account
} 