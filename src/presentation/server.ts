import express from "express";
import { AppRoute } from "./routes";
import { envs } from "../config/envs";
import cors from 'cors'

 //white list
 const whiteList = ['http://localhost:5173'] 


export class Server{
/* This code snippet is defining a class called `Server` in TypeScript. Inside the class, there is a
private property `app` which is initialized with an instance of the Express framework. */
    private app = express();

    start(){
        // middlewares
        this.app.use(cors({
            origin: whiteList
        }))
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true }) )

        this.app.use(AppRoute.route)

        //listener
        this.app.listen(envs.PORT, () => {
            console.log(`server running on port ${envs.PORT}`);
        })
    }
}