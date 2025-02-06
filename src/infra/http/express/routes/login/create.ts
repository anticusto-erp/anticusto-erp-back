import { Request, Response } from "express";
import { LoginUsecase } from "../../../../../use-case/login/create";
import { HttpMethod, Route } from "../route";


export type LoginInputDTO = {
    telephone: string,
    password: string
}

export type LoginOuputDTO = {
    token: string
}


export class LoginRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly loginService: LoginUsecase){}


    public static create(loginService: LoginUsecase){
        return new LoginRoute(
            "/login",
            HttpMethod.POST,
            loginService
        )
    }

    public getMethod(): string {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    public getHandler() {

        return async (request: Request, response: Response) => {

            const {telephone, password} = request.body;

            try {

                const payload: LoginInputDTO = {
                    telephone: telephone,
                    password: password
                }

                const isValidate: Array<keyof LoginInputDTO> = ["telephone", "password"];

                for(const key of isValidate){
                    if(payload[key] === undefined || password[key] === null){
                        throw new Error(`${key} can't must be empty, undefined or null`);
                    }
                }

                const res = await this.loginService.execute(payload);

                response.status(200).json(res).send();
                
            } catch (error: any) {
                response.status(404).json({data: error.message}).send();
            }

        }
        
    }

}