import { Supply } from "../../domain/supply/entity/supply";
import { SupplyGateway } from "../../domain/supply/gateway/supply.gateway";
import { Usecase } from "../use-case";

export type SupplyOutputDTO = {
    supply: {
        id: string,
        nome: string,
        nif: string,
        telefone: string,
        created_at: string,
    }[]
}

export type SuppplyInputDTO = void;

export class ListSupplyUsecase implements Usecase<SuppplyInputDTO, SupplyOutputDTO> {
    public constructor(private readonly supplyGateway: SupplyGateway){}

    public static create(supplyGateway: SupplyGateway){
        return new ListSupplyUsecase(supplyGateway);
    }

    public async execute(): Promise<any> {
        const aSupply = await this.supplyGateway.list();
        const output = this.present(aSupply);

        return output;
    }

    private present(input: Supply[]){
        const result = input.map((input) => {
            return {
                id: input.id,
                nome: input.nome,
                telefone: input.telefone,
                nif: input.nif,
                created_at: input.created_at,
                updated_at: input.updated_at,
            }
        })

        return result;
    }

}
