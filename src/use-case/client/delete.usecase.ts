import { ClientGateway } from "../../domain/client/gateway/client.gataway";
import { Usecase } from "../use-case";

export class DeleteClientUsecase implements Usecase<string, void> {

    public constructor(private readonly clientgateway: ClientGateway){}

    public static create(clientGateway: ClientGateway){
        return new DeleteClientUsecase(clientGateway);
    }

    public async execute(id: string): Promise<void> {

        const existClient = await this.clientgateway.findOne(id);

        if(!existClient){
            throw new Error("Client not found");
        }

        await this.clientgateway.delete(id);

    }

}
