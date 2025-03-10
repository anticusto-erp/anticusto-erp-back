import { Request, Response } from "express";
import { UpdateAccessRoleUsecase } from "../../../../../use-case/access-role/update.usecase";
import { HttpMethod, Route } from "../route";

export type UpdateAccessRoleInputDTO = {
    id: string,
    access_role: string;
}

export class UpdateAccessRoleRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly accessService: UpdateAccessRoleUsecase){}

    public static create(accessService: UpdateAccessRoleUsecase){
        return new UpdateAccessRoleRoute(
            "/access-role/:id",
            HttpMethod.PATCH,
            accessService
        )
    }

    public getPath(): string {
        return this.path;
    }
    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler(){
        return async (request: Request, response: Response) => {

            const {id} = request.params;
            const {access_role} = request.body;

            try {

                const payload: UpdateAccessRoleInputDTO = {
                    id,
                    access_role
                }

                await this.accessService.execute(payload);

                response.status(204).send();

            } catch (error: any) {
                response.status(400).json({message: error?.message}).send()
            }

        }
    }

}
