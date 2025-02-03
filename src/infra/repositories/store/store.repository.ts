import { Store } from "../../../domain/store/entity/store";
import { StoreGateway } from "../../../domain/store/gateway/store.gateway";
import { PoolConnection } from "../../database/Database.connection";


export class StoreRepository{

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new StoreRepository();
    }

    async save(store: Store): Promise<void> {
        await this.pool.execute("insert into loja (id, nome, endereco, contacto, tenant_key) values (?,?,?,?,?)", [store.id, store.name_store, store.address, store.contact ,store.tenant_key]);
    }

    // async findBiId(id: string): Promise<Store | null> {
    //     const [rows] = await pool.execute("select * from loja where id = ?", [id]);

    //     if(rows.)

    // }

    // list(): Promise<Store[]> {

    // }
}