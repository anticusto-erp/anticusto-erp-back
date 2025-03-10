import { AcessRole } from "../../domain/access-role/entity/acess-role";
import { AcessRoleGateway } from "../../domain/access-role/gateway/acess-role.gateway";
import { Usecase } from "../use-case";

export type AccessRoleOutputDTO = AcessRole | null;

export class FindOneAccessRoleUsecase implements Usecase<string, AccessRoleOutputDTO> {

    public constructor(private readonly accessRoleGateway: AcessRoleGateway){}

    public static create(AccessRoleGateway: AcessRoleGateway){
        return new FindOneAccessRoleUsecase(AccessRoleGateway);
    }

    public async execute(id: string): Promise<any> {
        const aAccessRole = await this.accessRoleGateway.findById(id);
        // const output = this.present(aAccessRole);
        
        if(!aAccessRole){
            throw new Error("Access Role not found");
        }

        return aAccessRole;
    }

    // private present(input: AcessRole | any){
    //     return {
    //         id: input.id,
    //         access_role: input.nivel_de_acesso
    //     }
    // }

}
