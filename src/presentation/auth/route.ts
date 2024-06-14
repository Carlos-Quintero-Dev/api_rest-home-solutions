import { Router } from "express";
import { AuthController} from "./controller";
import { AuthService } from "../../services/auth.service";

export class AuthRoute{
   /* This code snippet is defining a static getter property `route` within the `AuthRoute` class. When
   this property is accessed, it creates a new instance of the Express `Router`, initializes an
   `AuthService`, and creates an `AuthController` instance with the `AuthService`. */
    static get route(): Router{
         const routes = Router();
         const authServices = new AuthService();
         const controller = new AuthController(authServices);
         routes.post('/register', controller.register );
         routes.post('/login', controller.login);
         return routes;
     }
}