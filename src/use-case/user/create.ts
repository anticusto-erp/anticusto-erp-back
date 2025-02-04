import { AcessRoleGateway } from "../../domain/access-role/gateway/acess-role.gateway";
import { EmployerGateway } from "../../domain/employer/gateway/employer.gateway";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../use-case";

export type UserInputDTO = {
    username: string,
    password: string,
    email?: string,
    
    id_employer: string,
    id_access_role: string,
    
    // acess_role: AcessRole | null,
    // employer: Employer | null;
}

export type UserOutputDTO = void;

export class CreateUserUsecase implements Usecase<UserInputDTO,UserOutputDTO>{

    public constructor(private readonly userGateway: UserGateway, private readonly accessGateway: AcessRoleGateway, private readonly employerGateway: EmployerGateway){}

    public static create (userGateway: UserGateway, accessRoleGateway: AcessRoleGateway, employerGateway: EmployerGateway){
        return new CreateUserUsecase(userGateway, accessRoleGateway, employerGateway);
    }

    public async execute({username, password, id_employer, id_access_role}: UserInputDTO): Promise<void> {

        try {

            const aUser = await User.create(username, password, id_employer, id_access_role, this.accessGateway ,this.employerGateway);

            console.log(aUser);
            
        } catch (error) {
            throw new Error(error.message);
        }

    }

}
