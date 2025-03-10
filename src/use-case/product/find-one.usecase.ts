import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../use-case";

export type ProductOutputDTO = {
    id: string;
    nome: string;
    preco: number;
    descricao: string;
    created_at: string;
}

export class FindOneProductUsecase implements Usecase<string, ProductOutputDTO>{

    public constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new FindOneProductUsecase(productGateway);
    }

    public async execute(id: string): Promise<ProductOutputDTO | any> {
        
        const output = await this.productGateway.findOne(id);

        if(!output){
            throw new Error("Product not found");
        }
        
        return output;

    }

}
