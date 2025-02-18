import { ClientGateway } from "../../client/gateway/client.gataway";
import { ProductGateway } from "../../product/gateway/product.gateway";
import { UserGateway } from "../../user/gateway/user.gateway";

export type saleProps = {
    id?: string;
    id_cliente?: string;
    id_usuario: string;
    id_produto: string;
    quantidade: number;
    created_at?: Date;
}

export class Sale {

    public constructor(private readonly props: saleProps){}

    public static async create(id_usuario: string, id_produto: string, quantidade: number, productGateway: ProductGateway, clientGateway: ClientGateway, userGateway: UserGateway, id_cliente?: string, id?: string){

        const hasProduct = await productGateway.findOne(id_produto);
        const hasClient = await clientGateway.findOne(id_cliente);
        const hasUser = await userGateway.findOne(id_usuario);

        if(!hasProduct) {
            throw new Error("product not found");
        } else if(!hasClient){
            throw new Error("client not found");
        } else if(!hasUser){
            throw new Error("user not found");
        }

        const client_id = id_cliente == "" ? "S/C" : id_cliente;

        return new Sale ({
            id: id ?? crypto.randomUUID().toString(),
            id_usuario,
            id_cliente: client_id,
            id_produto,
            quantidade: +quantidade
        });
    }

    public with(props: saleProps){
        return new Sale(props);
    }

    public get id (){
        return this.props.id
    }
    public get id_usuario (){
        return this.props.id_usuario
    }
    public get id_cliente (){
        return this.props.id_cliente
    }
    public get quantidade (){
        return this.props.quantidade
    }
    public get id_produto (){
        return this.props.id_produto
    }
    public get created_at (){
        return this.props.created_at
    }


}