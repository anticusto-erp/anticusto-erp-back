import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ListClientUsecase } from "../../../../../use-case/client/list";

export type ClientOutputDTO = {
    name: string;
    bi: string;
    telephone: string;
}

export class ListClientRoute implements Route {
    
    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly listService: ListClientUsecase){}

    public static create(listService: ListClientUsecase){
        return new ListClientRoute(
            "/client",
            HttpMethod.GET,
            listService
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
            try {
                
                const output = await this.listService.execute();
                const responseBody = this.present(output);

                if(!response.headersSent){
                    response.status(200).json(responseBody).send();
                }

            } catch (error: any) {
                if(!response.headersSent){
                    response.status(400).json({error: error.message}).send();
                }
            }
        }
    }

    private present(input: any){
        return input
    }

}
