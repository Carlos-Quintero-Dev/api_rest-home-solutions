import { Response, Request } from "express";
import { CreateHouseDto } from "../../domain/dtos/house/create-house.dto";
import { HandleError } from "../../domain/errors/handle.error";
import { HouseService } from "../../services/house.service";
import { Validators } from "../../config/validator";
import { UpdateHouseDto } from "../../domain/dtos/house/update-house.dto";
import { PaginationDto } from "../../domain/dtos/house/pagination-house.dto";


export class HouseController{
    constructor(private readonly houseServices:HouseService, ){}
    
    /* This code snippet defines a method called `create` in the `HouseController` class. This method
    is used to handle the creation of a new house entity. Here's a breakdown of what the code is
    doing: */
    create = (req:Request, res:Response) => {
        const [error, createHouseDto] = CreateHouseDto.create(req.body)
        if(error) return res.status(400).json({error})
        this.houseServices.create(createHouseDto!)
        .then(house => res.json(house))
        .catch(error => HandleError.error(error, res))
    };

    /* This code snippet defines a method named `update` within the `HouseController` class. Here's a
    breakdown of what the code is doing: */
    update = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        const [error, updateHouseDto] = UpdateHouseDto.update(req.body)
        if(error) return res.status(400).json({error})
        this.houseServices.update(updateHouseDto!, id!)
        .then(house => res.json(house))
        .catch(error => HandleError.error(error, res))
    }

   /* This code snippet defines a method named `delete` within the `HouseController` class. Here's a
   breakdown of what the code is doing: */
    delete = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        this.houseServices.delete(id!)
        .then(house => res.json(house))
        .catch(error => HandleError.error(error, res))
    }

    /* This `findOne` method in the `HouseController` class is responsible for finding and returning a
    single house entity based on the provided ID. Here's a breakdown of what the code is doing: */
    findOne = (req:Request, res:Response) => {
        const id = req.params.id
        if(!Validators.validationMongoId(id)) throw Error('mongo id is not valid')
        this.houseServices.findOne(id!)
        .then(house => res.json(house))
        .catch(error => HandleError.error(error, res))  
    }

   /* The `findAll` method in the `HouseController` class is responsible for handling the retrieval of
   all house entities with pagination support. Here's a breakdown of what the code is doing: */
    findAll = (req:Request, res:Response) => {
        const [error, paginationDto] = PaginationDto.paginate(req.query);
        if(error) return res.status(400).json({error})
        this.houseServices.findAll(paginationDto!)
        .then(house => res.json(house))
        .catch(error => HandleError.error(error, res))  
    }
}
