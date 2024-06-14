import mongoose from "mongoose";
import { ROLES } from "../../../domain/enums/role.emun";


/* This code snippet is defining a Mongoose schema for a user model. Here's a breakdown of what each
property in the schema represents: */
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'name Is Required']
    },

    email: {
        type:String,
    },

    password:{
        type:String,
    },

    rol:{
        enum: Object.values(ROLES),
        type:String,
    },
    
    img:{
        type:String,
    }
})

export const UserModel = mongoose.model('user',userSchema)