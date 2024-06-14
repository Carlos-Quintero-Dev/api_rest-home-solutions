
export class CreateHouseDto{
    constructor(
        public name:string,
        public price:string,
        public address:string,
        public services:string,
        public description:string,
        public image?: string
    ){}

    /**
     * The static create function in TypeScript takes an object as input and returns an array with an
     * optional error message and a CreateHouseDto object.
     * @param object - The `create` function takes an object as a parameter, which should have the
     * following properties:
     * @returns The `create` function returns an array with two elements. The first element is a string
     * that indicates an error message if any required field is missing (such as 'name is required' or
     * 'price is required'). The second element is an instance of the `CreateHouseDto` class if all
     * required fields are provided.
     */
    static create(object:{[key:string]:any}):[string?, CreateHouseDto?]{
        const {name, price, address, services, description, image} = object
        if(!name) return['name is required', undefined]
        if(!price) return['price is required', undefined]
        return [undefined, new CreateHouseDto(name, price, address, services, description, image)]
    }
}
