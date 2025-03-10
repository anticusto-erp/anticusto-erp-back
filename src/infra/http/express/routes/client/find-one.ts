import { Request, Response } from "express";
import { FindOneClientUsecase } from "../../../../../use-case/client/find-one.usecase";
import { HttpMethod, Route } from "../route";
import { Client } from "../../../../../domain/client/entity/client";

export type ClientOutputDTO = {
    id?: string,
    name: string;
    bi: string;
    telephone: string;
}

export class FindOneClientRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly clientService: FindOneClientUsecase){}

    public static create(clientService: FindOneClientUsecase){
        return new FindOneClientRoute(
            "/client/:id",
            HttpMethod.GET,
            clientService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;    
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            
            const {id} = request.params;

            try {

                const aClient = await this.clientService.execute(id);

                const output = this.present(aClient);

                if(!response.headersSent){
                    response.status(200).json(output).send();
                }

            } catch (error: any) {
                if(!response.headersSent){
                    response.status(400).json({message: error?.message}).send();
                }
            }
        }
    }

    private present(input: Client){
        const client: ClientOutputDTO = {
            id: input.id,
            name: input.nome,
            bi: input.bi,
            telephone: input.telefone,
        }
        return client;
    }

}
