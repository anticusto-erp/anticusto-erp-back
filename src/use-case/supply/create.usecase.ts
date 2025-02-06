import { Supply } from "../../domain/supply/entity/supply";
import { SupplyGateway } from "../../domain/supply/gateway/supply.gateway";
import { Usecase } from "../use-case";

export type SuppplyInputDTO = {
    nome: string,
    nif: string,
    telefone: string
}

export type SuppplyOutputDTO = void;

export class CreateSupplyUsecase implements Usecase<SuppplyInputDTO, SuppplyOutputDTO>{

    public constructor(private readonly supplyGateway: SupplyGateway){}

    public static create(supplyGateway: SupplyGateway){
        return new CreateSupplyUsecase(supplyGateway);
    }

    public async execute({nome, nif, telefone}: SuppplyInputDTO): Promise<void> {

        const aSupply = await Supply.create(nome, telefone, nif, this.supplyGateway); 

        await this.supplyGateway.save(aSupply);

    }

}
