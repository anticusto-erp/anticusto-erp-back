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

        const [rows] = await this.pool.execute("select * from loja order by created_at");

        return rows as Store[];


    }

    async delete(id: string): Promise<boolean>{
        const [result] = await this.pool.execute(`delete from loja where id = ?`, [id]);

        const affectedRows = (result as any).affectedRows;
        return affectedRows > 0
    }

    async findOne(id: string): Promise<Store | null>{
        const [rows] = await this.pool.execute("select * from loja where id = ?", [id]);

        const store = rows[0];
        return store ? Store.with(store) : null
    }

    async update(store: Store): Promise<void> {
        await this.pool.execute("update loja set nome = ?, endereco = ?, contacto = ?, tenant_key = ? where id = ?", [store.nome, store.endereco, store.contacto, store.tenant_key, store.id]);
    }

}
