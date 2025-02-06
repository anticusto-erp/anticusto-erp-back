import { AcessRoleGateway } from "../../domain/access-role/gateway/acess-role.gateway";
import { EmployerGateway } from "../../domain/employer/gateway/employer.gateway";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../use-case";
import bcrypt from "bcrypt";

export type UserInputDTO = {
    username: string,
    password: string,
    
    id_employer: string,
    id_access_role: string,
    
}

export type UserOutputDTO = void;

export class CreateUserUsecase implements Usecase<UserInputDTO,UserOutputDTO>{

    public constructor(private readonly userGateway: UserGateway, private readonly accessGateway: AcessRoleGateway, private readonly employerGateway: EmployerGateway){}

    public static create (userGateway: UserGateway, accessRoleGateway: AcessRoleGateway, employerGateway: EmployerGateway){
        return new CreateUserUsecase(userGateway, accessRoleGateway, employerGateway);
    }

    public async execute({username, password, id_employer, id_access_role}: UserInputDTO): Promise<void> {

        try {

            const hasedPassword = await this.hashedPassword(password);

            const aUser = await User.create(username, hasedPassword, id_employer, id_access_role, this.accessGateway ,this.employerGateway);
            
            const userExist = await this.userGateway.findOne(aUser.id_employer);
            if(userExist){
                throw new Error("User already exist");
            }
            
            await this.userGateway.save(aUser);
            
        } catch (error: any) {
            throw new Error(error.message);
        }

    }


    private async hashedPassword(password: string){
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password, salt);

        return hasedPassword;
    }


}
