
export class UpdateDepartamentDto{
    constructor(
        public id: string,
        public name:string,
        public price:string,
        public address:string,
        public services:string,
        public description:string,
        public image?: string
    ){}

    /**
     * The function `update` in TypeScript validates and updates a department object with specified
     * properties.
     * @param object - The `update` function takes an object as a parameter, which should have the
     * following properties:
     * @returns The `update` function is returning an array with two elements. The first element is a
     * string that indicates an error message if a required field is missing (such as 'name is
     * required' or 'price is required'). The second element is an instance of the
     * `UpdateDepartamentDto` class with the provided data if all required fields are present.
     */
    static update(object:{[key:string]:any}):[string?, UpdateDepartamentDto?]{
        const {id, name, price, address, services, description, image} = object
        if(!name) return['name is required', undefined]
        if(!price) return['price is required', undefined]
        return [undefined, new UpdateDepartamentDto(id, name, price, address, services, description, image)]
    }
}    