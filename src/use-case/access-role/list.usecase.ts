import { AcessRole } from "../../domain/access-role/entity/acess-role";
import { AcessRoleGateway } from "../../domain/access-role/gateway/acess-role.gateway";
import { Usecase } from "../use-case";

export type AccessRoleOutputDTO = {
    access_role: {
        access_role: string;
    }[]
}

export type AccessRoleInputDTO = void;

export class ListAccesUsecase implements Usecase<AccessRoleInputDTO, AccessRoleOutputDTO>{

    public constructor(private readonly accessGateway: AcessRoleGateway){}

    public static create(accessGateway: AcessRoleGateway){
        return new ListAccesUsecase(accessGateway);
    }

    public async execute(): Promise<any> {
        const aAccessRole = await this.accessGateway.list();
        const output = this.present(aAccessRole);

        return output;
    }

    private present(input: AcessRole[]){
        return input.map((input) => {
            return {
                id: input.id,
                access_role: input.nivel_de_acesso
            }
        })
    }

}
