import { ClientGateway } from "../../domain/client/gateway/client.gataway";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Sale } from "../../domain/sale/entity/Sale";
import { SaleGateway } from "../../domain/sale/gateway/sale.gateway";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../use-case";

export type saleInputDTO = {
    id_cliente?: string;
    id_usuario: string;
    id_produto: string,
    quantidade: number
}

export type saleOutputDTO = void;

export class CreateSaleUsecase implements Usecase<saleInputDTO, saleOutputDTO> {

    public constructor(private readonly saleGateway: SaleGateway , private readonly productGateway: ProductGateway, private readonly clientGateway: ClientGateway, private readonly userGateway: UserGateway){}

    public static create(saleGateway: SaleGateway, productGateway: ProductGateway, clientGateway: ClientGateway, userGateway: UserGateway){
        return new CreateSaleUsecase(saleGateway, productGateway, clientGateway, userGateway);
    }

    public async execute({id_usuario, id_produto, quantidade, id_cliente}: saleInputDTO): Promise<void> {

        const aSale = await Sale.create(id_usuario, id_produto, quantidade, this.productGateway, this.clientGateway, this.userGateway, id_cliente);

        await this.saleGateway.save(aSale);


    }

}

