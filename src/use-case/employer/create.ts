import { Employer } from "../../domain/employer/entity/employer";
import { EmployerGateway } from "../../domain/employer/gateway/employer.gateway";
import { Store } from "../../domain/store/entity/store";
import { StoreGateway } from "../../domain/store/gateway/store.gateway";
import { FindOneStoreRoute } from "../../infra/http/express/routes/store/find-one-store";
import { StoreRepository } from "../../infra/repositories/store/store.repository";
import { FindOneStoreUsecase } from "../store/find-one.usecase";
import {Usecase} from "../use-case";

export type EmployerInputDTO = {
    id_store: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    bi: string;
    created_at?: Date;
}

export type EmployerOutputDTO = void;


export class CreateEmployerUsecase implements Usecase<EmployerInputDTO, EmployerOutputDTO>{

    public constructor (private readonly employerGateway: EmployerGateway, private readonly storeGateway: StoreGateway){}

    public static create (employerGateway: EmployerGateway, storeGateway: StoreGateway){
        return new CreateEmployerUsecase(employerGateway, storeGateway);
    }

    public async execute({firstName, lastName, email, telephone, id_store, bi}: EmployerInputDTO): Promise<void> {

        try {

            const aEmployer = await Employer.create(firstName, lastName, telephone, email, bi, id_store, this.storeGateway);

            await this.employerGateway.save(aEmployer);

        } catch (error) {
            throw new Error("Something went wrong, we are fixing for you");
        }

    }

}
