import mongoose from "mongoose"


/* The Validators class in TypeScript contains a static method for validating MongoDB ObjectIds. */
export class Validators{
    static validationMongoId(id:string){
        const validator = mongoose.Types.ObjectId.isValid(id)
        if(validator) return true
    }
}