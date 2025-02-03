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

        // const rs = rows.map((p) => {
        //     return p[0]
        // })

        // console.log("roes", rs)

        return rows as Store[];


    }

    // async findBiId(id: string): Promise<Store | null> {
    //     const [rows] = await pool.execute("select * from loja where id = ?", [id]);

    //     if(rows.)

    // }

    // list(): Promise<Store[]> {

    // }
}