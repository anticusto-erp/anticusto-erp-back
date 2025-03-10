import { Client } from "../../domain/client/entity/client";
import { ClientGateway } from "../../domain/client/gateway/client.gataway"
import { Usecase } from "../use-case"

export type ClientInputDTO = {
    id: string;
    name: string,
	bi: string,
	telephone: string
}

export class UpdateClientUsecase implements Usecase<ClientInputDTO, void>{

    public constructor(private readonly clientGateway: ClientGateway){}

    public static create(clientGateway: ClientGateway){
        return new UpdateClientUsecase(clientGateway);
    };

    public async execute(input: ClientInputDTO): Promise<void> {

        const {id, name, bi, telephone} = input;

        const hasClient = await this.clientGateway.findOne(id);

        if(!hasClient){
            throw new Error("Client not found");
        }

        const updateClient: ClientInputDTO = {
            id: id ?? input.id,
            name: name ?? input.name,
            bi: bi ?? input.bi,
            telephone: telephone ?? input.telephone
        } 

        const client = await Client.create(updateClient.name, updateClient.bi, updateClient.telephone, updateClient.id);

        await this.clientGateway.update(client);

    }

}
