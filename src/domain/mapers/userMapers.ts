import { UserEntity } from "../entities/user.entity"


export class UserMaper{
    /**
     * The function `fromEntity` in TypeScript creates a new `UserEntity` object from a given object,
     * with validation checks for required fields.
     * @param Object - The `fromEntity` function takes an object as a parameter, which should have the
     * following properties:
     * @returns A new instance of UserEntity with the provided id, name, email, password, rol, and img
     * properties is being returned.
     */
    static fromEntity(Object:{[key:string]:any}):UserEntity{
        const {id, name, email, password, rol, img} = Object
        if(!name) throw Error('name is required')
        if(!email) throw Error('name is required')
        if(!password) throw Error('name is required')
        return new UserEntity(id,name, email, password, rol, img)
    }
}