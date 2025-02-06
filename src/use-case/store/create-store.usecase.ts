import { Store } from "../../domain/store/entity/store";
import { StoreGateway } from "../../domain/store/gateway/store.gateway";
import { Usecase } from "../use-case";

export type CreateStoreInputDTO = {
    name_store: string;
    address: string;
    contact: string;
}

export type CreateStoreOutputDTO = void

export class CreateStoreUsecase implements Usecase<CreateStoreInputDTO, CreateStoreOutputDTO>{

    private constructor(private readonly storegateway: StoreGateway){}

    public static create(storegateway: StoreGateway){
        return new CreateStoreUsecase(storegateway);
    }

    public async execute({name_store, address, contact}: CreateStoreInputDTO): Promise<CreateStoreOutputDTO> {

        try {            
    
            const aStore = Store.create(name_store, address, contact);
    
            await this.storegateway.save(aStore);
        } catch (error: any) {

            throw new Error(error.message);
            
        }

    }

}