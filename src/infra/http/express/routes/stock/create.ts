import { Request, Response } from "express";
import { CreateStockUsecase } from "../../../../../use-case/stock/create.usecase";
import { HttpMethod, Route } from "../route";

export type StockInputDTO = {
    id?: string;
    id_produto: string;
    quantidade: number;
    created_at?: string;
    updated_at?: string;
}

export type StockOutputDTO = void;

export class CreateStockRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly stockService: CreateStockUsecase){}

    public static create(stockService: CreateStockUsecase){
        return new CreateStockRoute(
            "/stock",
            HttpMethod.POST,
            stockService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            
            const {id_produto, quantidade} = request.body;

            try {

                const payload: StockInputDTO = {
                    id_produto,
                    quantidade
                }

                const isValidate: Array<keyof StockInputDTO> = ["id_produto", "quantidade"];
                for(const key of isValidate){
                    if(payload[key] === undefined || payload[key] === null || payload[key] === ""){
                        throw new Error(`${key} can't be empty, undefined or null`);
                    }
                }

                await this.stockService.execute({id_produto, quantidade});
                
            } catch (error: any) {
                response.status(404).json({message: error.message}).send()
            }
        }
    }

}
