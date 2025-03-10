import { Request, Response } from "express";
import { DeleteEmployerUsecase } from "../../../../../use-case/store/delete.usecase";
import { HttpMethod, Route } from "../route";

export class DeleteEmployerRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly employerService: DeleteEmployerUsecase){}

    public static create(employerService: DeleteEmployerUsecase){
        return new DeleteEmployerRoute(
            "/employer/:id",
            HttpMethod.DELETE,
            employerService
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
                
                await this.employerService.execute(id);

                response.status(204).send();

            } catch (error: any) {
                response.status(400).json({message: error.message}).send();
            }

        }
    }

}
