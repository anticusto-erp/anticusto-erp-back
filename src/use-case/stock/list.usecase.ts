import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Stock } from "../../domain/stock/entity/stock";
import { StockGateway } from "../../domain/stock/gateway/stock.gateway";
import { Usecase } from "../use-case";

export type StockInputDTO = void;
export type StockOutputDTO = {
    estoque: {
        id: string;
        id_producto: string;
        quantidade: number,
        created_at: Date;
        updated_at: Date;
        produto: Product;
    }
}

export class ListStockUsecase implements Usecase<StockInputDTO, StockOutputDTO> {

    public constructor(private readonly stockGateway: StockGateway, private readonly productGateway: ProductGateway){}

    public static create(stockGateway: StockGateway, productGateway: ProductGateway){
        return new ListStockUsecase(stockGateway, productGateway);
    }

    public async execute(): Promise<StockOutputDTO> {
        
        const aStock = await this.stockGateway.list();

        const output = this.present(aStock);

        return output;

    }

    private async present(input: Stock[]): Promise<any>{

        const output = Promise.all(input.map( async (input) => {

            const aProduct = await this.productGateway.findOne(input.id_produto);

            return {
                id: input.id,
                id_producto: input.id_produto,
                quantidade: input.quantidade,
                created_at: input.created_at,
                updated_at: input.updated_at,
                produto: aProduct
            }
        }))

        return output;

    }

}
