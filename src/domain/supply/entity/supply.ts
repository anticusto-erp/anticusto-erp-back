import { SupplyGateway } from "../gateway/supply.gateway";

export type SupplyProps = {

    id: string;
    nome: string;
    telefone: string;
    nif: string;
    created_at?: Date;
    updated_at?: Date

}

export class Supply {

    public constructor (private readonly props: SupplyProps){}

    public static async create(nome: string, telefone: string, nif: string, supplyGateway: SupplyGateway, id?: string){

        const aSupply = await supplyGateway.findNifSupply(nif);

        if(aSupply){
            throw new Error ("Supply already exists");
        }

        const currentData = new Date("1111-11-11");

        return new Supply({
            id: id ?? crypto.randomUUID().toString(),
            nome,
            nif,
            telefone
        })
    }


    public with(props: SupplyProps){
        return new Supply(props);
    }


    public get id(){
        return this.props.id;
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
