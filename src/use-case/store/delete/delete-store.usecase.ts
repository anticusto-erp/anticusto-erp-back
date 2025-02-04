import { Store } from "../../../domain/store/entity/store";
import { StoreGateway } from "../../../domain/store/gateway/store.gateway";
import { Usecase } from "../../use-case";

export type DeleteStoreInputDTO = {
    id: string;
}

export type DeleteStoreOutputDTO = void;

export class DeleteStoreUsecase implements Usecase<string, void>{

    public constructor(private readonly deleteGateway: StoreGateway){}

    public static create(deleteGateway: StoreGateway){
        return new DeleteStoreUsecase(deleteGateway);
    }

    public async execute(id: string): Promise<void> {
        try {
            // await this.deleteGateway.delete(id);
            return;
            
        } catch (error) {
            throw new Error("Something went wrong, we are fixing for you on use-case")
        }
    }

}