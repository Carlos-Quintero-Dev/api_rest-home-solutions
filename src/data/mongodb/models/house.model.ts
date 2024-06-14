import mongoose from "mongoose";


/* This code snippet is defining a Mongoose schema for a house model. Each property of the schema
corresponds to a field in the house document. Here's a breakdown of what each property represents: */
const houseSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'name Is Required']
    },
    price: {
        type:String,
        required:[true, 'price is required']
    },
    address:{
        type:String,
    },
    services:{
        type:String
    },
    description:{
        type:String
    },
    img:{
        type:String,
    }
})

export const HouseModel = mongoose.model('house',houseSchema)