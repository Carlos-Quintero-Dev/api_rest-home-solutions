export class DepartamentEntity{
    constructor(
       public id: string,
       public name: string,
       public price:string,
       public address:string,
       public services:string,
       public description:string,
       public img?: string
    ){};
}