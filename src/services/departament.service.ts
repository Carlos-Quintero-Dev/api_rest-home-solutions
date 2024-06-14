import { DepartamentModel } from "../data/mongodb/models/departament.model";
import { CreateDepartamentDto } from "../domain/dtos/departament/create-departament.dto";
import { PaginationDto } from "../domain/dtos/departament/pagination-departament.dto";
import { UpdateDepartamentDto } from "../domain/dtos/departament/update-departament.dto";
import { DepartamentEntity } from "../domain/entities/departament.entity";
import { CustomError } from "../domain/errors/custom.error";
import { DepartamentMaper } from "../domain/mapers/departamentMapers";

interface FindAllDepartament{
    offset:number,
    limit:number,
    page:number,
    total:number,
    departaments: DepartamentEntity[],
}


export class DepartamentService{
    /**
     * The function creates a new department entity based on the provided data and returns it after
     * saving it to the database.
     * @param {CreateDepartamentDto} createDepartamentDto - The `createDepartamentDto` parameter is of
     * type `CreateDepartamentDto`, which is likely an object containing the data needed to create a
     * new department. This object may include properties such as the department name, description,
     * manager, location, etc. The function `create` is used to create
     * @returns The `create` function is returning a Promise that resolves to a `DepartamentEntity`
     * object.
     */
    async create (createDepartamentDto:CreateDepartamentDto):Promise<DepartamentEntity>{
        try {

            const departament = await DepartamentModel.create(createDepartamentDto);
            if(!departament) throw CustomError.badRequest("add departament failed")
            await departament.save();
            return DepartamentMaper.fromEntity(departament);
            
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    /**
     * This TypeScript function updates a department entity based on the provided data and returns the
     * updated entity.
     * @param {UpdateDepartamentDto} updateDepartamentDto - The `updateDepartamentDto` parameter likely
     * contains the data that needs to be updated for a department entity. It could include fields such
     * as the department's name, description, or any other relevant information that needs to be
     * modified.
     * @param {string} id - The `id` parameter in the `async update` function is a string that
     * represents the unique identifier of the department entity that you want to update. It is used to
     * locate the specific department in the database that needs to be updated.
     * @returns The `update` function is returning a Promise that resolves to a `DepartamentEntity`
     * object.
     */
    async update(updateDepartamentDto:UpdateDepartamentDto, id:string):Promise<DepartamentEntity>{
        try {
            const departament = await DepartamentModel.findByIdAndUpdate(id, {...updateDepartamentDto});
            if(!departament) throw CustomError.badRequest("update departament  failed")
            await departament.save();
            return DepartamentMaper.fromEntity(departament);

        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    /**
     * This TypeScript function deletes a department entity by its ID and returns the deleted entity.
     * @param {string} _id - The `_id` parameter is a string that represents the unique identifier of
     * the department entity that you want to delete from the database.
     * @returns The `delete` function is returning a Promise that resolves to a `DepartamentEntity`
     * object. This object represents the deleted department entity after performing the deletion
     * operation in the database. If the department with the specified `_id` does not exist, a
     * CustomError with a "departament don't exist" message is thrown. If any other error occurs during
     * the deletion process, a generic internal server error
     */
    async delete(_id:string):Promise<DepartamentEntity>{
        try {
            const departament = await DepartamentModel.findOneAndDelete({_id});
            if(!departament) throw CustomError.badRequest("departament don't exist")
            return DepartamentMaper.fromEntity(departament);

        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer(); 
        }
    }

    /**
     * This TypeScript function asynchronously finds a department entity by its ID and returns it,
     * handling errors appropriately.
     * @param {string} _id - The `_id` parameter is a string representing the unique identifier of a
     * department entity. It is used to query the database to find a department with the specified
     * `_id`.
     * @returns The `findOne` function is returning a Promise that resolves to a `DepartamentEntity`
     * object.
     */
    async findOne(_id:string):Promise<DepartamentEntity>{
        try {
            const departament = await DepartamentModel.findOne({_id});
            if(!departament) throw CustomError.badRequest("departament don't exist")
            return DepartamentMaper.fromEntity(departament);
      
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    /**
     * This TypeScript function asynchronously retrieves a paginated list of departments from a
     * database and maps the results before returning them.
     * @param {PaginationDto} paginationDto - The `paginationDto` parameter is an object that contains
     * information about pagination, specifically the `offset` and `limit` values. The `offset`
     * indicates the starting index of the results to retrieve, while the `limit` specifies the maximum
     * number of results to return per page.
     * @returns The `findAll` function is returning a Promise that resolves to an object with the
     * following properties:
     * - `offset`: The offset value from the `paginationDto` parameter.
     * - `limit`: The limit value from the `paginationDto` parameter.
     * - `page`: The calculated page number based on the offset and limit values.
     * - `total`: The total number of documents found in the Departament collection
     */
    async findAll(paginationDto:PaginationDto):Promise<FindAllDepartament>{
        const {offset, limit} = paginationDto

        try {
            
            const [total,departaments] = await Promise.all([
                DepartamentModel.find({}).countDocuments(),
                DepartamentModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                departaments:departaments.map(dep=>DepartamentMaper.fromEntity(dep)),
            };

        } catch (error) {
             if( error instanceof CustomError ) throw error;
             throw CustomError.internalServer();
        }
    }

}