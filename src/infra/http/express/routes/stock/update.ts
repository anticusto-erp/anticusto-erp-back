import { Request, Response } from "express";
import { UpdateStockUsecase } from "../../../../../use-case/stock/update.usecase";
import { HttpMethod, Route } from "../route";

export class UpdateStockRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly stockService: UpdateStockUsecase){}

    public static create(stockService: UpdateStockUsecase){
        return new UpdateStockRoute(
            "/stock/:id",
            HttpMethod.PATCH,
            stockService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler(){

        return async (request: Request, response: Response) => {

            const {id} = request.params;
            const {quantidade} = request.body

            try {

                const payload = {
                    id,
                    quantidade: +quantidade
                }

                await this.stockService.execute(payload);

                response.status(204).send();

            } catch (error: any) {
                response.status(400).json({messge: error.message}).send();
            }

        }
    }

}
