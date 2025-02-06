import { Request, Response } from "express";
import { CreateSupplyUsecase } from "../../../../../use-case/supply/create.usecase";
import { HttpMethod, Route } from "../route";
import { send } from "process";

export type SuppplyResponse = void;

type SuppplyInputDTO = {
    nome: string,
    nif: string,
    telefone: string
}

export class CreateSupplyRoute implements Route {

    public constructor(private readonly path: string, private readonly method: HttpMethod, private readonly supplyService: CreateSupplyUsecase){}

    public static create(supplyService: CreateSupplyUsecase){
        return new CreateSupplyRoute(
            "/supply",
            HttpMethod.POST,
            supplyService
        )
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): string {
        return this.method
    }

    public getHandler() {
        return async (request: Request, response: Response) => {

            const {nome, nif, telefone} = request.body;

            try {

                const payload: SuppplyInputDTO = {
                    nome,
                    nif,
                    telefone
                }

                const isValidate: Array<keyof SuppplyInputDTO> = ["nome","nif", "telefone"];
                for(const key of isValidate){
                    if(payload[key] === undefined || payload[key] === null || payload[key] === ""){
                        throw new Error(`${key} can't be empty, null or undefined`);
                    } 
                }

                this.supplyService.execute(payload);

                response.status(201).json().send();
                
            } catch (error: any) {
                response.status(404).json({messge:error.message}).send()
            }

        }
    }



}
