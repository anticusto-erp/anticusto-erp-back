import { ProductGateway } from "../gateway/product.gateway";

export type ProductProps = {
    id: string;
    name: string;
    preco: number;
    descricao: string;
    created_at: string;
}

export class Product {

    public constructor(private props: ProductProps){}


    public static async create(name: string, preco: number, descricao: string, id: string, productGateway: ProductGateway){

        const productExists = await productGateway.findOne(id);

        if(productExists){
            throw new Error("Product already exists");
        }

        const currentData = new Date().toISOString().split('T')[0];

        return new Product({
            id: id ?? crypto.randomUUID().toString(),
            name,
            preco,
            descricao,
            created_at:  currentData
        })
    }
    

}
