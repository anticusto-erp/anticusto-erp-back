import { ClientGateway } from "../gateway/client.gataway";

export type clientProps = {
    id?: string,
    nome: string,
    bi: string;
    telefone: string;
}

export class Client {

    public constructor(private readonly props: clientProps){}

    public static async create(nome: string, bi: string, telefone: string, id?: string){


        return new Client({
            id: id ?? crypto.randomUUID().toString(),
            nome,
            bi, 
            telefone
        });
    }

    public with(props: clientProps){
        return new Client(props);
    }

    public get id(){
        return this.props.id;
    }

    public get nome(){
        return this.props.nome;
    }

    public get bi(){
        return this.props.bi;
    }

    public get telefone(){
        return this.props.telefone;
    }

}