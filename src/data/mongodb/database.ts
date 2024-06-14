import mongoose from "mongoose";
import { envs } from '../../config/envs';

export class mongoDB {
    /**
     * The function establishes a connection to a MongoDB database using the MONGO_URL and
     * MONGO_DB_NAME from environment variables.
     * @returns The `connection` function is returning a boolean value `true` if the MongoDB connection
     * is successful.
     */
    static async connection(){
        try {
            await mongoose.connect( envs.MONGO_URL , {dbName:envs.MONGO_DB_NAME} )

            console.log('mongo connection');
            return true;

        } catch (error) {
            console.log(error);
            throw Error(`${error}`)
        }
    }
}