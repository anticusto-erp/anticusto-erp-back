import { Request, Response } from "express";
import { CreateClientUsecase } from "../../../../../use-case/client/create";
import { HttpMethod, Route } from "../route";

export type ClientInputDTO = {
    name: string;
    bi: string;
    telephone: string;
}

export class CreateClientRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly clientService: CreateClientUsecase){}

    public static create(clientService: CreateClientUsecase){
        return new CreateClientRoute(
            "/client",
            HttpMethod.POST,
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
            
            const {name, bi, telephone} = request.body;

            try {
                const payload: ClientInputDTO = {
                    name,
                    bi,
                    telephone
                }

                const isValidate: Array<keyof ClientInputDTO> = ["name", "bi", "telephone"];
                for(const key of isValidate){
                    if(payload[key] === undefined || payload[key] === null || payload[key] == ""){
                        response?.status(400)?.json(`${key} can't be empty, undefined or null`)?.send();
                        return;
                    }
                }

                await this.clientService.execute(payload);

            } catch (error: any) {
                response.status(400).json({message: error?.message}).send();
            }
        }
    }

}
