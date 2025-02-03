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

    public async execute(): Promise<ListStoreOutputDTO> {
        const aStore = await this.storegateway.list();
        const output = this.present(aStore);

        console.log("Usecase", output);
        
        return output;
    
    }

    private present(input: Store[]){

        return {
            loja: input.map((p) => {
                return {
                    id: p.id,
                    nome: p.nome,
                    endereco: p.endereco,
                    contacto: p.contacto,
                    tenant_key: p.tenant_key

                }
            })

            // loja: loja.map((loja) => {
            //     return {
            //         id: loja.id,
            //         nome: loja.nome,
            //         endereco: loja.endereco,
            //         contacto: loja.contacto,
            //         tenant_key: loja.tenant_key,
            //     }
            // })

        }
        
    }

}