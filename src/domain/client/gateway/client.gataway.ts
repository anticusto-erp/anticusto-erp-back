import { Client } from "../entity/client";

export interface ClientGateway {

    save(client: Client): Promise<void>;
    list(): Promise<Client[]>;
    findOne(id?: string): Promise<Client | null>;

    findOneByBi(bi?: string): Promise<Client | null>;

}