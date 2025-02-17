import { Client } from "../../../domain/client/entity/client";
import { ClientGateway } from "../../../domain/client/gateway/client.gataway";
import { PoolConnection } from "../../database/Database.connection";

export class ClientRepository implements ClientGateway {
    
    private pool;

    public constructor() {
        this.pool = PoolConnection.create();
    }

    public static create() {
        return new ClientRepository();
    }

    public async save(client: Client): Promise<void> {
        await this.pool.execute("insert into cliente (id, nome, bi, telefone) values (?, ?,?,?)", [client?.id, client?.nome, client?.bi, client?.telefone]);
    }

    public async list(): Promise<Client[]> {
        const [rows] = await this.pool.execute("select * from cliente");

        return rows as Client[];
    }

    public async findOne(id?: string): Promise<Client | null> {

        const [rows] = await this.pool.execute("select * from cliente where id = ?", [id]);

        return rows.length > 0 ? rows[0] : null;
    }

    public async findOneByBi(bi?: string): Promise<Client | null> {

        const [rows] = await this.pool.execute("select * from cliente where bi = ?", [bi]);

        return rows.length > 0 ? rows[0] : null;
    }

}