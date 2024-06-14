import { Router } from "express";
import { DepartamentService } from "../../services/departament.service";
import { DepartamentController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class DepartamentRoute{
    /**
     * The function returns a set of routes for handling CRUD operations on department entities.
     * @returns A Router instance with defined routes for handling CRUD operations on departments,
     * including finding all departments, finding one department by ID, updating a department, deleting
     * a department, and creating a new department with JWT validation middleware.
     */
    static get route(): Router{
         const routes = Router();
         const departamentServices = new DepartamentService();
         const controller = new DepartamentController(departamentServices);
         routes.get('/', controller.findAll)
         routes.get('/:id', controller.findOne);
         routes.put('/:id', controller.update);
         routes.delete('/:id', controller.delete);
         routes.post('/', [AuthMiddleware.validateJwt], controller.create)
         return routes;
     }
}