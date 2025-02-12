import { Request, Response } from "express";
import { ListStockUsecase } from "../../../../../use-case/stock/list.usecase";
import { HttpMethod, Route } from "../route";
import { Stock } from "../../../../../domain/stock/entity/stock";

export type StockResponseDTO = {
    estoque: {
        id: string;
        id_producto: string;
        quantidade: number,
        created_at: Date;
        updated_at: Date;
    }
}

export class ListStockRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly listService: ListStockUsecase){}

    public static create(listService: ListStockUsecase){
        return new ListStockRoute(
            "/stock",
            HttpMethod.GET,
            listService
        )
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;    
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            try {
                
                const output = await this.listService.execute();
                const responseBody = this.present(output);
                if(!response.headersSent){
                    response.status(200).json(responseBody).send();
                }

            } catch (error: any) {
                if(!response.headersSent){
                    response.status(400).json({message: error?.message}).send();
                }
            }
        }
    }

    private present(input: StockResponseDTO){
        return input;
    }


}
