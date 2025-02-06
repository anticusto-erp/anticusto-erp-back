import { SupplyGateway } from "../gateway/supply.gateway";

export type SupplyProps = {

    id_fornecedor: string;
    nome: string;
    telefone: string;
    nif: string;
    created_at?: Date;
    updated_at?: Date

}

export class Supply {

    public constructor (private readonly props: SupplyProps){}

    public static async create(id_fornecedor: string, nome: string, telefone: string, nif: string, supplyGateway: SupplyGateway){

        const aSupply = await supplyGateway.findNifSupply(nif);

        if(aSupply){
            throw new Error ("Supply already exists");
        }

        return new Supply({
            id_fornecedor: id_fornecedor ?? crypto.randomUUID().toString(),
            nome,
            nif,
            telefone
        })
    }


    public with(props: SupplyProps){
        return new Supply(props);
    }


    public get id_fornecedor(){
        return this.props.id_fornecedor;
    }

    public get nome(){
        return this.props.nome;
    }
    public get nif(){
        return this.props.nif;
    }
    public get telefone(){
        return this.props.telefone;
    }

    public get created_at(){
        return this.props.created_at;
    }

    public get updated_at(){
        return this.props.updated_at;
    }


}
