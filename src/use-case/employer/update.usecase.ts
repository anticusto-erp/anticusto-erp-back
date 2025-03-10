import { Employer } from "../../domain/employer/entity/employer";
import { EmployerGateway } from "../../domain/employer/gateway/employer.gateway";
import { StoreGateway } from "../../domain/store/gateway/store.gateway";
import { Usecase } from "../use-case";

export type EmployerInputDTO = {
    id: string,
    firstName: string,
    lastName: string,
    bi: string,
    email: string,
    telephone: string
} 

export class UpdateEmployerUsecase implements Usecase<EmployerInputDTO, void>{

    public constructor(private readonly employerGateway: EmployerGateway, private readonly storeGateway: StoreGateway){}

    public static create(employerGateway: EmployerGateway, storeGateway: StoreGateway){
        return new UpdateEmployerUsecase(employerGateway, storeGateway);
    }

    public async execute(input: EmployerInputDTO): Promise<void> {

        const {id, bi, email, firstName, lastName, telephone} = input;

        const hasEmployer = await this.employerGateway.findById(id);
        const id_store: any = hasEmployer?.id_loja;


        if(!hasEmployer){
            throw new Error("Employer not found");
        }

        const payload: EmployerInputDTO = {
            id: id ?? hasEmployer.id,
            firstName: firstName ?? hasEmployer.primeiro_nome,
            lastName: lastName ?? hasEmployer.ultimo_nome,
            bi: bi ?? hasEmployer.bi,
            email: email ?? hasEmployer.email,
            telephone: telephone ?? hasEmployer.telefone
        }

        const employer = await Employer.create(payload.firstName, payload.lastName, payload.telephone, payload.email, payload.bi, id_store, this.storeGateway, payload.id);

        await this.employerGateway.update(employer);

    }

}
