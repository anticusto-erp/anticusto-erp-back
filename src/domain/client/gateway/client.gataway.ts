import { Client } from "../entity/client";

export interface ClientGateway {

    save(client: Client): Promise<void>;
    list(): Promise<Client[]>;
    findOne(id?: string): Promise<Client | null>;
    delete(id: string): Promise<void>;
    update(client: Client): Promise<void>;

    findOneByBi(bi?: string): Promise<Client | null>;

}