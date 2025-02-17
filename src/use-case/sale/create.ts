import { Sale } from "../../domain/sale/entity/Sale";
import { SaleGateway } from "../../domain/sale/gateway/sale.gateway";
import { Usecase } from "../use-case";

export type saleInputDTO = {
    id_cliente?: string;
    id_usuario: string;
    quantidade: number
}

export type saleOutputDTO = void;

export class CreateSaleUsecase implements Usecase<saleInputDTO, saleOutputDTO> {

    public constructor(private readonly saleGateway: SaleGateway){}

    public static create(saleGateway: SaleGateway){
        return new CreateSaleUsecase(saleGateway);
    }

    public async execute({id_usuario, quantidade, id_cliente}: saleInputDTO): Promise<void> {

        const aSale = Sale.create(id_usuario, quantidade, id_cliente);

        await this.saleGateway.save(aSale);


    }

}

