import { AcessRole } from "../../domain/access-role/entity/acess-role";
import { AcessRoleGateway } from "../../domain/access-role/gateway/acess-role.gateway";
import { Usecase } from "../use-case";

export type AccessRoleInputDTO = {
    nivel_de_acesso: string;
}

export type AccessRoleOutputDTO = void;

export class AccessRoleUsecase implements Usecase<AccessRoleInputDTO, AccessRoleOutputDTO>{

    public constructor(private readonly accessRoleGateway: AcessRoleGateway){}

    public static create(accessRoleGateway: AcessRoleGateway){
        return new AccessRoleUsecase(accessRoleGateway);
    }

    public async execute({nivel_de_acesso}: AccessRoleInputDTO): Promise<void> {
        
        try {

            const aAccessRole = AcessRole.create(nivel_de_acesso); 
            
            await this.accessRoleGateway.save(aAccessRole);
            
        } catch (error) {
            throw new Error("Something went wrong, we are fixing for you");
        }

    }

}
