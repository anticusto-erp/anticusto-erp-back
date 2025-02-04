import { AcessRole } from "../../domain/access-role/entity/acess-role";
import { AcessRoleGateway } from "../../domain/access-role/gateway/acess-role.gateway";
import { Usecase } from "../use-case";

export type AccessRoleInputDTO = {
    access_role: string;
}

export type AccessRoleOutputDTO = void;

export class CreateAccessRoleUsecase implements Usecase<AccessRoleInputDTO, AccessRoleOutputDTO>{

    public constructor(private readonly accessRoleGateway: AcessRoleGateway){}

    public static create(accessRoleGateway: AcessRoleGateway){
        return new CreateAccessRoleUsecase(accessRoleGateway);
    }

    public async execute({access_role}: AccessRoleInputDTO): Promise<void> {

        try {

            const aAccessRole = await AcessRole.create(access_role, this.accessRoleGateway); 
            
            await this.accessRoleGateway.save(aAccessRole);
            
        } catch (error) {
            throw new Error(error.message);
        }

    }

}
