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

    async save(product: Product): Promise<void>{

        await this.pool.execute("insert into produto (id, nome, preco, descricao, created_at) values (?,?,?,?,?)", [product.id, product.name, product.preco, product.descricao, product.created_at]);
    }

    async findOne(id: string): Promise<Product | null> {

        const [rows] = await this.pool.execute("select * from produto where id = ?", [id]);

        return rows.length > 0 ? rows[0] as Product : null;
    }

}
