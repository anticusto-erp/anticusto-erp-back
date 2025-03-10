import { Request, Response } from "express";
import { DeleteClientUsecase } from "../../../../../use-case/client/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteClientRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly clientService: DeleteClientUsecase){}

    public static create(clientService: DeleteClientUsecase){
        return new DeleteClientRoute(
            "/client/:id",
            HttpMethod.DELETE,
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

                await this.clientService.execute(id);
                response.status(204).send();

            } catch (error: any) {
                response.status(400).json({message: error.message})
            }
        }    
    }

}
