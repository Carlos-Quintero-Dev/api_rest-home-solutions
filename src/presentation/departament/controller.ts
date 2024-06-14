import { Request, Response } from "express";
import { DepartamentService } from "../../services/departament.service";
import { CreateDepartamentDto } from "../../domain/dtos/departament/create-departament.dto";
import { HandleError } from "../../domain/errors/handle.error";
import { Validators } from "../../config/validator";
import { UpdateDepartamentDto } from "../../domain/dtos/departament/update-departament.dto";
import { PaginationDto } from "../../domain/dtos/house/pagination-house.dto";


export class DepartamentController{
    constructor(private readonly departamentServices:DepartamentService, ){}
    
   /* The `create` method in the `DepartamentController` class is handling the creation of a new
   department. Here's a breakdown of what it does: */
    create = (req:Request, res:Response) => {
        const [error, createDepartamentDto] = CreateDepartamentDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.departamentServices.create(createDepartamentDto!)
        .then(Departament => res.json(Departament))
        .catch(error => HandleError.error(error, res))
    };

   /* The `update` method in the `DepartamentController` class is responsible for handling the updating
   of a department. Here's a breakdown of what it does: */
    update = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        const [error, updateDepartamentDto] = UpdateDepartamentDto.update(req.body)
        if(error) return res.status(400).json({error})
        this.departamentServices.update(updateDepartamentDto!, id!)
        .then(Departament => res.json(Departament))
        .catch(error => HandleError.error(error, res))
    }

    /* The `delete` method in the `DepartamentController` class is handling the deletion of a
    department. Here's a breakdown of what it does: */
    delete = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        this.departamentServices.delete(id!)
        .then(Departament => res.json(Departament))
        .catch(error => HandleError.error(error, res))
    }

    /* The `findOne` method in the `DepartamentController` class is responsible for finding and
    returning a single department based on the provided ID. Here's a breakdown of what it does: */
    findOne = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        this.departamentServices.findOne(id!)
        .then(Departament => res.json(Departament))
        .catch(error => HandleError.error(error, res))  
    }

    /* The `findAll` method in the `DepartamentController` class is responsible for handling the
    retrieval of all departments with pagination support. Here's a breakdown of what it does: */
    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = PaginationDto.paginate(req.query);
        if(error) return res.status(400).json({error})
        this.departamentServices.findAll(paginationDto!)
        .then(departament => res.json(departament))
        .catch(error => HandleError.error(error, res))  
    }

}