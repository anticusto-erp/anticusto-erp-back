import { Request, Response } from "express";
import { UpdateStoreUsecase } from "../../../../../use-case/store/update-store.usecase";
import { HttpMethod, Route } from "../route";

export type UpdateStoreRouteDTO = {
    id: string,
    name_store: string,
    address: string,
    contact: string
}

export class UpdateStoreRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly updateService: UpdateStoreUsecase){}

    public static create(updateService: UpdateStoreUsecase){
        return new UpdateStoreRoute(
            "/store/:id",
            HttpMethod.PATCH,
            updateService
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
            const  {name_store, address, contact} = request.body;

            try {

                const payload: UpdateStoreRouteDTO = {
                    id,
                    name_store,
                    address,
                    contact,
                }

                const update = await this.updateService.execute(payload);

                response.status(204).send();


            } catch (error) {
                throw new Error(error.message);
            }

        } 
        
    }

}

