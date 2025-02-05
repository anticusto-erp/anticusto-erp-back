import { Request, Response } from "express";
import { EmployerOutputDTO, ListEmployerUsecase } from "../../../../../use-case/employer/list";
import { HttpMethod, Route } from "../route";
import { ListAccesUsecase } from "../../../../../use-case/access-role/list";

export type AccessRoleOutputDTO = {
    access_role: {
        access_role: string;
    }[]
}

export class ListAccessRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly accessService: ListAccesUsecase){}

    public static create (accessService: ListAccesUsecase){
        return new ListAccessRoute(
            "/access-role",
            HttpMethod.GET,
            accessService
        )
    }

    public getPath(): string {
        return this.path
    }
    public getMethod(): string {
        return this.method;    
    }

    public getHandler(){
        return async (request: Request, response: Response) => {

            try {

                
                const output = await this.accessService.execute();
                const responseBody = this.present(output);

                if(!response.headersSent){
                    response.status(200).json(responseBody).send();
                }
                
            } catch (error) {
                if(!response.headersSent){
                    response.status(404).json({message: error.message}).send();
                }
            }

        }
    }

    private present(input: AccessRoleOutputDTO): AccessRoleOutputDTO{
        return input
    }

}
