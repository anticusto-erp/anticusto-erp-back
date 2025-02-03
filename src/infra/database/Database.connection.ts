import mysql from "mysql2";

// const pool = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
// });

// export default pool;


export class PoolConnection {
    private static pool;

    private constructor(){}

    static create(){
        if(!this.pool){
            this.pool = mysql.createPool({
                host: "localhost",
                user: "root",
                password: "",
                database: "anticusto_erp",
                waitForConnections: true
            }).promise();
        }

        return this.pool;
    }

}