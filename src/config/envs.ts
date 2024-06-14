import 'dotenv/config';
import { get } from "env-var";

/* This block of code is defining an object named `envs` that contains configuration values for a
Node.js application. Each property in the `envs` object corresponds to a specific environment
variable that the application needs to function properly. Here's a breakdown of each property: */
export const envs = {
    PORT: get('PORT').default(3000).asPortNumber(),
    MONGO_USER:get('MONGO_USER').required().asString(),
    MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString()
}
