import { User } from "../../../domain/user/entity/user";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { PoolConnection } from "../../database/Database.connection";

export class UserRepository implements UserGateway {

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new UserRepository();
    }

    public async save(user: User): Promise<void> {
        await this.pool.execute("insert into usuario (id, id_funcionario, id_nivel_de_acesso, nome_de_usuario, senha) values (?,?,?,?,?)", [user.id, user.id_employer, user.id_access_role, user.username, user.password]);
    }

    public async findOne(id: string): Promise<User | null> {
        const [rows] = await this.pool.execute("select * from usuario where id_funcionario = ?", [id]);

        return rows.length > 0 ? rows[0] as User : null;
    }

    public async findOneLogin(id: string): Promise<User | null> {
        const [rows] = await this.pool.execute("select * from usuario where id_funcionario = ?", [id]);

        return rows.length > 0 ? rows[0] as User : null;
    }

    public async findTelephoneToLogin(telephone: string): Promise<User | null> {
        const [rows] = await this.pool.execute("select * from funcionario where telefone = ?", [telephone]);

        return rows.length > 0 ? rows[0] as User : null;
    }

}