import { Store } from "../../../domain/store/entity/store";
import { StoreGateway } from "../../../domain/store/gateway/store.gateway";
import { Usecase } from "../../use-case";

export type CreateStoreInputDTO = {
    name_store: string;
    address: string;
    contact: string;
}

export type CreateStoreOutputDTO = {
    id: string;
}

export class CreateStoreUsecase implements Usecase<CreateStoreInputDTO, CreateStoreOutputDTO>{

    private constructor(private readonly storegateway: StoreGateway){}

    public static create(storegateway: StoreGateway){
        return new CreateStoreUsecase(storegateway);
    }

    public async exceute({name_store, address, contact}: CreateStoreInputDTO): Promise<CreateStoreOutputDTO> {
        const aStore = Store.create(name_store, address, contact);
        await this.storegateway.save(aStore);

        const output = this.present(aStore);
        
        return output;
    }

    public present(store: Store): CreateStoreOutputDTO{
        const output: CreateStoreOutputDTO = {
            id: store.id
        }

        return output;
    }

}