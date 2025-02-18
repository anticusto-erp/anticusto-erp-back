import { Request, Response } from "express";
import { CreateSaleUsecase } from "../../../../../use-case/sale/create";
import { HttpMethod, Route } from "../route";
import { Sale } from "../../../../../domain/sale/entity/Sale";

export type saleInputDTO = {
    client_id?: string;
    product_id: string,
    user_id: string;
    quantity: number,
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
            
            const {client_id, product_id, quantity, user_id} = request.body();
            try {

                const payload: saleInputDTO ={
                    product_id,
                    user_id,
                    quantity,
                    client_id
                }

                const isValidate: Array<keyof saleInputDTO> = ["product_id", "quantity", "user_id"];
                for(const key of isValidate){
                    if(payload[key] === undefined || payload[key] == null || payload[key] == "".trim()){
                        throw new Error(`${key} can't be empty, undefined or null`);
                    }
                }

                const aSale = Sale.create(user_id, product_id, quantity, client_id);
                await this.saleService.execute(aSale);                

            } catch (error: any) {
                response.status(400).json({message: error.message}).send()
            }
        }
    }

}
