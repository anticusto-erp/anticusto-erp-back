import { StockGateway } from "../../domain/stock/gateway/stock.gateway";
import { Usecase } from "../use-case";

export class DeleteStockUsecase implements Usecase<string, void>{

    public constructor(private readonly stockGateway: StockGateway){}

    public static create(stockGateway: StockGateway){
        return new DeleteStockUsecase(stockGateway);
    }

    public async execute(id: string): Promise<void> {

        const hasStock = await this.stockGateway.findOne(id);

        if(!hasStock){
            throw new Error("Stock not found");
        }

        await this.stockGateway.delete(id);

    }

}
