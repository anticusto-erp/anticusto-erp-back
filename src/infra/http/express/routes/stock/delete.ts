import { Request, Response } from "express";
import { DeleteStockUsecase } from "../../../../../use-case/stock/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteStockRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly stockService: DeleteStockUsecase){}

    public static create(stockService: DeleteStockUsecase){
        return new DeleteStockRoute(
            "/stock/:id",
            HttpMethod.DELETE,
            stockService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;    
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            const {id} = request.params;

            try {
                
                await this.stockService.execute(id);
                response.status(204).send();

            } catch (error: any) {
                response.status(400).json({message: error.message}).send();
            }

        }
    }

}
