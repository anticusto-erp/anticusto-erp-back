import { Employer } from "../../employer/entity/employer"
import { AcessRole } from "../../access-role/entity/acess-role";
import { AcessRoleGateway } from "../../access-role/gateway/acess-role.gateway";
import { EmployerGateway } from "../../employer/gateway/employer.gateway";

export type UserProps = {
    id: string,
    username: string,
    password: string,
    email?: string,
    
    id_employer: string,
    id_access_role: string,
    
    acess_role: AcessRole | null,
    employer: Employer | null;
}

export class User {
    
    public constructor(private props: UserProps){}

    public static async create(username: string, password: string, id_employer: string, id_access_role: string, access_roleGateway: AcessRoleGateway, employerGateway: EmployerGateway, id?: string){

        const accessRole = await access_roleGateway.findById(id_access_role);
        const employer = await employerGateway.findById(id_employer);

        if(!accessRole && !employer){
            throw new Error(`${accessRole} or ${employer} not found`);
        }

        return new User({
            id: id ?? crypto.randomUUID().toString(),
            username,
            password,
            email: employer?.email,
            employer: employer,
            acess_role: accessRole,
            id_access_role,
            id_employer
        })

    }

    public with(props: UserProps){
        return new User(props);
    }

    public get id(){
        return this.props.id;
    }

    public get username(){
        return this.props.username;
    }

    public get password(){
        return this.props.password;
    }

    public get email(){
        return this.props.email;
    }

    public get id_employer(){
        return this.props.id_employer;
    }
    public get id_access_role(){
        return this.props.id_access_role;
    }

}