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

export class UpdateProductUsecase implements Usecase<ProductInputDTO, void>{

    public constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new UpdateProductUsecase(productGateway);
    }

    public async execute(input: ProductInputDTO): Promise<void> {

        const {id, nome, preco, descricao} = input;

        const aProduct = await this.productGateway.findOne(id);

        if(!aProduct){
            throw new Error("Product not found");
        }

        const payload: ProductInputDTO = {
            id: id ?? aProduct.id,
            nome: nome ?? aProduct.nome,
            preco: preco ?? aProduct.preco,
            descricao: descricao ?? aProduct.descricao
        }

        const product = await Product.create(payload.nome, payload.preco, payload.descricao, this.productGateway, payload.id);

        await this.productGateway.update(product);

    }

}
