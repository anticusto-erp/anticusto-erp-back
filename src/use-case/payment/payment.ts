import { Payment } from "../../domain/payment/entity/payment";
import { PaymentGateway } from "../../domain/payment/gateway/payment.gateway";
import { SaleGateway } from "../../domain/sale/gateway/sale.gateway";
import { Usecase } from "../use-case";

export type paypemtInputDTO = {
    id_sale: string,
    price: number
}

export type paypemtOutputDTO = void;

export class PaymentUsecase implements Usecase<paypemtInputDTO, paypemtOutputDTO> {

    public constructor(private readonly paymentGateway: PaymentGateway){}

    public static create(paymentGateway: PaymentGateway){
        return new PaymentUsecase(paymentGateway);
    }

    public async execute({id_sale, price}: paypemtInputDTO): Promise<void> {

        const aPayment = Payment.create(id_sale, price);

        await this.paymentGateway.proccessPayment(aPayment);

    }

}
