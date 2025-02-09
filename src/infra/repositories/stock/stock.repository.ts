import { Stock } from "../../../domain/stock/entity/stock";
import { StockGateway } from "../../../domain/stock/gateway/stock.gateway";
import { PoolConnection } from "../../database/Database.connection";

export class StockRepository implements StockGateway {
    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new StockRepository();
    }

    public async save(stock: Stock): Promise<void> {

        await this.pool.execute("insert into estoque (id, id_produto, quantidade, created_at, updated_at) values (?,?,?,?,?)", [stock.id,stock.id_produto, stock.quantidade, stock.created_at, stock.updated_at]);

    }

    public async list(): Promise<Stock[]> {
        const [rows] = await this.pool.execute("select * from fornecedor order by created_at");

        return rows as Stock[];
    }

    public async findOne(id: string): Promise<Stock | null> {
        const [rows] = await this.pool.execute("select * from fornecedor where id = ?", [id]);

        return rows.length > 0 ? rows[0] as Stock : null;
    }
}
