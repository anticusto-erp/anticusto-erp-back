import mysql, { Pool } from "mysql2";

export class PoolConnection {
    private static pool: any;

    private constructor(){}

    static create(){
        if(!this.pool){
            this.pool = mysql.createPool({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 3306,
                waitForConnections: true,
                connectionLimit: 10,
                connectTimeout: 10000,
            }).promise();
        }

        return this.pool;
    }

}
