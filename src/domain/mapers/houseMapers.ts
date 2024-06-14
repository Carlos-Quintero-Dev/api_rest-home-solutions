import { HouseEntity } from "../entities/house.entity"



export class HouseMaper{
    /**
     * The function `fromEntity` converts an object into a `HouseEntity` instance in TypeScript.
     * @param object - The `object` parameter is an object that contains the following properties:
     * @returns A new instance of the HouseEntity class is being returned, with the properties id,
     * name, price, address, services, description, and img initialized with the values extracted from
     * the input object.
     */
    static fromEntity(object:{[key:string]:any}):HouseEntity{
        const {id, name, price, address, services, description, img} = object
        if(!name) throw Error('name is required')
        if(!price) throw Error('price is required')
        return new HouseEntity(id, name, price, address, services, description, img)
    }
}