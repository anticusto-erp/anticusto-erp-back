import { ProductGateway } from "../../product/gateway/product.gateway";

export type StockProps = {
    id?: string;
    id_produto: string;
    quantidade: number;
    created_at?: string;
    updated_at?: string;
}

export class Stock {

    public constructor(private props: StockProps){}

    public static async create(id_produto: string, quantidade: number, productGateway: ProductGateway, updated_at?: string, id?: string){

        const existsProduct = await productGateway.findOne(id_produto);

        if(!existsProduct){
            throw new Error("Product doesn't exists.");
        }

        const createdData = new Date().toISOString().split('T')[0];
        const updatedData = new Date().toISOString().split('T')[0];

        return new Stock({
            id: id ?? crypto.randomUUID().toString(),
            id_produto,
            quantidade,
            created_at: createdData,
            updated_at: updated_at ?? updatedData
        });

    }

    public whith (props: StockProps) {
        return new Stock(props);
    }

    public get id(){
        return this.props.id;
    }

    public get id_produto(){
        return this.props.id_produto;
    }

    public get quantidade(){
        return this.props.quantidade;
    }

    public get created_at(){
        return this.props.created_at;
    }

    public get updated_at(){
        return this.props.updated_at;
    }

}
