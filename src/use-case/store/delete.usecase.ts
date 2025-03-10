import { EmployerGateway } from "../../domain/employer/gateway/employer.gateway";
import { Usecase } from "../use-case";

export class DeleteEmployerUsecase implements Usecase<string, void>{

    public constructor(private readonly employerGateway: EmployerGateway){}

    public static create(employerGateway: EmployerGateway){
        return new DeleteEmployerUsecase(employerGateway);
    }

    public async execute(id: string): Promise<void> {

        const hasEmployer = await this.employerGateway.findById(id);

        if(!hasEmployer){
            throw new Error("Employer not found");
        }

        await this.employerGateway.delete(id);

    }

}
