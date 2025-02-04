import { Request, Response } from "express";
import { CreateStoreInputDTO, CreateStoreUsecase } from "../../../../../use-case/store/create-store.usecase";
import { HttpMethod, Route } from "../route";

export type CreateStoreResponseDTO = {
    id: string;
}

export class CreateStoreRoute implements Route {

    private createstoreService: CreateStoreUsecase;

    private constructor(private readonly path: string, private readonly method: string, createstoreService: CreateStoreUsecase){
        this.createstoreService = createstoreService;
    }

    public static create(createstoreService: CreateStoreUsecase){
        return new CreateStoreRoute(
            "/store",
            HttpMethod.POST,
            createstoreService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const {name_store, address, contact} = request.body;

            const input: CreateStoreInputDTO = {
                name_store,
                address,
                contact,
            }
            try {

                const isvalidate: Array<keyof CreateStoreInputDTO> = ["name_store", "address", "contact"];
                            
                for(const key of isvalidate){
                    if(input[key] === undefined || input[key] === null || input[key] === "" || input[key] === " "){
                        throw new Error(` ${key} can't be a undefined or null`);
                    }
                }

                this.createstoreService.execute(input);

                response.status(201).json().send();

            } catch (error) {
                response.status(201).json({message: error.message}).send();
            }

        }
    }


    public getMethod(): string {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

} 