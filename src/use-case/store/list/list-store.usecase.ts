import {Usecase} from "../../use-case";
import {StoreGateway} from "../../../domain/store/gateway/store.gateway";
import { Store } from "../../../domain/store/entity/store";

export type ListStoreInputDTO = void;

export type ListStoreOutputDTO = {
    loja: {
        id: string;
        nome: string;
        endereco: string;
        contacto: string;
        tenant_key: string;
    }[]
}

export class ListStoreUsecase implements Usecase<ListStoreInputDTO, ListStoreOutputDTO>{
    
    private constructor(private readonly storegateway: StoreGateway){}

    public static create(storegateway: StoreGateway){
        return new ListStoreUsecase(storegateway);
    }

    public async execute(): Promise<any> {
        const aStore = await this.storegateway.list();
        const output = this.present(aStore);
        
        return output;
    
    }

    private present(input: Store[]){

        return input.map((input)=> {
            return {
                id: input.id,
                nome: input.nome,
                endereco: input.endereco,
                contacto: input.contacto,
                tenant_key: input.tenant_key,
            }
        })



        
    }

}