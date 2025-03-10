import { response } from "express";
import { Client } from "../../domain/client/entity/client";
import { ClientGateway } from "../../domain/client/gateway/client.gataway";
import { Usecase } from "../use-case";

export type ClientOutputDTO = {
    id?: string,
    name: string;
    bi: string;
    telephone: string;
}

export class FindOneClientUsecase implements Usecase<string, ClientOutputDTO> {

    public constructor(private readonly clientGateway: ClientGateway){}

    public static create(clientGateway: ClientGateway){
        return new FindOneClientUsecase(clientGateway);
    }

    public async execute(id: string): Promise<ClientOutputDTO | any> {

        const hasClient = await this.clientGateway.findOne(id);

        if(!hasClient){
            throw new Error("Client not found");
        }

        return hasClient;

    }

}
