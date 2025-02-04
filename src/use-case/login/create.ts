import { Employer } from "../../domain/employer/entity/employer";
import { Store } from "../../domain/store/entity/store";
import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import jwt from "jsonwebtoken";

import { Usecase } from "../use-case"
import bcypt from "bcrypt";

export type LoginInputDTO = {
    telephone: string,
    password: string
}

export type LoginOutputDTO = {
    login:  {
        logindata: User | any,
        employer: Employer | any,
        store : Store | any
    },
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

            if(!employer){
                throw new Error("User not found");
            }
            
            const employerId = JSON.stringify(employer?.id);

            const storeId = employer && JSON.stringify(employer.id_loja);
            
            const parseStoreId = storeId && JSON.parse(storeId);

            const store = await this.userGateway.findStore(parseStoreId);

            console.log(parseStoreId);

            // const id = employerId;
            const id = "b47fec8d-9639-4f8c-859d-c2449cc1ac1e"

            const user = await this.userGateway.findOneLogin(id);
            
            
            if(!user){
                throw new Error("User not found");
            }

            await this.isPasswordValide(password, user.senha);

            if(!user) {
                throw new Error("User not found");
            }

            const {senha: undefined, ...logindata} = user;

            const keyToken = process.env.JWT;

            const token = await this.generateToken(keyToken, logindata);

            const data: LoginOutputDTO = {
                login: 
                {
                    logindata,
                    employer,
                    store
                },
                token: token
            }
            return data;

        } catch (error) {
            throw new Error(error.message);
        }
    }


    private async isPasswordValide(uncummingPassword: string, currentPassword: any){
        const verifyPassword = await bcypt.compare(uncummingPassword, currentPassword);

        if(!verifyPassword) {
            throw new Error("Incorrect password");
        }

        return verifyPassword;
    }

    private async generateToken(key: any, data: any) {

        const token = jwt.sign({data}, key, {expiresIn: '72h'})

        return token;
    }

}
