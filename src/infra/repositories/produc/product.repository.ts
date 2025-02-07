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

    public async save(product: Product){
        await this.pool.execute("insert into produto (id, nome, preco, descricao) values (?,?,?,?,?)", [product]);
    }

    public async findOne(id: string): Promise<Product | null> {

        const [rows] = await this.pool.execute("select * from produto order by created_at", [id]);

        return rows.length ? rows[0] as Product : null;
    }

}
