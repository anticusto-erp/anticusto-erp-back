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

    public static create(id_usuario: string, id_produto: string, quantidade: number, id_cliente?: string,  id?: string){

        const client_id = id_cliente == "" ? "S/C" : id_cliente;

        return new Sale ({
            id: id ?? crypto.randomUUID().toString(),
            id_usuario,
            id_cliente: client_id ?? "S/C",
            id_produto,
            quantidade
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