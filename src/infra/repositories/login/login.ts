import { Employer } from "../../../domain/employer/entity/employer";
import { User } from "../../../domain/user/entity/user";
import { PoolConnection } from "../../database/Database.connection";

export class LoginRepository {

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new LoginRepository();
    }

    public async login(user: User): Promise<User | null> {

        const [rows] = await this.pool.execute("select * from funcionario where id = ?", [user.id_employer]);

        return rows.length > 0 ? rows[0] as User : null

    }

}