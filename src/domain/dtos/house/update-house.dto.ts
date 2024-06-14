export class UpdateHouseDto{
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
     * The function `update` in TypeScript validates and updates a house object with specific
     * properties.
     * @param object - The `object` parameter in the `update` function is expected to be an object with
     * the following properties:
     * @returns The `update` function returns an array with two elements. The first element is a string
     * that indicates an error message if the required fields (`name` and `price`) are missing in the
     * input object. The second element is an instance of the `UpdateHouseDto` class with the provided
     * data if the required fields are present.
     */
    static update(object:{[key:string]:any}):[string?, UpdateHouseDto?]{
        const {id, name, price, address, services, description, image} = object
        if(!name) return['name is required', undefined]
        if(!price) return['price is required', undefined]
        return [undefined, new UpdateHouseDto(id, name, price, address, services, description, image)]
    }
}    