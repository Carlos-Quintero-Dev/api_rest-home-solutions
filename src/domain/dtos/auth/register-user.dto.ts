export class RegisterUserDto{
    constructor(
        public name:string,
        public email:string,
        public password:string,
        public rol: string
    ){};

   /**
    * The function `register` in TypeScript takes an object with name, email, password, and role
    * properties, validates the required fields, and returns an error message or a new
    * `RegisterUserDto` instance.
    * @param object - The `register` function takes an object as a parameter, which should have the
    * following properties:
    * @returns The `register` function returns an array with two elements. The first element is a
    * string that indicates an error message if any of the required fields (name, email, password) are
    * missing. If all required fields are present, the first element is `undefined`. The second element
    * is an instance of the `RegisterUserDto` class with the provided `name`, `email`, `password`, and
    */
    static register(object:{[key:string]:any}):[string?, RegisterUserDto?]{
        const {name, email, password, rol} = object
        if(!name) return['name is required', undefined]
        if(!email) return['email is required', undefined]
        if(!password) return['password is required', undefined]

        return [undefined, new RegisterUserDto(name, email, password, rol)]
    }
}