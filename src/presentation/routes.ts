import { Router } from "express";

import { AuthRoute } from "./auth/route";
import { DepartamentRoute } from "./departament/route";
import { HouseRoute } from "./house/route";

export class AppRoute{
   /**
    * The function returns a Router with routes for authentication, department, and house APIs.
    * @returns A Router instance with routes for '/api/auth', '/api/departament', and '/api/house'.
    */
   static get route(): Router{
        const routes = Router();
        routes.use('/api/auth', AuthRoute.route)
        routes.use('/api/departament', DepartamentRoute.route)
        routes.use('/api/house', HouseRoute.route)
        return routes;
    }
}