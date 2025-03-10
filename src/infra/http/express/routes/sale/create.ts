import { Request, Response } from "express";
import { CreateSaleUsecase } from "../../../../../use-case/sale/create.usecase";
import { HttpMethod, Route } from "../route";
import { Sale } from "../../../../../domain/sale/entity/Sale";


export type saleInputDTO = {
    id_cliente?: string;
    id_usuario: string;
    id_produto: string,
    quantidade: number
}

export class CreateSaleRoute implements Route{
    public constructor(private readonly path: string, private readonly method: string, private readonly saleService: CreateSaleUsecase){}

    public static create(saleService: CreateSaleUsecase){
        return new CreateSaleRoute(
            "/sale",
            HttpMethod.POST,
            saleService
        );
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method;    
    }

    public getHandler() {
        return async (request: Request, response: Response) =>{
            
            const {client_id, product_id, quantity, user_id} = request.body;
            try {

                const payload: saleInputDTO ={
                    id_produto: product_id,
                    id_usuario: user_id,
                    quantidade: quantity,
                    id_cliente: client_id
                }

                const isValidate: Array<keyof saleInputDTO> = ["id_produto", "quantidade", "id_usuario"];
                for(const key of isValidate){
                    if(payload[key] === undefined || payload[key] == null || payload[key] == "".trim() || Number.isNaN(quantity)){
                        throw new Error(`${key} can't be empty, undefined or null`);
                    }
                }

                const aSale = await this.saleService.execute(payload);   
                
                response.status(200).json(aSale).send();

            } catch (error: any) {
                response.status(400).json({message: error.message}).send()
            }
        }
    }


}
