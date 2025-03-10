import { AcessRole } from "../../domain/access-role/entity/acess-role";
import { AcessRoleGateway } from "../../domain/access-role/gateway/acess-role.gateway";
import { Usecase } from "../use-case";

export class DeleteAccessRoleUsecase implements Usecase<string, void>{

    public constructor(private readonly accessRoleGateway: AcessRoleGateway){}

    public static create(accessRoleGateway: AcessRoleGateway){
        return new DeleteAccessRoleUsecase(accessRoleGateway);
    }

    public async execute(id: string): Promise<void> {

        const aAccessRole = await this.findAccessRole(this.accessRoleGateway, id);

        if(!aAccessRole){
            throw new Error("Access role not found!");
        }

        await this.accessRoleGateway.delete(id);
        
    }

    private async findAccessRole(accessRoleGateway: AcessRoleGateway, id: string): Promise<boolean>{
        const hasAccess = await accessRoleGateway.findById(id);
        if(!hasAccess){
            return false;
        }
        return true;
    }

}
