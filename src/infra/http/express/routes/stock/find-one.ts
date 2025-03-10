import { Request, Response } from "express";
import { FindOneStockUsecase } from "../../../../../use-case/stock/find-one.usecase";
import { HttpMethod, Route } from "../route";

export class FindOneStockRoute implements Route {
    
    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly stockService: FindOneStockUsecase){}

    public static create(stockService: FindOneStockUsecase){
        return new FindOneStockRoute(
            "/stock/:id",
            HttpMethod.GET,
            stockService
        );
    }

    public getPath(): string {
        return this.path;    
    }

    public getMethod(): HttpMethod {
        return this.method    
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            const {id} = request.params;

            try {

                const output = await this.stockService.execute(id);
                
                if(!response.headersSent){
                    response.status(200).json(output).send();
                }
                
            } catch (error: any) {
                if(!response.headersSent){
                    response.status(400).json({message: error.message}).send();
                }
            }

        }
    }

}
