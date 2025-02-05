import mysql from "mysql2";

export class PoolConnection {
    private static pool;

    private constructor(){}

    static create(){
        if(!this.pool){
            this.pool = mysql.createPool({
                host: process.env.HOST,
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                port: process.env.PORT ? Number(process.env.PORT) : 3306,
                waitForConnections: true
            }).promise();
        }

        return this.pool;
    }

}