import { AcessRole } from "../../domain/access-role/entity/acess-role";
import { AcessRoleGateway } from "../../domain/access-role/gateway/acess-role.gateway";
import { Usecase } from "../use-case";

export type AccessRoleinputDTO = {
    id: string;
    access_role: string;
}

export class UpdateAccessRoleUsecase implements Usecase<AccessRoleinputDTO, void>{

    public constructor(private readonly accessGateway: AcessRoleGateway){}

    public static create(accessGateway: AcessRoleGateway){
        return new UpdateAccessRoleUsecase(accessGateway);
    }

    public async execute(input: AccessRoleinputDTO): Promise<void> {

        const {id, access_role} = input;

        const theAccessRole = await this.accessGateway.findById(id);

        if(!theAccessRole){
            throw new Error("Access Role not found");
        }

        const updateRole: AccessRoleinputDTO = {
            id: id ?? theAccessRole.id,
            access_role: access_role ?? theAccessRole.nivel_de_acesso
        }

        
        const aAccessRole = await AcessRole.create(updateRole.access_role, this.accessGateway, updateRole.id);
        
        await this.accessGateway.update(aAccessRole);

    }

}
