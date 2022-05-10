import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    POSTGRES_TEST,
}=process.env;

let client:Pool;
console.log(ENV)

if(ENV === "test"){
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

else{
    client=new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}

export default client;