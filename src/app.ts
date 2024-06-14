import { mongoDB } from "./data/mongodb/database";
import { Server } from "./presentation/server";

(() => {
    main();
})();

async function main(){
    //levantar base de datos

    await mongoDB.connection();

    //levantar servidor

    const server = new Server();
    server.start();

}