import { Request, Response } from "express";
import { CreateUserUsecase } from "../../../../../use-case/user/create";
import { HttpMethod, Route } from "../route";

type UserInputDTO = {
    username: string,
    password: string,
    id_employer: string,
    id_access_role: string,
}

export class CreateUserRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly userService: CreateUserUsecase){}

    public static create (userService: CreateUserUsecase){
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            userService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;
    }

    public getHandler(){
        return async (request: Request, response: Response) => {

            const {username, password,id_employer, id_access_role} = request.body;


            try {

                const payload: UserInputDTO = {
                    username,
                    password,
                    id_access_role,
                    id_employer
                }

                const isValidate: Array<keyof UserInputDTO> = ["username", "password", "id_employer", "id_access_role"];
                for(const key of isValidate){
                    if(payload[key] == undefined || payload[key] == null || payload[key] == "" ){
                        throw new Error(`${key} can't be empty, null or undefined`);
                    }
                }

                await this.userService.execute(payload);
                response.status(201).send();
                
            } catch (error: any) {
                response.status(404).json({message: error.message}).send();
            }

        } 
    }

}