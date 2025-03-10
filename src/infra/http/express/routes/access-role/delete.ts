import { Request, Response } from "express";
import { DeleteAccessRoleUsecase } from "../../../../../use-case/access-role/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteAccessRoleRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly accessService: DeleteAccessRoleUsecase){}

    public static create(accessRoleGateway: DeleteAccessRoleUsecase){
        return new DeleteAccessRoleRoute(
            "/access-role/:id",
            HttpMethod.DELETE,
            accessRoleGateway
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
            const {id} = request.params;

            try {
                await this.accessService.execute(id);
                response.status(201).send();
            } catch (error: any) {
                response.status(400).json({message: error?.message}).send();
            }

        } 
    }

}
