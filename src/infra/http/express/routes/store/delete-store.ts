import { Request, Response } from "express";
import { DeleteStoreUsecase } from "../../../../../use-case/store/delete-store.usecase";
import { HttpMethod, Route } from "../route";

export type DeleteStoreResponseDTO = void;

export class DeleteStoreRoute implements Route {

    // private deletestoreService: DeleteStoreUsecase;

    public constructor(private readonly path: string, private readonly method: string, private readonly deletestoreService: DeleteStoreUsecase){}

    public static create(deletestoreService: DeleteStoreUsecase){
        return new DeleteStoreRoute(
            "/store/:id",
            HttpMethod.DELETE,
            deletestoreService
        );
    }

    public getHandler() {

        return async (request: Request, response: Response) => {

            const {id} = request.params;

            try {
                
                await this.deletestoreService.execute(id);            
                response.status(204).send()

            } catch (error) {
                response.status(404).json({data: error.message}).send()
                
            }

        }
        
    }


    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;
    }

}
