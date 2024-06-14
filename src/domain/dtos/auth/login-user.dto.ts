export class LoginUserDto{
    constructor(
        public email:string,
        public password:string
    ){};

   /**
    * The function `login` takes an object with email and password properties, validates them, and
    * returns an error message or a LoginUserDto object.
    * @param object - The `object` parameter in the `login` function is expected to be an object with
    * key-value pairs. It should have properties for `email` and `password`.
    * @returns An array is being returned with two elements. The first element is a string that could
    * be an error message if the email or password is missing, or it could be undefined if there are no
    * errors. The second element is an instance of the LoginUserDto class initialized with the email
    * and password provided in the input object.
    */
    static login(object:{[key:string]:any}):[string?, LoginUserDto?]{
        const {email,password} = object
        if(!email) return['email is required', undefined]
        if(!password) return['password is required', undefined]

        return [undefined, new LoginUserDto(email,password)]
    }
}