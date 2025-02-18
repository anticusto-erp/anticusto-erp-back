import { Sale } from "../../../domain/sale/entity/Sale";
import { SaleGateway } from "../../../domain/sale/gateway/sale.gateway";
import { PoolConnection } from "../../database/Database.connection";

export class SaleRepository implements SaleGateway {

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new SaleRepository();
    }

    public async save(sale: Sale): Promise<void> {
        await this.pool.execute("insert into venda (id, id_cliente, id_produto, id_usuario, quantidade) values (?,?, ?,?,?)", [sale.id, sale.id_cliente, sale.id_produto, sale.id_usuario, sale.quantidade]);
    }

    public async list(): Promise<Sale[]> {
        const [rows] = await this.pool.execute("select * from venda order by created_at");

        return rows as Sale[]
    }

    public async finOne(id: string): Promise<Sale | null> {
        const [row] = await this.pool.execute("select * from venda where id = ?", [id]);

        return row.length > 0 ? row as Sale : null;
    }

}