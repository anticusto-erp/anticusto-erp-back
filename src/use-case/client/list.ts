import { Client } from "../../domain/client/entity/client";
import { ClientGateway } from "../../domain/client/gateway/client.gataway";
import { Usecase } from "../use-case";

export type ClientOutputDTO = {
    client: {
        id?: string,
        name: string;
        bi: string;
        telephone: string;
    }[]
}

export type ClientInputDTO = void;

export class ListClientUsecase implements Usecase<ClientInputDTO, ClientOutputDTO>{

    public constructor(private clientGateway: ClientGateway){}

    public static create(clientGateway: ClientGateway){
        return new ListClientUsecase(clientGateway);
    }

    public async execute(): Promise<any> {

        const aClient = await this.clientGateway.list();
        const output = this.present(aClient);

        return output;

    }

    private present(input: Client[]): Promise<any> {

        const response = Promise.all(input.map( async (input) => {
                return {
                    id: input.id,
                    name: input.nome,
                    bi: input.bi,
                    telephone: input.telefone,
                }
            })
        )
        return response;
        
    }

}
