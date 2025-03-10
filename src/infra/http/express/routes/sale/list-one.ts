import { Request, Response } from "express";
import { HttpMethod, Route } from "../route";
import { ListOneSaleUsecase } from "../../../../../use-case/sale/list-one.usecase";

export type saleResponseDTO = {
    venda: {
        id?: string;
        id_cliente?: string;
        id_usuario: string;
        quantidade: number;
        created_at?: Date;
    }
}

export class ListOneSaleRoute implements Route {

    public constructor(private readonly path:string, private readonly method: HttpMethod, private readonly saleService: ListOneSaleUsecase){}

    public static create(saleService: ListOneSaleUsecase){
        return new ListOneSaleRoute(
            "/sale/:id",
            HttpMethod.GET,
            saleService
        );
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


            try {
            
                const output = await this.saleService.execute(id);
                const responseBody = this.present(output);

                if(!response.headersSent){
                    response.status(200).json(responseBody).send();
                }

            } catch (error: any) {
                if(!response.headersSent){
                    response.status(400).json({message: error?.message}).send();
                }
            }
        }
    }

    private present(input: saleResponseDTO){
        return input;
    }

}
