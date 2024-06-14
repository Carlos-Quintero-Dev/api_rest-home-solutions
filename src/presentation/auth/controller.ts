import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { HandleError } from "../../domain/errors/handle.error";
import {Request, Response} from "express"
import { AuthService } from "../../services/auth.service";


export class AuthController{
    constructor(private readonly authService:AuthService, ){}
    
    /* This code snippet defines a method `register` within the `AuthController` class. This method is
    responsible for handling the registration process for a user. Here is a breakdown of what the
    method is doing: */
    register = (req:Request, res:Response) => {
        const [error, registerUserDto] = RegisterUserDto.register(req.body)
        if(error) return res.status(400).json({error})
        this.authService.register(registerUserDto!)
        .then(user => res.json(user))
        .catch(error => HandleError.error(error, res))
    };

    /* This code snippet defines a method named `login` within the `AuthController` class. Here is a
    breakdown of what this method is doing: */
    login = (req:Request, res:Response) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body)
        if(error) return res.status(400).json({error})
        this.authService.login(loginUserDto!)
        .then(user => res.json(user))
        .catch(error => HandleError.error(error, res))
    };
} 