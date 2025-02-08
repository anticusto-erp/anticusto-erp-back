import { Request, Response } from "express";
import { ListProductUsecase } from "../../../../../use-case/product/list.usecase";
import { HttpMethod, Route } from "../route";

export type ProductResponseDTO = {
    product: {
        id: string;
        nome: string;
        preco: number;
        descricao: string;
        created_at: string;
    }[]
}

export class ListProductRoute implements Route {
    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly productService: ListProductUsecase){}

    public static create(productService: ListProductUsecase){
        return new ListProductRoute(
            "/product",
            HttpMethod.GET,
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
            try {

                const aProductResult = await this.productService.execute();
                const responseBody = this.present(aProductResult);

                response.status(200).json(responseBody).send()

            } catch (error: any) {
                response.status(404).json({message: error.message}).send();
            }
        }
    }

    private present(input: ProductResponseDTO[]){
        return input;
    }

}
