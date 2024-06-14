import { DepartamentEntity } from "../entities/departament.entity"
import { CustomError } from "../errors/custom.error"



export class DepartamentMaper{
  /**
   * The function `fromEntity` converts an object into a `DepartamentEntity` instance in TypeScript.
   * @param object - The `fromEntity` function takes an object as a parameter, which should have the
   * following properties:
   * @returns A new instance of the `DepartamentEntity` class is being returned, with the properties
   * `id`, `name`, `price`, `address`, `services`, `description`, and `img` set based on the values
   * extracted from the `object` parameter. If the `name` or `price` properties are missing in the
   * `object`, a `CustomError` with a "Missing name
   */
    static fromEntity(object:{[key:string]:any}):DepartamentEntity{
        const {id, _id, name, price, address, services, description, img} = object
        if(!name) throw CustomError.badRequest("Missing name");
        if(!price) throw CustomError.badRequest("Missing price");
        return new DepartamentEntity(id || _id, name, price, address, services, description, img)
    }
}