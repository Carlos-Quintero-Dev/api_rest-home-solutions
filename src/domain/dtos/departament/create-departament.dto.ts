
export class CreateDepartamentDto{
    constructor(
        public name:string,
        public price:string,
        public address:string,
        public services:string,
        public description:string,
        public image?: string
    ){}

   /* This static method named `create` inside the `CreateDepartamentDto` class is a factory method
   used to create an instance of `CreateDepartamentDto` from a generic object. Here's a breakdown of
   what it does: */
    static create(object:{[key:string]:any}):[string?, CreateDepartamentDto?]{
        const {name, price, address, services, description, image} = object
        if(!name) return['name is required', undefined]
        if(!price) return['price is required', undefined]
        return [undefined, new CreateDepartamentDto(name, price, address, services, description, image)]
    }
}
