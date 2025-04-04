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
    }[]
}

export type EmployerInputDTO = void;

export class ListEmployerUsecase implements Usecase<EmployerInputDTO, EmployerOutputDTO> {

    public constructor(private readonly employerGateway: EmployerGateway){}

    public static create (employerGateway: EmployerGateway){
        return new ListEmployerUsecase(employerGateway);
    }

    public async execute(): Promise<any> {

        try {

            const aEmployer = await this.employerGateway.list();
            const output = this.present(aEmployer);

            return output;


        } catch (error: any) {
            throw new Error(error.message);
        }

    }

    private present(input: Employer[]): Promise<any>{

        const result = Promise.all(input.map( async (input) => {

            const idStore = JSON.stringify(input.id_loja);
            const parsedIdStore = idStore && JSON.parse(idStore);

            const aStore = await this.employerGateway.findStore(parsedIdStore);

            return {
                id: input.id,
                firstName: input.primeiro_nome,
                lastName: input.ultimo_nome,
                email: input.email,
                telephone: input.telefone,
                bi: input.bi,
                created_at: input.created_at,
                store: aStore

            }
        }));

        return result;
    }

}
