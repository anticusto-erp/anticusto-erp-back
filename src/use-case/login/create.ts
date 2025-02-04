import { Login } from "../../domain/login/entity/login";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../use-case"
import bcypt from "bcrypt";

export type LoginInputDTO = {
    telephone: string,
    password: string
}

export type LoginOutputDTO = {
    token: string;
}

export class LoginUsecase implements Usecase<LoginInputDTO, LoginOutputDTO> {

    public constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway){
        return new LoginUsecase(userGateway);
    }

    public async execute({password, telephone}: LoginInputDTO): Promise<LoginOutputDTO> {
        try {

            if(!telephone || !password){
                throw new Error("Telephone and password must be provides");
            }
            
            const employer = await this.userGateway.findTelephoneToLogin(telephone);

            const employerId = JSON.stringify(employer?.id);
            const id = JSON.parse(employerId);

            const user = await this.userGateway.findOneLogin(id);

            console.log("aaa", user, id)

            if(!user){
                throw new Error("User not found");
            }


            const newPassword = await bcypt.compare(password, user.password);


            if(!newPassword) {
                throw new Error("Incorrect password");
            }

            if(!user) {
                throw new Error("User not found");
            }

            const token: LoginOutputDTO = {token: "token ssas"}

            return token;

        } catch (error) {
            throw new Error(error.message);
        }
    }


    private async isPasswordValide(uncummingPassword: string, currentPassword: any){
        const verifyPassword = await bcypt.compare(uncummingPassword, currentPassword);
        return verifyPassword;
    }

}
