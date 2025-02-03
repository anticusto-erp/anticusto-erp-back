import { Request, Response } from "express";
import { CreateStoreInputDTO, CreateStoreOutputDTO, CreateStoreUsecase } from "../../../../../use-case/store/create/create-store.usecase";
import { HttpMethod, Route } from "../route";
import { StoreRepository } from "../../../../repositories/store/store.repository";
import { Store } from "../../../../../domain/store/entity/store";

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

            const store = this.createstoreService.execute(input);
            const resp = this.present(store);
                // const aStoreRepository = StoreRepository.create();
                // aStoreRepository.save(input)

            // const output: CreateStoreResponseDTO = this.present(input)

            response.status(201).json(resp).send();

        }
    }


    public getMethod(): string {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }


    private present(input: CreateStoreOutputDTO): CreateStoreOutputDTO{
        const response = {id: input.id};
        return response;
    }

} 