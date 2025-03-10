import { Request, Response } from "express";
import { UpdateEmployerUsecase } from "../../../../../use-case/employer/update.usecase"
import { HttpMethod, Route } from "../route"

export type EmployerInputDTO = {
    id: string,
    firstName: string,
    lastName: string,
    bi: string,
    email: string,
    telephone: string
} 

export class UpdateEmployerRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly employerService: UpdateEmployerUsecase){}

    public static create(employerService: UpdateEmployerUsecase){
        return new UpdateEmployerRoute(
            "/employer/:id",
            HttpMethod.PATCH,
            employerService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            const {id} = request.params;

            const {firstName, lastName, bi, email, telephone} = request.body;

            try {
                
                const payload: EmployerInputDTO = {
                    id,
                    firstName,
                    lastName,
                    bi,
                    email,
                    telephone
                }

                await this.employerService.execute(payload);
                response.status(204).send();


            } catch (error: any) {
                response.status(400).json({message: error.message}).send()
            }

        }
    }

}
