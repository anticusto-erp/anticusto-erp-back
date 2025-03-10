import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Usecase } from "../use-case";

export class DeleteProductUsecase implements Usecase<string, void>{

    public constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway){
        return new DeleteProductUsecase(productGateway);
    }

    public async execute(id: string): Promise<void> {

        const hasProduct = await this.productGateway.findOne(id);

        if(!hasProduct){
            throw new Error("Product not found");
        }
        
        await this.productGateway.delete(id);

    }

}
