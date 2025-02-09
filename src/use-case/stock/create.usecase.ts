import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Stock } from "../../domain/stock/entity/stock";
import { StockGateway } from "../../domain/stock/gateway/stock.gateway";
import { Usecase } from "../use-case";

export type StockInputDTO = {
    id?: string;
    id_product: string;
    quantity: number;
    created_at?: string;
    updated_at?: string;
}

export type StockOutputDTO = void;

export class CreateStockUsecase implements Usecase<StockInputDTO, StockOutputDTO>{

    public constructor(private readonly stockGateway: StockGateway, private readonly productGateway: ProductGateway){}

    public static create(stockGateway: StockGateway, productGateway: ProductGateway){
        return new CreateStockUsecase(stockGateway, productGateway);
    }

    public async execute({id_product, quantity}: StockInputDTO): Promise<void> {

        const aStock = Stock.create(id_product, quantity, this.productGateway);

        await this.stockGateway.save(aStock);

    }

}