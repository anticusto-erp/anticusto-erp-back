import { Request, Response } from "express";
import { CreateProductUsecase } from "../../../../../use-case/product/create.usecase";
import { HttpMethod, Route } from "../route";

export type ProductInputDTO = {
    id?: string;
    nome: string;
    preco: number;
    descricao: string;
    created_at?: string;
}

export class CreateProductRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly productService: CreateProductUsecase){}

    public static create(productService: CreateProductUsecase){
        return new CreateProductRoute(
            "/product",
            HttpMethod.POST,
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

            const {name, price, description} = request.body;

            try {

                const payload: ProductInputDTO = {
                    nome: name,
                    preco: price,
                    descricao: description
                }

                const isValidate: Array<keyof ProductInputDTO> = ["nome", "preco", "descricao"];
                for(const key of isValidate){
                    if(payload[key] === undefined || payload[key] === null || payload[key] === ""){
                        throw new Error(` ${key} can't be empty, null or undefined`);
                    }
                }

                await this.productService.execute(payload);
                response.status(201).json().send()

                
            } catch (error: any) {
                response.status(404).json({message: error.message}).send();
            }

        }
    }

}
