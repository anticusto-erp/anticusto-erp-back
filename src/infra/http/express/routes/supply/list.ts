import { Request, Response } from "express";
import { ListSupplyUsecase } from "../../../../../use-case/supply/list.usecase"
import { HttpMethod, Route } from "../route"
import { Supply } from "../../../../../domain/supply/entity/supply";

export type SupplyResponseDTO = {
    supply: {
        id: string,
        nome: string,
        nif: string,
        telefone: string,
        created_at: string,
    }[]
}

export class ListSupplyRoute implements Route{

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly supplyService: ListSupplyUsecase){}

    public static create(supplyService: ListSupplyUsecase){
        return new ListSupplyRoute(
            "/supply",
            HttpMethod.GET,
            supplyService
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
            try {
                
                const aSupply = await this.supplyService.execute();
                const result = this.present(aSupply);

                if(!response.headersSent){
                    response.status(200).json(result).send();
                }
<<<<<<< HEAD
=======

>>>>>>> 9aae1a3262d1a7830e073fc7c816a91ec20c4b55

            } catch (error: any) {
                if(!response.headersSent){
                    response.status(404).json(error.message).send();
                }
            }
        }         
    }

    private present(input: Supply[]){
        return input;
    }

}

