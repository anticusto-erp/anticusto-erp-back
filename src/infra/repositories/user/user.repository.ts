import { AcessRole } from "../../../domain/access-role/entity/acess-role";
import { Employer } from "../../../domain/employer/entity/employer";
import { Store } from "../../../domain/store/entity/store";
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

    public async list(): Promise<User[]> {
        const [rows] = await this.pool.execute("select * from usuario order by created_at");

        return rows as User[];
    }

    public async findOne(id: string): Promise<User | null> {
        const [rows] = await this.pool.execute("select * from usuario where id = ?", [id]);

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

    public async findStore(id: string): Promise<Store | null> {
        const [rows] = await this.pool.execute("select * from loja where id = ?", [id]);

        return rows.length > 0 ? rows[0] as Store : null;
    }

    public async findRole(id: string): Promise<AcessRole | null> {
        const [rows] = await this.pool.execute("select * from nivel_de_acesso where id = ?", [id]);

        return rows.length > 0 ? rows[0] as AcessRole : null;
    }

    public async findEmployer(id: string): Promise<Employer | null> {
        const [rows] = await this.pool.execute("select * from funcionario where id = ?", [id]);

        return rows.length > 0 ? rows[0] as Employer : null;
    }

    public async findAccessRole(id: string): Promise<AcessRole | null> {
        const [rows] = await this.pool.execute("select * from nivel_de_acesso where id = ?", [id]);

        return rows.length > 0 ? rows[0] as AcessRole : null;
    }

}