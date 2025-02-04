import { Employer } from "../../domain/employer/entity/employer";
import { EmployerGateway } from "../../domain/employer/gateway/employer.gateway";
import { Usecase } from "../use-case";

export type EmployerOutputDTO = {
    employer: {
        id_store: string;
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        bi: string;
        created_at?: Date;
    }
}

export type EmployerInputDTO = void;

export class ListEmployerUsecase implements Usecase<EmployerInputDTO, EmployerOutputDTO> {

    public constructor(private readonly employerGateway: EmployerGateway){}

    public static create (employerGateway: EmployerGateway){
        return new ListEmployerUsecase(employerGateway);
    }

    public async execute(input: void): Promise<any> {

        try {

            const aEmployer = await this.employerGateway.list();
            const output = this.present(aEmployer);

            return output;


        } catch (error) {
            throw new Error(error.message);
        }

    }

    private present(input: Employer[]){
        return input.map((input) => {
            return {
                id: input.id,
                firstName: input.id,
                lastName: input.id,
                email: input.id,
                telephone: input.id,
                bi: input.id,
                created_at: input.id,

            }
        })
    }

}
