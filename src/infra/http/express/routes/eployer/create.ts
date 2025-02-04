import { Request, Response } from "express";
import { CreateEmployerUsecase } from "../../../../../use-case/employer/create";
import {HttpMethod, Route} from "../route";

export type EmployerResponseDTO = void;

export type EmployerInputDTO = {
    firstName: string,
    lastName: string,
    telephone: string,
    email: string,
    bi: string,
    id_store: string
}

export class CreateEmployerRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly employerService: CreateEmployerUsecase){}

    public static create(employerService: CreateEmployerUsecase){
        return new CreateEmployerRoute(
            "/employer",
            HttpMethod.POST,
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

        return async (request: Request, response: Response) =>{

            const {firstName, lastName, telephone, email, bi, id_store} = request.body;

            try {

                const input: EmployerInputDTO = {
                    firstName,
                    lastName,
                    bi,
                    email,
                    telephone,
                    id_store
                }

                console.log("Route", input);

                response.send();

            } catch (error) {
                response.status(404).json(error.message).send();
            }

        }
    }

}