import { Store } from "../../store/entity/store";
import { StoreGateway } from "../../store/gateway/store.gateway";

export type EmployerProps = {

    id: string;
    id_store: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    bi: string;
    store: Store,
    id_loja?: string;
    created_at?: Date;
    
    primeiro_nome?: string;
    ultimo_nome?: string;
    telefone?: string;
}

export class Employer{

    public constructor(private props: EmployerProps){}

    public static async create(firstName: string, lastName: string, telephone: string, email: string,bi: string, id_store: string, storeGateway: StoreGateway, id?: string){

        const store = await storeGateway.findOne(id_store);
        if(!store) {
            throw new Error(`Store with id ${id_store} not found`);
        }

        return new Employer({
            id: id ?? crypto.randomUUID().toString(),
            firstName,
            lastName,
            telephone,
            email,
            id_store,
            bi,
            store
        })
    }

    public with(prop: EmployerProps){
        return new Employer(prop);
    }

    public get id(){
        return this.props.id;
    }

    public get firstName(){
        return this.props.firstName;
    }

    public get lastName(){
        return this.props.lastName;
    }

    public get telephone(){
        return this.props.telephone;
    }

    public get email(){
        return this.props.email;
    }

    public get bi(){
        return this.props.bi;
    }

    public get id_store(){
        return this.props.id_store;
    }

    public get id_loja(){
        return this.props.id_loja;
    }

    public get primeiro_nome(){
        return this.props.primeiro_nome;
    }
    public get ultimo_nome(){
        return this.props.ultimo_nome;
    }
    public get telefone(){
        return this.props.telefone;
    }
    public get created_at(){
        return this.props.created_at;
    }

}