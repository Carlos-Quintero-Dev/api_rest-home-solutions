import { Response } from "express";
import { CustomError } from "./custom.error";

export class HandleError{

    static error( error: unknown, res: Response ):void{
        if( error instanceof CustomError ){
            res.status( error.statusCode ).json({error: error.message, statusCode: error.statusCode});
            return;
        }

        res.status(500).json({error: "Internal server error"});
        return;
    }
}