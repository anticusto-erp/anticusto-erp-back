import { Product } from "../../domain/product/entity/product";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../use-case";

export type ProductInputDTO = {
    id?: string;
    nome: string;
    preco: number;
    descricao: string;
    created_at?: string;
}

export type ProductOutputDTO = void;

export class CreateProductUsecase implements Usecase<ProductInputDTO, ProductOutputDTO>{

    public constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new CreateProductUsecase(productGateway);
    }

    public async execute({nome, preco, descricao}: ProductInputDTO): Promise<void> {

        try {

            const aProduct = await Product.create(nome, preco, descricao, this.productGateway);

            await this.productGateway.save(aProduct);


        } catch (error: any) {
            throw new Error(error.message);
        }

    }

}
