import { AcessRole } from "../../../domain/access-role/entity/acess-role";
import { AcessRoleGateway } from "../../../domain/access-role/gateway/acess-role.gateway";
import { PoolConnection } from "../../database/Database.connection";

export class AcessRoleRepository implements AcessRoleGateway{

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new AcessRoleRepository();
    }

    public async save(acessRole: AcessRole): Promise<void> {
        await this.pool.execute("insert into nivel_de_acesso (id, nivel_de_acesso) values (?, ?)", [acessRole.id, acessRole.access_role]);
    }

}
