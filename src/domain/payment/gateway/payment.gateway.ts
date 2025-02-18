import { Payment } from "../entity/payment";

export interface PaymentGateway {

    list(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment | null>;
    
    proccessPayment(payment: Payment): Promise<void>;
    findOneByIdSale(id_sale: string): Promise<Payment | null>;

}