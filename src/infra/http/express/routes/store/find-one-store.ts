import { Request, Response } from "express";
import { FindOneStoreUsecase } from "../../../../../use-case/store/find-one.usecase";
import { HttpMethod, Route } from "../route";
import { Store } from "../../../../../domain/store/entity/store";

export type FindOneStoreResponseDTO = {
    id: string,
    nome: string,
    endereco: string,
    contacto: string,
    tenant_key: string,
    created_at?: Date
}

export class FindOneStoreRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly findOneStoreService: FindOneStoreUsecase){}

    public static create(findOneStoreService: FindOneStoreUsecase){
        return new FindOneStoreRoute(
            "/store/:id",
            HttpMethod.GET,
            findOneStoreService
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

            const {id} = request.params

            try {
                
                const store = await this.findOneStoreService.execute(id);

                if(!store){
                    throw new Error("Store not found");
                }

                const res = this.present(store);

                response.status(200).json(res).send();

                
            } catch (error) {
                
                response.status(404).json({data: error.message}).send();
            }

        }
        
    }

    private present(input: Store){
        const store : FindOneStoreResponseDTO = {
            id: input.id,
            nome: input.nome,
            contacto: input.contacto,
            endereco: input.endereco,
            tenant_key: input.tenant_key,
            created_at: input.created_at
        }

        return store;
    }



}
