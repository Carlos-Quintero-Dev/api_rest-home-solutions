import { Router } from "express";
import { HouseService } from "../../services/house.service";
import { HouseController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class HouseRoute{
    /* This code snippet is defining a static getter method `route` within the `HouseRoute` class. When
    this method is called, it creates a new instance of the Express `Router`, initializes instances
    of `HouseService` and `HouseController`, sets up various routes (GET, PUT, DELETE, POST) with
    corresponding controller methods, and returns the configured router instance. */
    static get route(): Router{
         const routes = Router();
         const houseServices = new HouseService();
         const controller = new HouseController(houseServices);
         routes.get('/', controller.findAll)
         routes.get('/:id', controller.findOne);
         routes.put('/:id', controller.update);
         routes.delete('/:id', controller.delete);
         routes.post('/', [AuthMiddleware.validateJwt], controller.create)
         return routes;
     }
}