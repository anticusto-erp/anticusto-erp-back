import { Request, Response } from "express";
import { FindOneProductUsecase } from "../../../../../use-case/product/find-one.usecase";
import { HttpMethod, Route } from "../route";

export type ProductOutputDTO = {
    id: string;
    nome: string;
    preco: number;
    descricao: string;
    created_at: string;
}

export class FindOneProductRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly productService: FindOneProductUsecase){}

    public static create(productService: FindOneProductUsecase){
        return new FindOneProductRoute(
            "/product/:id",
            HttpMethod.GET,
            productService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            
            const {id} = request.params;

            try {

                const aProduct = await this.productService.execute(id);

                const output = this.present(aProduct);

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

    private present(input: ProductOutputDTO){
        const output: ProductOutputDTO = {
            id: input.id,
            nome: input.nome,
            preco: +input.preco,
            descricao: input.descricao,
            created_at: input.created_at
        }

        return output;
    }

}
