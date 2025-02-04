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

        console.log("usecase", access_role);
        
        try {

            const aAccessRole = AcessRole.create(access_role); 
            
            await this.accessRoleGateway.save(aAccessRole);
            
        } catch (error) {
            throw new Error("Something went wrong, we are fixing for you");
        }

    }

}
