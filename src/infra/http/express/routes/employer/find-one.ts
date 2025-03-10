import { Request, Response } from "express";
import { FindOneEmployerUsecase } from "../../../../../use-case/employer/find-one.usecase";
import { HttpMethod, Route } from "../route";

export type EmployerOutputDTO = {
    id: string,
    id_store: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    bi: string;
    created_at?: Date;

    id_loja?: string,
    primeiro_nome?: string,
    ultimo_nome?: string,
    telefone?: string,
}

export class FindOneEmployerRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly employerServie: FindOneEmployerUsecase){}

    public static create(employerService: FindOneEmployerUsecase){
        return new FindOneEmployerRoute(
            "/employer/:id",
            HttpMethod.GET,
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
        return async  (request: Request, response: Response) =>  {
            
            const {id} = request.params;

            try {
                
                const aEmployer = await this.employerServie.execute(id);

                const output = this.present(aEmployer);
                
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

    private present(input: EmployerOutputDTO | any){
        const output: EmployerOutputDTO = {
            id: input.id,
            firstName: input.primeiro_nome,
            lastName: input.ultimo_nome,
            bi: input.bi,
            email: input.email,
            telephone: input.telefone,
            id_store: input.id_loja,
            created_at: input.created_at
        }

        return output;
    }

}

