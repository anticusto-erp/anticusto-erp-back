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
        const [rows] = await this.pool.execute("select * from estoque order by created_at");

        return rows as Stock[];
    }

    public async findOne(id: string): Promise<Stock | null> {
        const [rows] = await this.pool.execute("select * from estoque where id = ?", [id]);

        return rows.length > 0 ? rows[0] as Stock : null;
    }

    public async update(stock: Stock): Promise<void> {

        await this.pool.execute("update estoque set quantidade = ?, updated_at = ? where id = ?", [stock.quantidade, stock.updated_at, stock.id]);

    }

    public async delete(id: string): Promise<void> {

        await this.pool.execute("delete from estoque where id = ?", [id]);

    }

    public async findOneProduct(id: string): Promise<Stock | null> {
        const [rows] = await this.pool.execute("select * from estoque where id_produto = ?", [id]);
        return rows.length > 0 ? rows[0] as Stock : null;
    }

    public async reduceQuantityInStock(quantidade: number, id: string): Promise<void> {
        await this.pool.execute("update estoque set quantidade = ? where id_produto = ?", [quantidade, id])
    }

}
