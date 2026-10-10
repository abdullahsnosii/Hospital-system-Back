
import { ObjectId } from "mongodb";

// products,cretedby => userId 
export const list = async () =>{
    const products = await doctorModel.aggregate(
        [{
          $lookup: {
            as : "owner" ,
            localField : "createdby" ,
            from : "users" ,
            foreignField : "_id"

          }

    }]


    ).toArray()
    return products
}
export const create = async ({ title , price , quantity , createdby }) => {
 const product = await productModel.insertOne({ 
    title ,
    price ,
    quantity ,
    createdby: ObjectId.createFromHexString(createdby) 
})
  return product   
}