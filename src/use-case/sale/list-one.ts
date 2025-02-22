import { ClientGateway } from "../../domain/client/gateway/client.gataway";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Sale } from "../../domain/sale/entity/Sale";
import { SaleGateway } from "../../domain/sale/gateway/sale.gateway";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../use-case";

export type saleInputDTO = {
    id: string
}

export type saleOutputDTO = {
    venda: {
        id: string,
        id_cliente?: string;
        id_usuario: string;
        id_produto: string;
        quantidade: number,
        totoal_a_pagar: number;
        create_at: string
    }
}

export class ListOneSaleUsecase implements Usecase<string, saleOutputDTO> {

    public constructor(private readonly saleGateway: SaleGateway , private readonly productGateway: ProductGateway, private readonly clientGateway: ClientGateway, private readonly userGateway: UserGateway){}

    public static create(saleGateway: SaleGateway, productGateway: ProductGateway, clientGateway: ClientGateway, userGateway: UserGateway){
        return new ListOneSaleUsecase(saleGateway, productGateway, clientGateway, userGateway);
    }

    public async execute(id: string): Promise<saleOutputDTO> {
        
        const aSale = await this.saleGateway.finOne(id);
        const output = this.present(aSale);

        return output;
    }

    private async present(input: Sale | null): Promise<any>{

        if(!input) {
            throw new Error("Sale not found");
        }
        
        const aProduct = await this.productGateway.findOne(input.id_produto);
        const aClient = await this.clientGateway.findOne(input.id_cliente);

        const aUser = await this.userGateway.findOne(input.id_usuario);

        const productValue: any = aProduct?.preco
        const total = productValue * input.quantidade;

        return {
            id: input.id,
            quantidade: input.quantidade,
            total_a_pagar: total,
            created_at: input.created_at,
            producto: aProduct,
            cliente: aClient,
            vendedor: aUser
        }
    }

}

