import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../use-case";

export type ProductOutputDTO = {

    product: {
        id: string;
        nome: string;
        preco: number;
        descricao: string;
        created_at: string;
    }[]
}

export type ProductInputDTO = void;

export class ListProductUsecase implements Usecase<ProductInputDTO, ProductOutputDTO>{

    public constructor(private productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new ListProductUsecase(productGateway);
    }

    public async execute(): Promise<any> {

        const aProduct = await this.productGateway.list();
        const output = this.present(aProduct);

        return output;


    }

    private present(input: Product[]){
        
        const result = input.map((input) => {
            
            return {
                id: input.id,
                nome: input.nome,
                preco: +input.preco,
                descricao: input.descricao,
                created_at: input.created_at
            }
        })

        return result

    }

}
