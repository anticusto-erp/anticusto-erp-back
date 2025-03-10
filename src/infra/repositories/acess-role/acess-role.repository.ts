import { AcessRole } from "../../../domain/access-role/entity/acess-role";
import { AcessRoleGateway } from "../../../domain/access-role/gateway/acess-role.gateway";
import { PoolConnection } from "../../database/Database.connection";

export class AccessRoleRepository implements AcessRoleGateway{

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new AccessRoleRepository();
    }

    public async save(acessRole: AcessRole): Promise<void> {
        await this.pool.execute("insert into nivel_de_acesso (id, nivel_de_acesso) values (?, ?)", [acessRole.id, acessRole.access_role]);
    }

    public async list(): Promise<AcessRole[]> {
        const [rows] = await this.pool.execute("select * from nivel_de_acesso");

        return rows as AcessRole[];
    }

    public async delete(id: string): Promise<void> {
        await this.pool.execute("delete from nivel_de_acesso where id= ?", [id]);
    }

    public async update(access: AcessRole): Promise<void> {
        await this.pool.execute("update nivel_de_acesso set nivel_de_acesso = ? where id = ?", [access.access_role, access.id]);
    }

    public async findByName(nivel: string): Promise<AcessRole | null> {
        const [rows] = await this.pool.execute("select * from nivel_de_acesso where nivel_de_acesso = ?", [nivel]);

        return rows.length > 0 ? rows[0] as AcessRole : null;
    }

    public async findById(id: string): Promise<AcessRole | null> {
        const [rows] = await this.pool.execute("select * from nivel_de_acesso where id = ?", [id]);

        return rows.length > 0 ? rows[0] as AcessRole : null;
    }

}
