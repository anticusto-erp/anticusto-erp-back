import { Store } from "../../../domain/store/entity/store";
import { StoreGateway } from "../../../domain/store/gateway/store.gateway";
import { PoolConnection } from "../../database/Database.connection";


export class StoreRepository implements StoreGateway{

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new StoreRepository();
    }

    async save(store: Store): Promise<void> {
        await this.pool.execute("insert into loja (id, nome, endereco, contacto, tenant_key) values (?,?,?,?,?)", [store.id, store.nome, store.endereco, store.contacto ,store.tenant_key]);
    }

    async list(): Promise<Store[]>{

        const [rows] = await this.pool.execute("select * from loja");

        return rows as Store[];


    }

    async delete(id: string): Promise<void>{
        await this.pool.execute(`delete from loja where id = ?`, [id]);
    }

}
