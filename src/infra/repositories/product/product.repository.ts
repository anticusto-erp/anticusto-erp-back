import { Product } from "../../../domain/product/entity/product";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { PoolConnection } from "../../database/Database.connection";

export class ProductRepository implements ProductGateway{

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new ProductRepository();
    }

    public async save(product: Product): Promise<void>{

        await this.pool.execute("insert into produto (id, nome, preco, descricao, created_at, is_delete) values (?,?,?,?,?, false)", [product.id, product.nome, product.preco, product.descricao, product.created_at]);
    }

    public async list(): Promise<Product[]> {
        const [rows] = await this.pool.execute("select * from produto where is_delete = false order by created_at");

        return rows as Product[];
    }

    public async update(product: Product): Promise<void> {

        await this.pool.execute("update produto set nome = ?, preco = ?, descricao = ? where id = ?", [product.nome, product.preco, product.descricao, product.id]);

    }

    public async delete(id: string): Promise<void> {

        await this.pool.execute("update produto set is_delete = true where id = ?", [id]);

    }

    public async findOne(id: string): Promise<Product | null> {

        const [rows] = await this.pool.execute("select * from produto where id = ?", [id]);

        return rows.length > 0 ? rows[0] as Product : null;
    }

}
