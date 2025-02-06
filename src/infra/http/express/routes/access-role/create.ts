import { Request, Response } from "express";
import { CreateAccessRoleUsecase } from "../../../../../use-case/access-role/create.usecase";
import { HttpMethod, Route } from "../route";

export type AccessRoleRouteResponse = void;

export class CreateAccesRoleRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly accessRoleService: CreateAccessRoleUsecase){}

    public static create(accessRoleService: CreateAccessRoleUsecase){
        return new CreateAccesRoleRoute(
            "/access-role", 
            HttpMethod.POST,
            accessRoleService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler(){

        return async (request: Request, response: Response) =>{

            const {access_role} = request.body;

            const input = {
                access_role: access_role
            }

            try {

                if(input.access_role == undefined || input.access_role == null ){
                    throw new Error(`${input.access_role} can't be undefined or null`);
                }

                await this.accessRoleService.execute(input);
                response.status(201).send();

            } catch (error: any) {
                response.status(400).json({message: error.message}).send();
            }

        }
        
    }

}
