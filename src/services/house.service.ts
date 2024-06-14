import { HouseModel } from "../data/mongodb/models/house.model";
import { CreateHouseDto } from "../domain/dtos/house/create-house.dto";
import { PaginationDto } from "../domain/dtos/house/pagination-house.dto";
import { UpdateHouseDto } from "../domain/dtos/house/update-house.dto";
import { HouseEntity } from "../domain/entities/house.entity";
import { CustomError } from "../domain/errors/custom.error";
import { HouseMaper } from "../domain/mapers/houseMapers";

interface FindAllHouses{
    offset:number,
    limit:number,
    page:number,
    total:number,
    houses: HouseEntity[],
}


export class HouseService{
    /**
     * This function creates a new house entity based on the provided data and returns the mapped
     * entity.
     * @param {CreateHouseDto} createHouseDto - The `createHouseDto` parameter is an object that
     * contains the data needed to create a new house entity. It likely includes properties such as the
     * house's address, number of rooms, size, price, etc. This object is used to create a new
     * `HouseEntity` in the database.
     * @returns The `create` function is returning a Promise that resolves to a `HouseEntity` object.
     */
    async create (createHouseDto:CreateHouseDto):Promise<HouseEntity>{
        try {

            const house = await HouseModel.create(createHouseDto);
            if(!house) throw CustomError.badRequest("add House failed")
            await house.save();
            return HouseMaper.fromEntity(house);
            
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    /**
     * This TypeScript function updates a house entity in a database and returns the updated entity.
     * @param {UpdateHouseDto} updateHouseDto - The `updateHouseDto` parameter is an object that
     * contains the updated information for a house entity. It likely includes properties such as
     * `name`, `address`, `price`, etc., which will be used to update the corresponding house entity in
     * the database.
     * @param {string} id - The `id` parameter in the `async update` function is a string that
     * represents the unique identifier of the house entity that you want to update in the database. It
     * is used to locate the specific house entity that needs to be updated.
     * @returns The `update` function is returning a Promise that resolves to a `HouseEntity` object.
     */
    async update(updateHouseDto:UpdateHouseDto, id:string):Promise<HouseEntity>{
        try {
            const house = await HouseModel.findByIdAndUpdate(id, {...updateHouseDto});
            if(!house) throw CustomError.badRequest("update House failed")
            await house.save();
            return HouseMaper.fromEntity(house);

        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    /**
     * This TypeScript function deletes a house entity by its ID and returns the deleted entity.
     * @param {string} _id - The `_id` parameter is a string that represents the unique identifier of a
     * house entity that you want to delete from the database.
     * @returns The `delete` function is returning a Promise that resolves to a `HouseEntity` object.
     * This object is obtained by querying the database for a house with the specified `_id`, deleting
     * it if it exists, and then mapping the result to a `HouseEntity` using the
     * `HouseMapper.fromEntity` method. If the house does not exist, a CustomError with a "House don't
     * exist
     */
    async delete(_id:string):Promise<HouseEntity>{
        try {
            const house = await HouseModel.findOneAndDelete({_id});
            if(!house) throw CustomError.badRequest("House don't exist")
            return HouseMaper.fromEntity(house);

        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer(); 
        }
    }

    /**
     * This TypeScript function asynchronously finds a house entity by its ID and returns it, handling
     * errors appropriately.
     * @param {string} _id - The `_id` parameter is a string representing the unique identifier of a
     * house entity that you want to find in the database. The function `findOne` is an asynchronous
     * function that retrieves a house entity based on this identifier. If the house entity with the
     * provided `_id` is found, it is mapped
     * @returns The `findOne` function is returning a Promise that resolves to a `HouseEntity` object.
     * If the house with the specified `_id` is found in the database, it is mapped to a `HouseEntity`
     * using `HouseMaper.fromEntity` and returned. If the house is not found, a CustomError with a
     * "departament don't exist" message is thrown. If any other
     */
    async findOne(_id:string):Promise<HouseEntity>{
        try {
            const house = await HouseModel.findOne({_id});
            if(!house) throw CustomError.badRequest("departament don't exist")
            return HouseMaper.fromEntity(house);
      
        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer();
        }
    }

    /**
     * This TypeScript function asynchronously retrieves a paginated list of houses from a database
     * using a provided pagination DTO.
     * @param {PaginationDto} paginationDto - The `paginationDto` parameter is an object that contains
     * information about pagination, specifically the `offset` and `limit` values. The `offset`
     * indicates the starting index of the results to retrieve, while the `limit` specifies the maximum
     * number of results to return in a single query. These values
     * @returns The `findAll` function returns a Promise that resolves to an object with the following
     * properties:
     * - `offset`: The offset value from the `paginationDto` parameter.
     * - `limit`: The limit value from the `paginationDto` parameter.
     * - `page`: The calculated page number based on the offset and limit values.
     * - `total`: The total number of documents found in the HouseModel collection.
     */
    async findAll(paginationDto:PaginationDto):Promise<FindAllHouses>{
        const {offset, limit} = paginationDto

        try {
            
            const [total,houses] = await Promise.all([
                HouseModel.find({}).countDocuments(),
                HouseModel.find({})
                .skip(offset)
                .limit(limit),
            ])

            return{
                offset, 
                limit, 
                page: (offset<=0)?1:Math.ceil(offset/limit), 
                total, 
                houses:houses.map(house=>HouseMaper.fromEntity(house)),
            };

        } catch (error) {
            if( error instanceof CustomError ) throw error;
            throw CustomError.internalServer(); 
        }
    }

}