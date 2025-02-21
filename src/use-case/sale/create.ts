import { ClientGateway } from "../../domain/client/gateway/client.gataway";
import { Payment } from "../../domain/payment/entity/payment";
import { PaymentGateway } from "../../domain/payment/gateway/payment.gateway";
import { ProductGateway } from "../../domain/product/gateway/product.gateway";
import { Sale } from "../../domain/sale/entity/Sale";
import { SaleGateway } from "../../domain/sale/gateway/sale.gateway";
import { StockGateway } from "../../domain/stock/gateway/stock.gateway";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { PaymentUsecase } from "../payment/payment";
import { Usecase } from "../use-case";

export type saleInputDTO = {
    id_cliente?: string;
    id_usuario: string;
    id_produto: string,
    quantidade: number
}

export type saleOutputDTO = Sale;

export class CreateSaleUsecase implements Usecase<saleInputDTO, saleOutputDTO> {

    public constructor(private readonly saleGateway: SaleGateway , private readonly productGateway: ProductGateway, private readonly clientGateway: ClientGateway, private readonly userGateway: UserGateway, private readonly stockGateway: StockGateway, private readonly paymentGateway: PaymentGateway){}

    public static create(saleGateway: SaleGateway, productGateway: ProductGateway, clientGateway: ClientGateway, userGateway: UserGateway, stockGateway: StockGateway, paymentGateway: PaymentGateway){
        return new CreateSaleUsecase(saleGateway, productGateway, clientGateway, userGateway, stockGateway, paymentGateway);
    }

    public async execute({id_usuario, id_produto, quantidade, id_cliente}: saleInputDTO): Promise<Sale | any> {

        const aSale = await Sale.create(id_usuario, id_produto, quantidade, id_cliente);

        const hasClient = await this.clientGateway.findOne(id_cliente);
        const hasUser = await this.userGateway.findOne(id_usuario);
        
        if(!hasClient){
            throw new Error(`${!hasClient ? "client" : ""} not found`);
        } else if(!hasUser){
            throw new Error("user not found");
        }


        const hasProductInStock = await this.stockGateway.findOneProduct(id_produto);
        if(!hasProductInStock){
            throw new Error("Product not found in stock");
        } if(hasProductInStock.quantidade < quantidade){
            throw new Error("Product in stock is unsuficient, you must fuel the stock");
        }

        

        await this.saleGateway.save(aSale);

        await this.reduceStock(hasProductInStock, quantidade, id_produto)

        await this.proccessPayment(aSale, id_produto, quantidade);

        const output = await this.presentSaleTicket(aSale);

        return output;

    }

    private async presentSaleTicket(input: Sale){
        const aProduct = await this.productGateway.findOne(input.id_produto);
        const aClient = await this.clientGateway.findOne(input.id_cliente);
        const aUser = await this.userGateway.findOne(input.id_usuario);
        
        const userId: any = aUser?.id_funcionario;
        
        const aEmployer = await this.userGateway.findEmployer(userId)
        
        const storeId: any = aEmployer?.id_loja;
        
        const aStore = await this.userGateway.findStore(storeId)

        const data = new Date();

        return {
            id: input.id,
            quantidade: input.quantidade,
            data_da_venda: data,
            data_da_compra: input.created_at,
            producto: aProduct,
            cliente: aClient,
            vendedor: aEmployer,
            loja: aStore
        }

    }

    private async proccessPayment(aSale: Sale, id_produto: string, quantidade: number){

        const aProduct = await this.productGateway.findOne(id_produto);

        const aIdSale: any = aSale.id; 
        const aProductPrice: any = aProduct?.preco; 

        const totalToPay = quantidade * aProductPrice;

        const paymentData = {id_sale: aIdSale, price: totalToPay}

        const payment = PaymentUsecase.create(this.paymentGateway);

        payment.execute(paymentData)

    }

    private async reduceStock(hasProductInStock: any, quantidade: number, id_produto: string){
        const reduceStock = hasProductInStock.quantidade - quantidade;
        await this.stockGateway.reduceQuantityInStock(reduceStock, id_produto)
    }

}

