import { Store } from "../../domain/store/entity/store";
import { StoreGateway } from "../../domain/store/gateway/store.gateway";
import { Usecase } from "../use-case";

export type FindOneOutputStoreDTO = Store | null;

export class FindOneStoreUsecase implements Usecase<string, FindOneOutputStoreDTO> {

    public constructor(private readonly storeGateway: StoreGateway){}

    public static create(storeGateway: StoreGateway){
        return new FindOneStoreUsecase(storeGateway);
    }

    public async execute(id: string): Promise<FindOneOutputStoreDTO> {

        try {
            
            const store = this.storeGateway.findOne(id);

            if(!store){
                throw new Error("Store not found");
            }

            return store;

        } catch (error) {

            throw new Error("Something went wrong, we are fixing for you.");
        }

    }

}