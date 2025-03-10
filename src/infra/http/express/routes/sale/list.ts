import { Request, Response } from "express";
import { ListSaleUsecase } from "../../../../../use-case/sale/list.usecase";
import { HttpMethod, Route } from "../route";

export type saleResponseDTO = {
    venda: {
        id?: string;
        id_cliente?: string;
        id_usuario: string;
        quantidade: number;
        created_at?: Date;
    }
}

export class ListSaleRoute implements Route {

    public constructor(private readonly path:string, private readonly method: HttpMethod, private readonly saleService: ListSaleUsecase){}

    public static create(saleService: ListSaleUsecase){
        return new ListSaleRoute(
            "/sale",
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
            try {
            
                const output = await this.saleService.execute();
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
