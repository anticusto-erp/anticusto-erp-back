import { Request, Response } from "express";
import { UpdateClientUsecase } from "../../../../../use-case/client/update.usecase";
import { HttpMethod, Route } from "../route";

export type ClientInputDTO = {
    id: string;
    name: string,
	bi: string,
	telephone: string
}

export class UpdateClientRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly clientService: UpdateClientUsecase){}

    public static create(clientService: UpdateClientUsecase){
        return new UpdateClientRoute(
            "/client/:id",
            HttpMethod.PATCH,
            clientService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;    
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const {id} = request.params;
            const {name, bi, telephone} = request.body;
            
            try {
                
                const payload: ClientInputDTO = {
                    id,
                    name,
                    bi,
                    telephone
                }

                await this.clientService.execute(payload);

            } catch (error: any) {
                response.status(400).json({message: error?.message}).send();
            }
        }
    }

}
