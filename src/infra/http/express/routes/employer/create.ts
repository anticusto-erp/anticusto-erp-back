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

            const input: EmployerInputDTO = {
                firstName: firstName,
                lastName: lastName,
                bi: bi,
                email: email,
                telephone: telephone,
                id_store: id_store
            }
            try {

                const isValidate: Array<keyof EmployerInputDTO> = ["firstName", "lastName", "email", "bi", "telephone", "id_store"];
                for(const key of isValidate){
                    if(input[key] == undefined || input[key] == null || input[key] == ""){
                        throw new Error(`${key} can't be empty, undefined or null`);
                    }
                }

                await this.employerService.execute(input);

                response.status(201).send();

            } catch (error: any) {
                response.status(404).json({data: error.message}).send();
            }

        }
    }

}