import { Request, Response } from "express";
import { UpdateProductUsecase } from "../../../../../use-case/product/update.usecase";
import { HttpMethod, Route } from "../route";

export type ProductInputDTO = {
    id?: string;
    nome: string;
    preco: number;
    descricao: string;
    created_at?: string;
}

export class UpdateProductRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly productService: UpdateProductUsecase){}

    public static create(productService: UpdateProductUsecase){
        return new UpdateProductRoute(
            "/product/:id",
            HttpMethod.PATCH,
            productService
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
            const {nome, preco, descricao} = request.body;

            try {
                
                const payload: ProductInputDTO = {
                    id,
                    nome,
                    descricao,
                    preco,
                }

                await this.productService.execute(payload);

                response.status(204).send();

            } catch (error: any) {
                response.status(400).json({message: error.message}).send();
            }

        }
    }


}
