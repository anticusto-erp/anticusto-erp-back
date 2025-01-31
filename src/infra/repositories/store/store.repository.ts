import { Store } from "../../../domain/store/entity/store";
import { StoreGateway } from "../../../domain/store/gateway/store.gateway";
import {db} from "../../database/Database.connection";

export class StoreRepository implements StoreGateway {
    async save(store: Store): Promise<void> {
        const [result] = await db.execute("insert into store (id, name_store, address, contact, tenant_key) values (?,?,?,?,?)", [store.id, store.name_store, store.address, store.contact ,store.tenant_key]);

        // store.id = (result as any).insertId;

        // return store;

    }

    // list(): Promise<Store[]> {

    // }
}