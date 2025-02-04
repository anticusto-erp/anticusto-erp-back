import { AcessRoleGateway } from "../gateway/acess-role.gateway";

export type AcessRoleProps = {
    id: string,
    access_role: string,

    nivel_de_acesso?: string
}

export class AcessRole {

    public constructor(private props: AcessRoleProps){}

    public static async create(access_role: string, accessRoleGateway: AcessRoleGateway, id?: string){


        const alreadyExist = await accessRoleGateway.findByName(access_role);
        
        if(alreadyExist){
            throw new Error("Role already exist");
        }
        
        return new AcessRole({
            id: id ?? crypto.randomUUID().toString(),
            access_role
        })
        

    }

    public with(prop: AcessRoleProps){
        return new AcessRole(prop);
    }

    public get id(){
        return this.props.id
    }

    public get access_role(){
        return this.props.access_role
    }

    public get nivel_de_acesso(){
        return this.props.nivel_de_acesso
    }

}