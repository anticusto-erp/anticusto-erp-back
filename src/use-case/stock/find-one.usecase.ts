import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Stock } from "../../domain/stock/entity/stock";
import { StockGateway } from "../../domain/stock/gateway/stock.gateway";
import { Usecase } from "../use-case";

export type StockOutputDTO = {
    id: string;
    id_producto: string;
    quantidade: number,
    created_at: Date;
    updated_at: Date;
    produto: Product | null;
}

export class FindOneStockUsecase implements Usecase<string, StockOutputDTO> {

    public constructor(private readonly stockGateway: StockGateway, private readonly productGateway: ProductGateway){}

    public static create(stockGateway: StockGateway, productGateway: ProductGateway){
        return new FindOneStockUsecase(stockGateway, productGateway);
    }

    public async execute(id: string): Promise<StockOutputDTO> {

        const aStock = await this.stockGateway.findOne(id);

        if(!aStock){
            throw new Error("Stock not found");
        }

        const output = await this.present(aStock);

        return output

    }

    private async present(input: Stock | any){

        const id_product = input.id_produto;
        const product = await this.productGateway.findOne(id_product);

        const output: StockOutputDTO = {
            id: input.id,
            id_producto: input.id_produto,
            quantidade: input.quantidade,
            created_at: input.created_at,
            updated_at: input.updated_at,
            produto: product,
        }

        return output;

    }

}
