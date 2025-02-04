import { Employer } from "../../domain/employer/entity/employer";
import { EmployerGateway } from "../../domain/employer/gateway/employer.gateway";
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

    public constructor (private readonly employerGateway: EmployerGateway){}

    public static create (employerGateway: EmployerGateway){
        return new CreateEmployerUsecase(employerGateway);
    }

    public async execute({firstName, lastName, email, telephone, id_store, bi}: EmployerInputDTO): Promise<void> {

        try {

            const aEmployer = Employer.create(firstName, lastName, telephone, email, bi, id_store);

            await this.employerGateway.save(aEmployer);

        } catch (error) {
            throw new Error("Something went wrong, we are fixing for you");
        }

    }

}
