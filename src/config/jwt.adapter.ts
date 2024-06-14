import * as jwt from "jsonwebtoken";


export class JwtAdapter{

   /**
    * The function `generateToken` in TypeScript generates a JWT token with a specified payload and
    * expiration duration.
    * @param {Object} payload - The `payload` parameter in the `generateToken` function is an object
    * that contains the data you want to encode into the JWT token. This data can be any information
    * that you want to securely transmit or store in the token.
    * @param {string} [duration=2h] - The `duration` parameter in the `generateToken` function
    * specifies the expiration time for the generated JWT token. It is set to a default value of '2h',
    * which means the token will expire in 2 hours unless a different duration is provided when calling
    * the function.
    * @returns The `generateToken` function is returning a Promise that resolves to a string (the
    * generated token) or null.
    */
    static async generateToken( payload: Object, duration:string = '2h' ):Promise<string|null>{
        return new Promise( ( resolve ) => {
            jwt.sign( payload, "HolaMundo", { expiresIn: duration }, ( error, token ) => {
                if( error ) return resolve( null );
                
                return resolve( token! );
            });
        });
    }

    /**
     * The function `validateToken` in TypeScript validates a token using a secret key and returns the
     * decoded data as a Promise.
     * @param {string} token - The `token` parameter is a string that represents a token that needs to
     * be validated using the `jwt.verify` method.
     * @returns The `validateToken` function returns a Promise that resolves with the decoded token as
     * type `T` if the token is successfully verified using the "HolaMundo" secret key. If there is an
     * error during verification, the Promise resolves with `null`.
     */
    static validateToken<T>( token: string ): Promise<T|null>{
        return new Promise((resolve)=>{
            jwt.verify( token, "HolaMundo", (error, decoded) => {
                if( error ) return resolve( null );
                
                return resolve( decoded as T );
            });
        });
    }
}