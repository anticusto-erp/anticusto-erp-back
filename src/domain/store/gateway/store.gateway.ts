import { Store } from "../entity/store";

export interface StoreGateway {
    save(store: Store): Promise<void>;
    list(): Promise<Store[]>;
    delete(id: string): Promise<boolean>;
}