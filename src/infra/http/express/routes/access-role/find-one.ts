import { Request, Response } from "express";
import { FindOneAccessRoleUsecase } from "../../../../../use-case/access-role/find-one.usecase";
import { HttpMethod, Route } from "../route";
import { AcessRole } from "../../../../../domain/access-role/entity/acess-role";

export type AccessRoleOutput = {
    id: string;
    access_role: string | any;
}

export class FindOneAccessRoleRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly accessRoleService: FindOneAccessRoleUsecase){}

    public static create(accessRoleService: FindOneAccessRoleUsecase){
        return new FindOneAccessRoleRoute(
            "/access-role/:id",
            HttpMethod.GET,
            accessRoleService
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
            
            const {id} = request.params;

            try {

                const aAccessRole = await this.accessRoleService.execute(id)

                const output = this.present(aAccessRole);

                if(!response.headersSent){
                    response.status(200).json(output).send();
                }
                
            } catch (error: any) {
                if(!response.headersSent){
                    response.status(400).json({message: error?.message}).send();
                }
            }
        } 
    }

    private present(input: AcessRole){
        const accessRole:  AccessRoleOutput = {
            id: input.id,
            access_role: input.nivel_de_acesso
        }
        return accessRole;
    }

}
