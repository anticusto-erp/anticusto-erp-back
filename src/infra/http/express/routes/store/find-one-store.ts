import { Request, Response } from "express";
import { FindOneStoreUsecase } from "../../../../../use-case/store/find-one.usecase";
import { HttpMethod, Route } from "../route";
import { Store } from "../../../../../domain/store/entity/store";

export type FindOneStoreResponseDTO = {}

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

                response.status(200).json(store).send();

                
            } catch (error) {
                
                response.status(404).json({data: error.message}).send();
            }

        }
        
    }



}
