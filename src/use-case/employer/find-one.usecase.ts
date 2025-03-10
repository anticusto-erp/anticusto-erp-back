import { EmployerGateway } from "../../domain/employer/gateway/employer.gateway";
import { Usecase } from "../use-case";

export type EmployerOutputDTO = {
    id_store: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    bi: string;
    created_at?: Date;
}

export class FindOneEmployerUsecase implements Usecase<string, EmployerOutputDTO>{

    public constructor(private readonly employerGateway: EmployerGateway){}

    public static create(employerGateway: EmployerGateway){
        return new FindOneEmployerUsecase(employerGateway);
    }

    public async execute(id: string): Promise<EmployerOutputDTO> {

        const hasEmployer = await this.employerGateway.findById(id);

        if(!hasEmployer){
            throw new Error("Employer not found");
        }
        console.log(hasEmployer);
        return hasEmployer;
    }

}
