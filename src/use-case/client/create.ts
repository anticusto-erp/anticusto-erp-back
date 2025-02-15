import { Client } from "../../domain/client/entity/client";
import { ClientGateway } from "../../domain/client/gateway/client.gataway";
import { Usecase } from "../use-case";

export type ClientInputDTO = {
    name: string;
    bi: string;
    telephone: string;
}

export type ClientOutputDTO = void;

export class ClientUsecase implements Usecase<ClientInputDTO, ClientOutputDTO> {

    public constructor(private clientGateway: ClientGateway){}

    public static create(clientGateway: ClientGateway){
        return new ClientUsecase(clientGateway);
    }

    public async execute({name, bi, telephone}: ClientInputDTO): Promise<void> {

        try {

            const aCliente = await Client.create(name, bi, telephone, this.clientGateway);
            await this.clientGateway.save(aCliente);
            
        } catch (error: any) {
            throw new Error(error?.message);
        }

    }

}