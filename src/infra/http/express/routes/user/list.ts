import { Request, Response } from "express";
import { ListUserUsecase, UserOutputDTO } from "../../../../../use-case/user/list";
import { HttpMethod, Route } from "../route";

export type UserRouteResponseDTO = {
    
    user: {
        id: string;
        username: string;
        password?: string;
        
        id_employer: string;
        id_access_role: string;
    }
    
}


export class ListUserRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly userService: ListUserUsecase){}

    public static create(userService: ListUserUsecase){
        return new ListUserRoute(
            "/user",
            HttpMethod.GET,
            userService
        )
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;
    }

    public getHandler(){

        return async (request: Request, response: Response) => {

            try {

                const output = await this.userService.execute();
                const responseBody = this.present(output);

                if(!response.headersSent) {
                    response.status(200).json(responseBody).send();
                }
                
            } catch (error) {

                if(!response.headersSent){
                    response.status(404).json({message: error.message}).send();
                }
            }

        }
    }

    private present(input: UserOutputDTO): UserRouteResponseDTO {
        return input;
    }

}
