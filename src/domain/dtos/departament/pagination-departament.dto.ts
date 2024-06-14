export class PaginationDto{
    constructor(
        public offset:number,
        public limit:number
    ){}

   /**
    * The function `paginate` takes an object with offset and limit properties, validates them, and
    * returns an error message or a PaginationDto object.
    * @param object - The `paginate` function takes an object as a parameter, which should have the
    * following structure:
    * @returns The `paginate` function returns an array with two elements. The first element is a
    * string that indicates any error message encountered during the pagination process, or `undefined`
    * if there are no errors. The second element is an instance of the `PaginationDto` class containing
    * the offset and limit values for pagination.
    */
    static paginate(object:{[key:string]:any}):[string?, PaginationDto?]{

        const{offset = 0 , limit = 20} = object

        if(isNaN(+offset)) return['offset deber ser un numero', undefined]
        if(isNaN(+limit)) return ['limit debe ser un numero', undefined]
        if(+offset < 0) return ['offset deber ser mayor a cero', undefined]
        if(+limit < 0) return ['limit deber se mayor a cero', undefined]
        return [undefined, new PaginationDto(+offset, +limit)]
    }

}