import { Request, Response } from "express";
import { EmployerOutputDTO, ListEmployerUsecase } from "../../../../../use-case/employer/list.usecase";
import { HttpMethod, Route } from "../route";

export type EmployerResponseDTO = {
    employer: {
        id_store: string;
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        bi: string;
        created_at?: Date;
    }[]
}

export class ListEmployerRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly employerService: ListEmployerUsecase){}

    public static create (employerService: ListEmployerUsecase){
        return new ListEmployerRoute(
            "/employer",
            HttpMethod.GET,
            employerService
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

                const output = await this.employerService.execute();
                const responseBody = this.present(output);

                if(!response.headersSent) {
                    response.status(200).json(responseBody).send();
                }

                
            } catch (error: any) {

                if(!response.headersSent){
                    response.status(404).json({message: error.message}).send();
                }
            }

        }
    }

    private present(input: EmployerOutputDTO): EmployerResponseDTO{
        return input
    }

}
