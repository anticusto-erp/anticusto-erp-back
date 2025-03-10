import { Request, Response } from "express";
import { DeleteProductUsecase } from "../../../../../use-case/product/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteProductRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly productService: DeleteProductUsecase){}

    public static create(productService: DeleteProductUsecase){
        return new DeleteProductRoute(
            "/product/:id",
            HttpMethod.DELETE,
            productService
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

            const {id} = request.params;

            try {

                await this.productService.execute(id);
                
                response.status(204).send();

            } catch (error: any) {
                response.status(400).json({error: error.message}).send();
            }

        }    
    }

}
