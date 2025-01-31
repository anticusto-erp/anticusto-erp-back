import { Request, Response } from "express";
import { CreateStoreInputDTO, CreateStoreUsecase } from "../../../../../use-case/store/create/create-store.usecase";
import { HttpMethod, Route } from "../route";

export type CreateStoreResponseDTO = {
    id: string;
}

export class CreateStoreRoute implements Route {

    private constructor(private readonly path: string, private readonly method: string, createstoreService: CreateStoreUsecase){}

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
                contact
            }

            // const output: CreateStoreResponseDTO = await this.createstoreService

            response.status(201).json().send();

        }
    }


    public getMethod(): string {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }


    private present(input: CreateStoreResponseDTO): CreateStoreResponseDTO{
        const response = {id: input.id};
        return response;
    }

} 