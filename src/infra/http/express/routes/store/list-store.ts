import { Request, Response } from "express";
import { ListStoreOutputDTO, ListStoreUsecase } from "../../../../../use-case/store/list-store.usecase";
import { HttpMethod, Route } from "../route";

export type ListStoreRouteResponseDTO = {
    loja: {
        id: string;
        nome: string;
        endereco: string;
        contacto: string;
        tenant_key: string;
        created_at: Date
    }[]
}


export class ListStoreRoute implements Route {

    public constructor(private readonly path: string, private readonly method: string, private readonly listStoreService: ListStoreUsecase ){}

    public static create(listStoreService: ListStoreUsecase){
        return new ListStoreRoute(
            "/store",
            HttpMethod.GET,
            listStoreService
        );
    }


    public getHandler() {
        return async (request: Request, response: Response) => {
            try {
                const output = await this.listStoreService.execute();
                const responseBody = this.present(output);

                if(!response.headersSent){
                    response.status(200).json(responseBody).send();
                }
                
            } catch (error: any) {
                if(!response.headersSent) {
                    response.status(400).json({data: error.message}).send();
                }
                
            }
        }
    }

    private  present(input: ListStoreOutputDTO): ListStoreRouteResponseDTO{
        return input
    }

    public getMethod(): string {
        return this.method
    }

    public getPath(): string {
        return this.path;
    }

} 