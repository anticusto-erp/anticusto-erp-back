import { Sale } from "../../domain/sale/entity/Sale";
import { SaleGateway } from "../../domain/sale/gateway/sale.gateway";
import { Usecase } from "../use-case";

export type saleInputDTO = void;

export type saleOutputDTO = {
    venda: {
        id: string,
        id_cliente?: string;
        id_usuario: string;
        quantidade: number,
        create_at: string
    }
}

export class ListSaleUsecase implements Usecase<saleInputDTO, saleOutputDTO> {

    public constructor(private readonly saleGateway: SaleGateway){}

    public static create(saleGateway: SaleGateway){
        return new ListSaleUsecase(saleGateway);
    }

    public async execute(): Promise<saleOutputDTO> {
        const aSale = await this.saleGateway.list();
        const output = this.present(aSale);

        return output;
    }

    private present(input: Sale[]): Promise<any>{
        const output = Promise.all(
            input.map( async (input) => {

                return {
                    id: input.id,
                    id_cliente: input.id_cliente,
                    usuario: input.id_usuario,
                    quantidae: input.quantidade,
                    created_at: input.created_at,
                }
            })
        )

        return output;
    }

}

