import { Stock } from "../../domain/stock/entity/stock";
import { StockGateway } from "../../domain/stock/gateway/stock.gateway";
import { Usecase } from "../use-case";

type StockInputDTO = {
    id: string,
    quantidade: number
}

export class UpdateStockUsecase implements Usecase<StockInputDTO, void> {

    public constructor(private readonly stockGateway: StockGateway){}

    public static create(stockGateway: StockGateway){
        return new UpdateStockUsecase(stockGateway);
    }

    public async execute({id, quantidade}: StockInputDTO): Promise<void> {

        const hasStock = await this.stockGateway.findOne(id);


        if(!hasStock){
            throw new Error("Stock not found");
        }

        const updatedData = new Date().toISOString().split('T')[0];
        const payload: any = {
            id: id ?? hasStock.id,
            quantidade: quantidade ?? hasStock.quantidade,
            updated_at: updatedData
        }

        
        console.log(payload);

        await this.stockGateway.update(payload);

    }

}
