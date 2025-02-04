import { Store } from "../../domain/store/entity/store";
import { StoreGateway } from "../../domain/store/gateway/store.gateway";
import { Usecase } from "../use-case";

export type UpdateStoreInputDTO = {
    id: string,
    name_store: string,
    address: string,
    contact: string,
}

export type UpdateStoreOutputDTO = void;

export class UpdateStoreUsecase implements Usecase<UpdateStoreInputDTO, UpdateStoreOutputDTO>{

    public constructor(private readonly storeGateway: StoreGateway){}

    public static create(storeGateway: StoreGateway){
        return new UpdateStoreUsecase(storeGateway);
    }

    public async execute(input: UpdateStoreInputDTO): Promise<void> {

        const {id, name_store, address, contact} = input;   

        try {
            
            const updateStore = await this.storeGateway.findOne(id);

            if(!updateStore){
                throw new Error("Store not found");
            }

            const updatePayload: UpdateStoreInputDTO =  {
                id: id ?? updateStore.id,
                contact: contact ?? updateStore.contacto,
                address: address ?? updateStore.endereco,
                name_store: name_store ?? updateStore.nome,
            }

            const aStore = Store.create(updatePayload.name_store, updatePayload.address, updatePayload.contact, updateStore.tenant_key, id);

            await this.storeGateway.update(aStore);

        } catch (error) {
            throw new Error("Something went wrong, we are fixing for you");
        }

    }

}
