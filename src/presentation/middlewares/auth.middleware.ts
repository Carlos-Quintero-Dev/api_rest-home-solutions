import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongodb/models/user.model";


export class AuthMiddleware{
    /**
     * The function `validateJwt` in TypeScript validates a JWT token from the request header and
     * checks if the user associated with the token is authorized.
     * @param {Request} req - The `req` parameter in the `validateJwt` function stands for the Request
     * object in Express.js. It represents the HTTP request and contains information about the request
     * such as the headers, parameters, body, etc.
     * @param {Response} res - The `res` parameter in the `validateJwt` function stands for the
     * response object in Express.js. It is used to send a response back to the client making the
     * request. In the provided code snippet, `res` is used to send error responses with status codes
     * and error messages if certain conditions
     * @param {NextFunction} next - The `next` parameter in the `validateJwt` function is a callback
     * function that is used to pass control to the next middleware function in the stack. When called,
     * it invokes the next middleware function in the stack. This is commonly used in Express.js
     * middleware functions to move to the next function in
     * @returns The `validateJwt` function is returning different error responses based on the
     * conditions checked in the code:
     * 1. If the `Authorization` header is missing, it returns a 400 status with an error message
     * "Bearer invalid".
     * 2. If the `Authorization` header does not start with 'Bearer ', it returns a 400 status with an
     * error message "Bearer invalid".
     * 3. If the token extracted
     */
    static async validateJwt(req:Request, res:Response, next:NextFunction){
        const authorization = req.header("Authorization");
        if(!authorization) return res.status(400).json({error:'Bearer invalid'})
        if(!authorization.startsWith('Bearer ')) return res.status(400).json({error:'Bearer invalid'})
        const token = authorization.split(' ').at(1) || "";
        if(!token) return res.status(400).json({error:'Bearer invalid'})
        
        const payload = await JwtAdapter.validateToken<{id:string}>(token);
        if(!payload || (payload === null)) return res.status(400).json({error:'payload invalid'})
        
        const user = await UserModel.findOne({_id: payload.id})
        if(!user) return res.status(400).json({error:'user not authorized'})

        req.body.user = user;
        next();
    }
}