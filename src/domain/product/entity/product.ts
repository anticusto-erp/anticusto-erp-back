import { ProductGateway } from "../gateway/product.gateway";

export type ProductProps = {
    id?: string;
    name: string;
    preco: number;
    descricao: string;
    created_at?: string;
}

export class Product {

    public constructor(private props: ProductProps){}


    public static async create(name: string, preco: number, descricao: string, productGateway: ProductGateway, id?: string){

        // const productExists = await productGateway.findOne(id);

        // console.log(productExists);

        // if(productExists){
        //     throw new Error("Product already exists");
        // }

        const currentData = new Date().toISOString().split('T')[0];

        return new Product({
            id: id ?? crypto.randomUUID().toString(),
            name,
            preco,
            descricao,
            created_at:  currentData
        })
    }

    public with(props: ProductProps){
        return new Product(props);
    }

    public get id(){
        return this.props.id;
    }
    
    public get name(){
        return this.props.name;
    }

    public get preco(){
        return this.props.preco;
    }

    public get descricao(){
        return this.props.descricao;
    }

    public get created_at(){
        return this.props.created_at;
    }

}
